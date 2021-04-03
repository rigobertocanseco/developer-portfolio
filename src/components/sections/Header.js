import React from 'react';
import _ from 'lodash';

import {withPrefix} from '../../utils';
import Link from "gatsby-link";

function position(id) {
  let o = document.getElementById(id);
  if (o === null)
    return 0;
  let t = o.offsetTop;
  while ((o = o.offsetParent))
    t += o.offsetTop;

  return t - 100;
}

export default class Header extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', this.handleScrollToElement);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScrollToElement);
  }

  handleScrollToElement(event) {
    const sections = ['home', 'about', 'portfolio', 'blog', 'contact'];

    sections.forEach(e => {
      document.getElementById('navbar-item-' + e).classList.remove('is-active');
    });

    if (window.scrollY >= position(sections[0]) && window.scrollY < position(sections[1])) {
      document.getElementById('navbar-item-'+ sections[0]).classList.add('is-active');
    } else if (window.scrollY >= position(sections[1]) && window.scrollY < position(sections[2])){
      document.getElementById('navbar-item-'+ sections[1]).classList.add('is-active');
    } else if (window.scrollY >= position(sections[2]) && window.scrollY < position(sections[3])){
      document.getElementById('navbar-item-'+ sections[2]).classList.add('is-active');
    } else if (window.scrollY >= position(sections[3]) && window.scrollY < position(sections[4])){
      document.getElementById('navbar-item-'+ sections[3]).classList.add('is-active');
    } else if (window.scrollY >= position(sections[4])){
      document.getElementById('navbar-item-'+ sections[4]).classList.add('is-active');
    } else {
      document.getElementById('navbar-item-'+ sections[0]).classList.add('is-active');
    }

  }

  render() {
    return (
      <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation"
           onScroll={this.handleScrollToElement.bind(this)}>
        <div className="navbar-brand">
          {_.get(this.props, 'pageContext.site.siteMetadata.header.logo_img', null) ? (
              <Link to={withPrefix('/')} className="navbar-item">
                <img src={withPrefix(_.get(this.props, 'pageContext.site.siteMetadata.header.logo_img', null))}
                     alt={"github user"}/>
              </Link>
            ) :
            <Link to={withPrefix('/')}>
              {_.get(this.props, 'pageContext.site.siteMetadata.header.title', null)}
            </Link>
          }
          <span role="button" aria-label="menu" aria-expanded="false"
             className="navbar-burger burger"
             data-target="navbarBasic" onClick={() => {
            const burger = document.querySelector('.burger');
            const nav = document.querySelector('#navbarBasic');
            burger.classList.toggle('is-active')
            nav.classList.toggle('is-active')
          }}>
            <span aria-hidden="true"/>
            <span aria-hidden="true"/>
            <span aria-hidden="true"/>
          </span>
        </div>
        <div id="navbarBasic" className="navbar-menu">
          <div className="navbar-start">
            {_.map(_.get(this.props, 'pageContext.site.siteMetadata.header.nav_links', null),
              (action, action_idx) => {
                return (
                  <Link key={action_idx} to={withPrefix(_.get(action, 'url', null))}
                    className={'navbar-item'}
                    id={'navbar-item-' + _.get(action, 'label', null).toLowerCase()}
                    activeClassName={'is-active'}>
                    {_.get(action, 'label', null)}
                  </Link>
                )
              })
            }
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a href={"https://github.com/" + process.env.GATSBY_GITHUB_USER} target="_blank" rel="noopener noreferrer">
                  <p className="title">
                    <span className="icon is-large">
                      <i className="fa fa-github"/>
                    </span>
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}