// React Library
import React from 'react';

// CSS Files
import '../../main.css';
import './Join.css';

// Components
import withScreenSize from '../HOC/ScreenSize';
import { DesktopAndTablet, Mobile } from '../Util/Breakpoints';

// Images
const mailIcon = require('../../assets/mail.png');
const instagramIcon = require('../../assets/instagram.png');
const facebookIcon = require('../../assets/facebook.png');
const linkedinIcon = require('../../assets/linkedin.png');
const donateIcon = require('../../assets/donation.png');

const ContactIcon = (props) => {
  return (
    <a href={props.href} className="flexColumnAlignCenter noDecoration colorCharcoal
    fontFamilyRalewayB maxWidth200px verticalMargin10px" target="_blank" rel="noopener noreferrer">
      <img src={props.icon} alt={props.alt}
      className={`${props.href !== undefined ? 'pointer' : null}
      ${props.breakpoint === 'D' ? 'bigSocialMediaIcon' : 'smallSocialMediaIcon' }`} />
      <div className={`textAlignCenter marginTop10px
      ${props.breakpoint === 'D' ? 'fontSize13px' : 'fontSize12px'}`}>
        {props.title}
      </div>
    </a>
  )
}

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
      body: formData
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

  submitForm(event) {
    event.preventDefault();

    if (this.props.subtitle === 'Join the Listserv') {
      this.subscribeToListserv();
    } else this.sendCompanyEmail();
  }

  onChange(event) {
    this.setState( { [event.target.name]: event.target.value} );
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
          <FormItem onChange={this.onChange} type="email" name="email" value={email} label="Email Address" />
  
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

const ContactBar = (props) => {
  return (
    <div className="flexColumnAlignCenter contactDiv minHeight">
      <ContactIcon {...props}
        icon={mailIcon}
        alt="Email Logo"
        title="urmc@cornell.edu" />

      <ContactIcon {...props}
        icon={instagramIcon}
        href="https://www.instagram.com/urmc_cornell"
        alt="Instagram Logo"
        title="@cornellurmc" />

      <ContactIcon {...props}
        icon={facebookIcon}
        href="https://www.facebook.com/pg/cornellurmc/about"
        alt="Facebook Logo"
        title="@cornellurmc" />

      <ContactIcon {...props}
        icon={linkedinIcon}
        href="https://www.linkedin.com/company/19012674"
        alt="LinkedIn Logo"
        title="Underrepresented Minorities in Computing" />

      <ContactIcon {...props}
        icon={donateIcon}
        href="https://securelb.imodules.com/s/1717/alumni/index.aspx?sid=1717&gid=2&pgid=3052&cid=7311&dids=702.87&sort=1&bledit=1#"
        alt="Donate Logo"
        title="Donate to URMC!" />
    </div>
  )
}

const Join = (props) => {

  const listservDescription = `Our listserv emails are the central place to find
  out about all URMC events, on-campus and off-campus opportunities
  (internships/jobs) and other things happening within the Computer and
  Information Science community!`

  const sponsorDescription = `Does your company want the opportunity to connect
  with extremely talented students of color in computing? Reach out to us via
  email to connect with our Corporate Directors and receive our Corporate
  Sponsorship Packet for 2019-2020!`

  return (
    <div className={`flexSpaceBetween marginAuto verticalMargin25px
    ${props.breakpoint !== 'M' ? 'maxWidth75P' : null }`}>
      <DesktopAndTablet>
        <ContactBar {...props} />
      </DesktopAndTablet>

      <div className={`${props.breakpoint === 'D' ? 'displayFlex flexContentEnd'
        : 'flexColumn flexAlignCenter'}`}>

        <JoinForm title="Students" subtitle="Join the Listserv"
        description={listservDescription} buttonTitle="Subscribe" {...props} />

        <div className={`${props.breakpoint === 'D' ? 'verticalFormDivider'
        : 'horizontalFormDivider'}`}></div>

        <JoinForm title="Companies" subtitle="Sponsor Us"
        description={sponsorDescription} buttonTitle="Send Interest" {...props} />

        <Mobile>
          <div className='horizontalFormDivider marginBottom25px'></div>

          <ContactBar {...props} />
        </Mobile>
      </div>
    </div>
  )
}


export default withScreenSize(Join);
