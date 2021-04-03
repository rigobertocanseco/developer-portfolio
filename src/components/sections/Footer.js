import React from 'react';
import _ from 'lodash';

import {htmlToReact, withPrefix} from '../../utils';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="content has-text-centered">
          <div className="buttons is-centered">
            {_.map(_.get(this.props, 'pageContext.site.siteMetadata.footer.links', null),
              (action, action_idx) => (
                <a className="button is-ghost " key={action_idx} href={withPrefix(_.get(action, 'url', null))}>
                  {_.get(action, 'label', null)}
                </a>
              )
            )}
          </div>
          <p>
            {_.get(this.props, 'pageContext.site.siteMetadata.footer.content', null) && (
              <b>
                {htmlToReact(_.get(this.props, 'pageContext.site.siteMetadata.footer.content', null))}
              </b>
            )}
          </p>
          <div className="buttons is-centered">
            {_.map(_.get(this.props, 'pageContext.site.siteMetadata.footer.social_links', null),
            (action, action_idx) => (
              <a className="button is-ghost is-small" key={action_idx} href={withPrefix(_.get(action, 'url', null))}>
                {_.get(action, 'label', null)}
              </a>
            ))}
          </div>
        </div>
      </footer>
    );
  }
}
