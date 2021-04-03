import React from 'react';
import {Helmet} from 'react-helmet';
import _ from 'lodash';

import {withPrefix} from '../utils';
import '../sass/main.scss';
import Header from './sections/Header';
import Footer from './sections/Footer';

export default class Body extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>
            {_.get(this.props, 'pageContext.frontmatter.title', null)
            && (_.get(this.props, 'pageContext.frontmatter.title', null) + ' - ')}
            {_.get(this.props, 'pageContext.site.siteMetadata.title', null)}
          </title>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initialScale=1.0"/>
          <meta name="google" content="notranslate"/>
          <meta name="description"
                content={_.get(this.props, 'pageContext.frontmatter.excerpt', null)
                || _.get(this.props, 'pageContext.site.siteMetadata.description', null)}/>
          <script src="https://www.google.com/recaptcha/api.js" async defer/>
          <link href="https://fonts.googleapis.com/css?family=Karla:400,400i,700,700i&display=swap" rel="stylesheet"/>
          {_.get(this.props, 'pageContext.site.siteMetadata.favicon', null) && (
            <link rel="icon"
                  href={withPrefix(_.get(this.props, 'pageContext.site.siteMetadata.favicon', null))}/>
          )}
        </Helmet>
        {
          <>
            <Header {...this.props} />
            {this.props.children}
            <Footer {...this.props} />
          </>
        }
      </React.Fragment>
    )
  }
}
