import React from 'react';
import _ from 'lodash';

import {htmlToReact} from '../../utils';
import FormField from '../FormField';
import CtaButtons from "../CtaButtons";

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default class SectionContact extends React.Component {
  constructor(props) {
    super(props);
    this.section = _.get(this.props, 'section', null);
    this.state = { email: "", message: "" };
  }

  handleSubmit = e => {
    console.log(this.state)
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": _.get(this.section, 'form_id', null), ...this.state })
    })
      .then(() => alert("Success!"))
      .catch(error => alert(error));

    e.preventDefault();
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { email, message } = this.state;

    return (
      <section className="hero is-medium" id={_.get(this.section, 'section_id', null)}>
        <div className="hero-body">
          <div className="container is-max-desktop">
            <div className="block mb-6 pb-6 has-text-centered">
              {_.get(this.section, 'title', null) && (
                <p className="title is-1">
                  {_.get(this.section, 'title', null)}
                </p>
              )}
              {_.get(this.section, 'subtitle', null) && (
                <p className="subtitle is-2">
                  {_.get(this.section, 'subtitle', null)}
                </p>
              )}
            </div>
          </div>

          <div className="container is-max-desktop">
            <div className="box has-background-dark">
              <div className="columns is-vcentered is-centered is-justify-content-space-around my-6">
                <div className="column is-6-tablet is-5-widescreen">
                {_.get(this.section, 'content', null) && (
                  <div className="content is-medium has-text-centered-mobile">
                    {htmlToReact(_.get(this.section, 'content', null))}
                  </div>
                )}
                {_.get(this.section, 'actions', null) && (
                  <div className="buttons is-centered">
                    <CtaButtons {...this.props} actions={_.get(this.section, 'actions', null)} />
                  </div>
                )}
              </div>
                <div className="column is-6-tablet is-5-widescreen">
                <form name={_.get(this.section, 'form_id', null)}
                      id={_.get(this.section, 'form_id', null)}
                      {...(_.get(this.section, 'form_action', null) ?
                        ({action: _.get(this.section, 'form_action', null)}) : null)}
                      onSubmit={this.handleSubmit}
                      data-netlify="true" method="post">
                  <input type="hidden" name="form-name" value="contact" />
                  <input type="hidden" aria-label={_.get(this.section, 'form_id', null) + '-name'}
                         name="form-name" value={_.get(this.section, 'form_id', null)}/>
                  {_.map(_.get(this.section, 'form_fields', null), (field, field_idx) => (
                    <FormField key={field_idx} {...this.props} field={field} value={this.state} onChange={this.handleChange}/>
                  ))}
                  <div className="buttons is-centered">
                    <button type="submit" className="button is-link is-large is-rounded">
                      {_.get(this.section, 'submit_label', null)}
                    </button>
                  </div>
                </form>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}