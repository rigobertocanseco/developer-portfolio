const crypto = require('crypto');
const _ = require('lodash');
const fetch = require(`node-fetch`)

const MIN_PERCENT = 0.05;
const LIMIT_REPOSITORIES = 4;

function randomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

const queryGetRepositories =
  `query
   ($name: String!, $after: String) {
    user(login: $name) {
      repositories(first: 100, isFork: false, after: $after) {
        nodes {
          name
          repositoryTopics(first: 100) {
            nodes {
              topic {
                name
              }
            }
          }
          primaryLanguage {
            name
            color
          }
          description
          url
          createdAt
          pushedAt
          isPrivate
          stargazerCount
          homepageUrl
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }`


let request = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.GATSBY_GITHUB_API_KEY}`
  },
  body: JSON.stringify({
    query: queryGetRepositories,
    variables: {
      name: process.env.GATSBY_GITHUB_USER,
      after: null
    }
  })
}

function getRepositories(p = progressCallback, u = 'https://api.github.com/graphql', r = request, repositories = []) {
  return new Promise((resolve, reject) => fetch(u, r)
    .then(res => {
      if (res.status !== 200)
        throw Error(`${res.status}: ${res.statusText}`)
      res.json().then(response => {
        repositories = repositories.concat(response.data)
        if (response.data.user.repositories.pageInfo.hasNextPage) {
          p && p(repositories)
          request.body = JSON.stringify({
            query: queryGetRepositories,
            variables: {
              name: process.env.GATSBY_GITHUB_USER,
              after: response.data.user.repositories.pageInfo.endCursor
            }
          })
          getRepositories(p, u, request, repositories).then(resolve).catch(reject)
        } else {
          resolve(repositories)
        }
      }).catch(reject)
    }).catch(reject))
}

function progressCallback(repositories) {
  //console.log(repositories)
}


exports.sourceNodes = (props, pluginOptions = {}) => {
  const {createNode} = props.actions;
  getRepositories().then(data => {
    const dictPrimaryLanguage = {}, repositories = [];
    const arrayProjects = [];

    data.forEach(_ => {
      _.user.repositories.nodes.forEach(e => {
        repositories.push(e);
        if (e.primaryLanguage != null) {
          if (dictPrimaryLanguage.hasOwnProperty(e.primaryLanguage.name))
            dictPrimaryLanguage[e.primaryLanguage.name].value += 1;
          else
            dictPrimaryLanguage[e.primaryLanguage.name] = {
              name: e.primaryLanguage.name,
              value: 1,
              percent: 0.0,
              color: e.primaryLanguage.color == null? randomColor(): e.primaryLanguage.color,
              topics: {}
            };

          e.repositoryTopics.nodes.forEach(_ => {
            if (dictPrimaryLanguage[e.primaryLanguage.name].topics.hasOwnProperty(_.topic.name))
              dictPrimaryLanguage[e.primaryLanguage.name].topics[_.topic.name] += 1;
            else
              dictPrimaryLanguage[e.primaryLanguage.name].topics[_.topic.name] = 1
          });
        }

        let r = e.repositoryTopics.nodes.filter(_ => _.topic.name.match(/is-.*.-project/g));
        if (r.length > 0) {
          e.type = r[0].topic.name.split('-')[1];
          arrayProjects.push(e);
        }
      });
    });

    delete (dictPrimaryLanguage['null']);
    let languages = [];

    _.forOwn(dictPrimaryLanguage, (l, kl) => languages.push(l));

    let languagesTotal = languages.reduce((acc, curr) => acc + curr.value, 0);
    languages.forEach(e => e.percent = e.value / languagesTotal);

    let othersTopics = {}
    languages.filter(_ => _.percent < MIN_PERCENT).forEach(l =>  {
      _.forOwn(l.topics, (t, k) => {
        if (othersTopics.hasOwnProperty(k))
          othersTopics[k] += 1;
        else
          othersTopics[k] = 1;
      })
    });

    let languageSum = languages.filter(_ => _.percent < MIN_PERCENT).reduce((acc, curr) => acc + curr.value, 0);

    if (languages.filter(_ => _.percent < MIN_PERCENT).length > 0) {
      let topics = [];
      _.forOwn(othersTopics, (t, k) => topics.push({'name':k, 'value': t}));
      languages.push({
        name: "Others",
        value: languageSum,
        color: "#3B4252",
        percent: languageSum / languagesTotal,
        topics: topics
      });
    }

    const node = {
      id: `1`,
      parent: null,
      internal: {
        type: `Repositories`,
      },
      children: [],
      length: repositories.length,
    }

    node.internal.contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(node))
      .digest(`hex`);

    createNode(node);

    languages.sort((a, b) => b.value - a.value).map((e, id) => {
      let topics = [];
      _.forOwn(e.topics, (t, k) => topics.push({'name':k, 'value': t}));
      const node = {
        id: `${id}`,
        parent: null,
        internal: {
          type: `Language`,
        },
        children: [],
        name: e.name,
        value: e.value,
        color: e.color,
        percent: e.percent,
        topics: topics
      }

      node.internal.contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(node))
        .digest(`hex`);

      createNode(node);
    });

    repositories.sort((a, b) => new Date(b.pushedAt) - new Date(a.pushedAt))
      .filter(_ => _.primaryLanguage != null && !_.isPrivate).splice(0, LIMIT_REPOSITORIES)
      .map((e, id) => {
        const node = {
          id: `${id}`,
          parent: null,
          internal: {
            type: `Repository`,
          },
          children: [],

          name: e.name,
          repositoryTopics: e.repositoryTopics,
          primaryLanguage: e.primaryLanguage,
          description: e.description,
          url: e.url,
          createdAt: e.createdAt,
          pushedAt: e.pushedAt,
          isPrivate: e.isPrivate,
          stargazerCount: e.stargazerCount,
          homepageUrl: e.homepageUrl,
          type: e.type,
        }

        node.internal.contentDigest = crypto
          .createHash(`md5`)
          .update(JSON.stringify(node))
          .digest(`hex`);

        createNode(node);
      });

    arrayProjects.sort((a, b) => new Date(b.pushedAt) - new Date(a.pushedAt)).map((e, id) => {
      const node = {
        id: `${id}`,
        parent: null,
        internal: {
          type: `Project`, // name of the graphQL query --> allRandomUser {}
          // contentDigest will be added just after
          // but it is required
        },
        children: [],

        // Other fields that you want to query with graphQl
        name: e.name,
        repositoryTopics: e.repositoryTopics,
        primaryLanguage: e.primaryLanguage,
        description: e.description,
        url: e.url,
        createdAt: e.createdAt,
        pushedAt: e.pushedAt,
        isPrivate: e.isPrivate,
        stargazerCount: e.stargazerCount,
        homepageUrl: e.homepageUrl,
        type: e.type
      }

      // Get content digest of node. (Required field)
      // add it to userNode
      node.internal.contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(node))
        .digest(`hex`);

      // Create node with the gatsby createNode() API
      createNode(node);
    });

  }).catch(console.error)
}