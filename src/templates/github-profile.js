import React from "react";
import {graphql, useStaticQuery} from "gatsby";
import {markdownify} from "../utils";

const GithubProfile = () => {
  // Build Time Data Fetching
  const data = useStaticQuery(graphql
    `query {
      github {
        viewer {
          login
          bio
          avatarUrl(size: 256)
          bioHTML
          company
          name
          url
          twitterUsername
          websiteUrl
          location
          email
          updatedAt
        }
      }
    }
  `)

  return (
    <div className="card has-background-dark">
      <div className="card-content">
        <div className="block">
          <figure className="image is-224x224">
            <img className="is-rounded is-center is-centered" src={data.github.viewer.avatarUrl} alt="avatar"/>
          </figure>
        </div>
        <div className="media">
          <div className="media-left">
            <figure className="image">
              <p className="title is-1">
                <span className="icon is-large">
                  <i className="fa fa-github"/>
                </span>
              </p>
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">{data.github.viewer.name}</p>
            <p className="subtitle is-6">
              <a href={data.github.viewer.url} target="_blank" rel="noreferrer">@{data.github.viewer.login}</a>
            </p>
          </div>
        </div>
        <div className="content">
          {markdownify(data.github.viewer.bioHTML)}
        </div>
        {data.github.viewer.company && (
          <p>
              <span className="icon-text">
                <span className="icon">
                  <i className="fa fa-building"></i>
                </span>
                <span>{data.github.viewer.company}</span>
              </span>
          </p>
        )}
        {data.github.viewer.location && (
          <p>
              <span className="icon-text">
                <span className="icon">
                  <i className="fa fa-map-marker"></i>
                </span>
                <span>{data.github.viewer.location}</span>
              </span>
          </p>
        )}
        {data.github.viewer.email && (
          <p>
              <span className="icon-text">
                <span className="icon">
                  <i className="fa fa-at"></i>
                </span>
                <span>{data.github.viewer.email}</span>
              </span>
          </p>
        )}
        {data.github.viewer.websiteUrl && (
          <p>
              <span className="icon-text">
                <span className="icon">
                  <i className="fa fa-link"></i>
                </span>
                <span>
                  <a href={data.github.viewer.websiteUrl} target="_blank" rel="noreferrer">
                    {data.github.viewer.websiteUrl}
                  </a>
                </span>
              </span>
          </p>
        )}
        {data.github.viewer.twitterUsername && (
          <p>
              <span className="icon-text">
                <span className="icon">
                  <i className="fa fa-twitter"></i>
                </span>
                <span>{data.github.viewer.twitterUsername}</span>
              </span>
          </p>
        )}
      </div>
    </div>
  )
}

export default GithubProfile
