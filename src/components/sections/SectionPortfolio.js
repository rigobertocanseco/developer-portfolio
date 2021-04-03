import React from 'react';
import _ from 'lodash';
import GithubProjects from "../../templates/github-projects";
import CtaButtons from "../CtaButtons";

export default class SectionPortfolio extends React.Component {
  render() {
    let section = _.get(this.props, 'section', null);

    return (
      <div>
        <section className="hero is-medium" id={_.get(section, 'section_id', null)}>
          <div className="hero-body">
            <div className="container is-max-widescreen">
              <div className="block mb-6 pb-6 has-text-centered">
                {_.get(section, 'title', null) && (
                  <p className="title is-1">
                    {_.get(section, 'title', null)}
                  </p>
                )}
                {_.get(section, 'subtitle', null) && (
                  <p className="subtitle is-2">
                    {_.get(section, 'subtitle', null)}
                  </p>
                )}
              </div>
            </div>
            <div className="container">
              <div className="block">
                <GithubProjects />
              </div>
              {_.get(section, 'actions', null) && (
                <div className="buttons is-centered mt-6 pt-6">
                  <CtaButtons {...this.props} actions={_.get(section, 'actions', null)} />
                </div>
              )}
            </div>
          </div>
        </section>
        <div className="hr">
          <div className="container">
            <hr/>
          </div>
        </div>
      </div>
    );
  }
}


