// React Library
import React from 'react';

import '../styles/main.css';
import '../styles/Join.css';

const FormItem = (props) => {
  return (
    <div className="verticalMargin15px flexSpaceBetween flexAlignCenter">
      <label>{props.label}</label>
      <input required onChange={props.onChange} name={props.name} value={props.value}
        type={props.type || "text"} />
    </div>
  )
}

class JoinForm extends React.Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      name: '',
      email: '',
      company: '',
      position: '',
      emailSending: false
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitForm(event) {
    if (this.props.subtitle === 'Join the Listserv') {
      this.resetForm();
    } else this.sendCompanyEmail(event);
  }

  resetForm() {
    setTimeout(() => {
      this.setState({
        name: '',
        email: '',
        company: '',
        position: ''
      });
    }, 0);
  }

  async sendCompanyEmail(event) {
    event.preventDefault();

    this.setState({ emailSending: true });

    const URL = process.env.NODE_ENV === 'development' ?
      'http://127.0.0.1:8080/' : 'https://urmc-website-api.herokuapp.com/'

    let body = {
      name: this.state.name,
      email: this.state.email,
      company: this.state.company,
      position: this.state.position
    }

    let options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(body)
    }

    let response = await fetch(URL, options);
    this.setState({ emailSending: false });

    let alertMessage;

    if (response && response.ok) {
      alertMessage = `Your interest has been sent to our Corporate Directors. Please give them a few days to reach back out to you. Talk soon!`
    } else {
      alertMessage = `Unfortunately, there was a problem in sending your interest to sponsor URMC. Please shoot us a manual email at urmc@cornell.edu. Thanks!`
    }

    alert(alertMessage);

    this.resetForm();
  }

  render() {

    const { name, email, company, position } = this.state;

    const actionURL = this.props.subtitle === 'Join the Listserv' ?
      "https://www.list.cornell.edu/subscribe/subscribe.tml" : null;

    const formMethod = this.props.subtitle === 'Join the Listserv' ? "POST" : null;
    const formTarget = this.props.subtitle === 'Join the Listserv' ? "_blank" : null;

    return (
      <div className={`fontFamilyRalewayB colorCharcoal flexColumnAlignCenter
      ${this.props.breakpoint === 'D' ? 'width40P horizontalMargin25px' : 'width75P marginBottom25px'}
      ${this.props.title === 'Companies' && this.props.breakpoint !== 'D' ? 'marginTop25px' : null}`}>
        <div className="fontSize18px marginBottom3px">{this.props.title}</div>
        <div className="colorGold fontSize16px marginBottom10px">{this.props.subtitle}</div>
        <div className="colorLightGrey fontSize12px textAlignCenter marginBottom10px">{this.props.description}</div>

        <form id={this.props.subtitle} className="width90P"
          action={actionURL} method={formMethod}
          target={formTarget} onSubmit={this.submitForm}>

          <FormItem onChange={this.onChange} name="name" value={name} label="Full Name" />
          <FormItem onChange={this.onChange} name="email" value={email} label="Email Address" type="email" />

          {
            this.props.title === 'Companies' ?
              <div>
                <FormItem onChange={this.onChange} name="company" value={company} label="Company" />
                <FormItem onChange={this.onChange} name="position" value={position} label="Position" />
              </div>
              :
              null
          }

          <input type="text" className="hidden noWidthAndHeight" name="list" value="urmc-l" readOnly />
          <input type="text" className="hidden noWidthAndHeight" name="lists" value="urmc-l" readOnly />
          <input type="text" className="hidden noWidthAndHeight" name="confirm" value="one" readOnly />
          <input type="text" className="hidden noWidthAndHeight" name="showconfirm" value="F" readOnly />
          <input type="text" className="hidden noWidthAndHeight" name="secx" value="cfe1b6e8" readOnly />
        </form>

        <button type="submit" className={`width90P marginTop15px verticalPadding8px
          fontFamilyRalewayB colorWhite fontSize13px borderRadius5px
          ${this.state.emailSending ? 'submitButtonDisabled' : 'submitButton'}`} form={this.props.subtitle}>
          {this.state.emailSending ? 'Sending' : this.props.buttonTitle}
        </button>
      </div>
    )
  }
}

export default JoinForm;
