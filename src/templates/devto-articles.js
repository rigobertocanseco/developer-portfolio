import React from "react";
import _ from 'lodash';
import {graphql, useStaticQuery} from "gatsby";
import moment from 'moment-strftime';
import {Link} from '../utils';
import {shortFormatter} from "../utils/formatter";

const DevToArticles = () => {
  const data = useStaticQuery(graphql
    `query {
      allDevArticles {
        edges {
          node {
            article {
              id
              title
              description
              cover_image
              tags
              url
              edited_at
              positive_reactions_count
            }
          }
        }
      }
    }
  `)
  return (
    <div>
      <div className="columns is-multiline is-centered" >
        {_.map(data.allDevArticles.edges, (e, id) => (
          <div key={id} className="column is-6-tablet is-6-desktop is-4-widescreen ">
            <Link to={e.node.article.url} target="_blank">
              <div className="card card-repository has-background-dark">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={e.node.article.cover_image}
                         alt={e.node.article.title}/>
                  </figure>
                </div>
                <div className="card-content">
                  <div className="content">
                    <p className="title name is-4 has-text-link">{e.node.article.title}</p>
                    <p className="subtitle description is-6 has-text-light">
                      {e.node.article.description}
                    </p>
                    <div className="tags">
                      {_.map(e.node.article.tags, (i, id) => {
                        return (<span key={id} className="tag has-text-info has-background-black">{`${i}`}</span>)
                      })}
                    </div>
                    <span className="icon">
                      <i className="fa fa-heart"  style={{"color": "#BF616A"}}/>
                    </span>
                    <span>{shortFormatter(e.node.article.positive_reactions_count, 2)}</span>
                    <time className="is-pulled-right" dateTime={moment(e.node.article.edited_at)
                      .strftime('%Y-%m-%d %H:%M')}>
                      {moment(e.node.article.edited_at).strftime('%B %d, %Y')}
                    </time>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DevToArticles