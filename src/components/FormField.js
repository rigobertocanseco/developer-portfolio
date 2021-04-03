import React from 'react';
import _ from 'lodash';

export default class FormField extends React.Component {
  render() {
    let field = _.get(this.props, 'field', null);
    return (
      (_.get(field, 'input_type', null) === 'recaptcha') ? (
        <div className="">
          <div className="g-recaptcha" data-sitekey={process.env.GATSBY_RECAPTCHA_KEY}/>
        </div>
      ) : (_.get(field, 'input_type', null) === 'checkbox') ? (
        <div className="field">
            <div className="control">
              <label className="checkbox">
                <input type="checkbox"
                       value={ _.get(this.props, 'value', null)[_.get(field, 'name', null)]}
                       id={_.get(field, 'name', null)}
                       name={_.get(field, 'name', null)}
                       {...(_.get(field, 'is_required', null) ? ({required: true}) : null)}/>
                  {_.get(field, 'label', null)}
              </label>
            </div>
          </div>
      ) : ((_.get(field, 'input_type', null) === 'select') ? (
        <div className="field">
          {_.get(field, 'label', null) && (
            <label htmlFor={_.get(field, 'name', null)} className="label is-medium has-text-primary">
              {_.get(field, 'label', null)}
            </label>
          )}
          <div className="control">
            <div className="select is-medium is-primary">
              <select id={_.get(field, 'name', null)}
                      name={_.get(field, 'name', null)}
                      {...(_.get(field, 'is_required', null) ? ({required: true}) : null)}>
                {_.get(field, 'default_value', null) && (
                  <option value="">{_.get(field, 'default_value', null)}</option>
                )}
                {_.map(_.get(field, 'options', null), (option, option_idx) => (
                  <option key={option_idx} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ) : ((_.get(field, 'input_type', null) === 'textarea') ? (
        <div className="field">
          {_.get(field, 'label', null) && (
            <label htmlFor={_.get(field, 'name', null)} className="label is-medium has-text-primary">
              {_.get(field, 'label', null)}
            </label>
          )}
          <div className="control">
            <textarea name={_.get(field, 'name', null)}
                id={_.get(field, 'name', null)}
                value={ _.get(this.props, 'value', null)[_.get(field, 'name', null)]}
                onChange={_.get(this.props, 'onChange', null)}
                className="textarea is-medium has-text-black"
                rows="5" {...(_.get(field, 'default_value', null) ?
                ({placeholder: _.get(field, 'default_value', null)}) : null)}
                {...(_.get(field, 'is_required', null) ? ({required: true}) : null)}/>
          </div>
        </div>
      ) :
        <div className="field">
          {_.get(field, 'label', null) && (
            <label className="label is-medium has-text-primary" htmlFor={_.get(field, 'name', null)}>
              {_.get(field, 'label', null)}</label>
          )}
          <div className="control">
            <input className="input is-medium is-primary has-text-black"
               type={_.get(field, 'input_type', null)}
               name={_.get(field, 'name', null)}
               value={ _.get(this.props, 'value', null)[_.get(field, 'name', null)]}
               onChange={_.get(this.props, 'onChange', null)}
               id={_.get(field, 'name', null)}
               {...(_.get(field, 'default_value', null) ?
                 ({placeholder: _.get(field, 'default_value', null)}) : null)}
               {...(_.get(field, 'is_required', null) ? ({required: true}) : null)} />
          </div>
        </div>
      ))
    );
  }
}
