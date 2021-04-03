import React from "react";
import _ from "lodash";
import {Link} from "../utils";
import {graphql, StaticQuery} from "gatsby";
import {shortFormatter} from "../utils/formatter";

const LIMIT_DIGITS = 2;

const GithubProjects = () => (
  <StaticQuery
  query={graphql`
      {
        allProject {
          edges {
            node {
              name
              repositoryTopics {
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
              type
            }
          }
        }
      }
    `}

  render= {
    data =>
      <div>
        <div className="columns is-multiline">
          {_.map(data.allProject.edges, (repo, id) =>
            (
              <div key={id} className="column is-4-widescreen is-4-desktop is-6-tablet">
                <div className="card card-repository has-background-dark">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <Link to={repo.node.homepageUrl} target="_blank">
                        <img src={"https://raw.githubusercontent.com/" + process.env.GATSBY_GITHUB_USER + "/" +
                        repo.node.name + "/master/is-thumb.png"} alt={repo.node.name}/>
                      </Link>
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="content">
                      <p className="title name is-4">
                        <a className="url" href={repo.node.url} target="_blank" rel="noreferrer">
                          {repo.node.name}
                        </a>
                      </p>
                      <p className="subtitle is-6 description has-text-light">{repo.node.description}</p>
                      <div className="tags">
                        {_.map(repo.node.repositoryTopics.nodes, (i, id) => {
                          return (<span key={id} className="tag has-text-info has-background-black">{`${i.topic.name}`}</span>)
                        })}
                      </div>
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
              </div>
            )
          )}
        </div>
      </div>
  }/>
)

export default GithubProjects