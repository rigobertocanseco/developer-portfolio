import React from "react";
import GithubCharts from "../../templates/github-charts";
import _ from "lodash";
import {htmlToReact} from "../../utils";

export default class SectionAbout extends React.Component {
  render() {
    let section = _.get(this.props, 'section', null);

    return (
      <div>
        <section className="hero is-medium" id={_.get(section, 'section_id', null)}>
          <div className="hero-body">
          <div className="container is-max-desktop">
            <div className="block mb-6 pb-6">
              {_.get(section, 'title', null) && (
                <p className="title is-1 has-text-centered is-spaced">
                  {_.get(section, 'title', null)}
                </p>
              )}
              {_.get(section, 'subtitle', null) && (
                <div className="content is-large has-text-justified">
                  {htmlToReact(_.get(section, 'subtitle', null))}
                </div>
              )}
            </div>
          </div>
          <div className="container">
            <div className="block">
              <GithubCharts />
            </div>
          </div>
        </div>
        </section>
        <div className="hr">
          <div className="container">
            <hr/>
          </div>
        </div>
      </div>
    )
  }
}