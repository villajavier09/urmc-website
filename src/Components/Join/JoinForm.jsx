// React Library
import React from 'react';

const FormItem = (props) => {
  return (
    <div className="verticalMargin15px flexSpaceBetween flexAlignCenter">
      <label>{props.label}</label>
      <input onChange={props.onChange} name={props.name} value={props.value}
        type={props.type || "text"}/>
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
      position: ''
    }
  }

  onChange(event) {
    this.setState( { [event.target.name]: event.target.value} );
  }

  submitForm(event) {
    event.preventDefault();

    if (this.props.subtitle === 'Join the Listserv') {
      this.subscribeToListserv();
    } else this.sendCompanyEmail();
  }

  async subscribeToListserv() {
    console.log("YER");
    const URL = 'https://www.list.cornell.edu/subscribe/subscribe.tml';

    let formData = new FormData();

    let data = {
      email: this.state.email,
      name: this.state.name,
      list: 'urmc-l',
      lists: 'urmc-l',
      confirm: 'one',
      showconfirm: 'F',
      secx: 'cfe1b6e8'
    }

    for (const name in data) {
      formData.append(name, data[name]);
    }

    let options = {
      method: 'POST',
      body: formData,
      mode: 'cors'
    };

    let response = await fetch(URL, options);

    let wasMember;

    console.log(response);
    if (response && response.ok) {
        let data = await response.text();

        wasMember = data.includes("You are already a member of the 'urmc-l' mailing list.");
    }

    let alertMessage;

    if (wasMember) {
      alertMessage = `${this.state.email} is already subscribed to URMC's mailing list. Thank you for being a part of the URMC community!`;
    } else {
      alertMessage = `${this.state.email} is now subscribed to URMC's mailing list. Please check your email for a confirmation message. Welcome to the URMC community! :-)`;
    }

    alert(alertMessage);

    this.setState({
      name: '',
      email: '',
      company: '',
      position: ''
    });
  }

  sendCompanyEmail() {
    console.log("SENDING COMPANY EMAIL");
  }

  render() {

    const { name, email, company, position } = this.state;

    return (
      <div className={`fontFamilyRalewayB colorCharcoal flexColumnAlignCenter
      ${this.props.breakpoint === 'D' ? 'width40P horizontalMargin25px' : 'width75P marginBottom25px'}
      ${this.props.title === 'Companies' && this.props.breakpoint !== 'D' ? 'marginTop25px' : null}`}>
        <div className="fontSize18px marginBottom3px">{this.props.title}</div>
        <div className="colorGold fontSize16px marginBottom10px">{this.props.subtitle}</div>
        <div className="colorLightGrey fontSize12px textAlignCenter marginBottom10px">{this.props.description}</div>
  
        <form id={this.props.subtitle} className="width90P" onSubmit={this.submitForm}>
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
        </form>
  
        <button type="submit" className="width90P marginTop15px verticalPadding8px
        fontFamilyRalewayB colorWhite fontSize13px borderRadius5px" form={this.props.subtitle}>
          {this.props.buttonTitle}
        </button>
      </div>
    )
  }
}

export default JoinForm;