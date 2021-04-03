import React from "react";
import {shortFormatter} from "../utils/formatter";
import {GithubChart} from "../components";
import {graphql, useStaticQuery} from "gatsby";
import _ from 'lodash';

const LIMIT_DIGITS = 2;
const LIMIT_TOPICS = 10;
const MIN_PERCENT = 0.05;

const GithubCharts = () => {
  // Build Time Data Fetching
  const data = useStaticQuery(graphql`
 query {
    allLanguage {
      edges {
        node {
          id
          color
          value
          name
          percent
          topics {
            name
            value
          }
        }
      }
    }
    allRepositories {
      nodes {
        length
      }
    }
    allRepository {
      edges {
        node {
          createdAt
          description
          homepageUrl
          name
          isPrivate
          primaryLanguage {
            color
            name
          }
          pushedAt
          repositoryTopics {
            nodes {
              topic {
                name
              }
            }
          }
          stargazerCount
          type
          url
        }
      }
    }
  }
  `)

  /*
  // Client-side Runtime Data Fetching
  const [repositories, setRepositories] = useState([]);
  const [data.allLanguage.edges, setPrimaryLanguagePie] = useState([]);
  const [totalCountRepositories, setTotalCountRepositories] = useState(0);

  useEffect(() => {

  }, []);
  */

  return (
    <div className="box has-background-dark">
      <p className="title is-2">Skills</p>
      <p className="subtitle is-4">Data from my personal Github</p>
      <div className="columns is-multiline is-vcentered">
        <div className="column is-6-tablet is-4-widescreen">
          <p className="title">
            Languages
            <span className="tag is-rounded is-danger ml-3">
              {shortFormatter(data.allLanguage.edges.length, LIMIT_DIGITS)}
            </span>
          </p>
          <figure className="image is-pie">
            <GithubChart data={data.allLanguage.edges.map(_ => _.node).filter(_ => _.percent >= MIN_PERCENT)}/>
          </figure>
        </div>
        <div className="column is-6-tablet is-4-widescreen">
          <div className="block content">
            <table>
              <thead>
              <tr>
                <th>Language</th>
                <th># Repos</th>
                <th>%</th>
              </tr>
              </thead>
              <tbody>
              {_.map(data.allLanguage.edges.filter(_ => _.node.percent >= MIN_PERCENT), (language, id) => (
                  <tr key={id}>
                    <td>
                      <span className="icon">
                        <i className="fa fa-square" style={{"color": language.node.color}}/>
                      </span>
                      <span>{`${language.node.name}`}</span>
                    </td>
                    <td>
                      {`${shortFormatter(language.node.value, LIMIT_DIGITS)}`}
                    </td>
                    <td>
                      {`${(language.node.percent * 100).toFixed(0)}%`}
                    </td>
                  </tr>
                )
              )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="column is-12-tablet is-4-widescreen">
          <p className="title">
            Topics
            <span className="tag is-rounded is-danger ml-3">
              { shortFormatter(data.allLanguage.edges.reduce((acc, curr) => acc + _.size(curr.node.topics), 0), LIMIT_DIGITS)}
            </span>
          </p>
          {_.map(data.allLanguage.edges.filter(l => l.node.percent >= MIN_PERCENT &&  !_.isEmpty(l.node.topics)), (language, id) =>
             (
            <div  key={id} className="block mb-2">
              <p className="title is-5 mb-2" style={{color: language.node.color}}>{`${language.node.name}`}</p>
              <div className="tags">
                {_.map( _.map(language.node.topics, (item, key) => ({...item, _key:key})).splice(0, LIMIT_TOPICS),
                  (i, id) => (<span key={id} className="tag is-primary">{`${i.name}`}</span>)
                )}
                { _.size(language.node.topics) > LIMIT_TOPICS && (
                  <span className="tag is-rounded is-white is-small">
                   + {shortFormatter(_.size(language.node.topics) - 10, LIMIT_DIGITS)}
                  </span>
                )}
              </div>
            </div>
            ))}
        </div>
      </div>
      {data.allRepository.edges.length > 0 && (
      <div className="block">
          <p className="title">
            Repositories
            <span className="tag is-rounded is-danger ml-3">
              {shortFormatter(data.allRepositories.nodes[0].length, LIMIT_DIGITS)}
            </span>
          </p>
          {/*<p className="subtitle">
            View All
          </p>*/}
          <div className="columns is-multiline">
            {_.map(data.allRepository.edges, (repo, id) =>
               (
                <div  key={id} className="column is-3-widescreen is-6-tablet">
                  <div className="box box-repository has-text-light">
                    <div className="content is-small">
                      <h3 className="name">
                        <a href={repo.node.url} target="_blank" rel="noreferrer">{repo.node.name}</a>
                      </h3>
                      <p className="description">{repo.node.description}</p>
                      <span className="icon">
                        <i className="fa fa-circle" style={{"color": repo.node.primaryLanguage.color}}/>
                      </span>
                      <span>{repo.node.primaryLanguage.name}</span>
                      <span className="icon">
                        <i className="fa fa-star"/>
                      </span>
                      <span>{shortFormatter(repo.node.stargazerCount, LIMIT_DIGITS)}</span>
                      <time className="is-pulled-right" dateTime={repo.node.pushedAt}>
                        {new Date(repo.node.pushedAt).toDateString()}
                      </time>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  )
}
export default GithubCharts