import React from 'react';
import _ from 'lodash';

import GithubProfile from "../../templates/github-profile";
import CtaButtons from "../CtaButtons";

export default class SectionHero extends React.Component {
  render() {
    let section = _.get(this.props, 'section', null);
    return (
      <div>
        <section className="hero is-fullheight" id={_.get(section, 'section_id', null)}>
          <div className="hero-body">
            <div className="container is-max-desktop">
              <div className="columns is-vcentered is-centered is-justify-content-space-around">
                  <div className="column is-6-tablet is-7-desktop">
                    {_.get(section, 'title', null) && (
                      <p className="title is-1 is-spaced has-text-centered">
                        {_.get(section, 'title', null)}
                      </p>
                    )}
                    {_.get(section, 'subtitle', null) && (
                      <p className="subtitle is-2 has-text-centered">
                        {(_.get(section, 'subtitle', null))}
                      </p>
                    )}
                    {_.get(section, 'actions', null) && (
                      <div className="buttons is-centered">
                        <CtaButtons {...this.props} actions={_.get(section, 'actions', null)} />
                      </div>
                    )}
                  </div>
                  <div className="column is-6-tablet is-5-desktop">
                    <GithubProfile />
                  </div>
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
    );
  }
}