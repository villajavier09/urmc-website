// React Library
import React from 'react';

// CSS Files
import '../styles/main.css';
import '../styles/Join.css';

// Components
import JoinForm from './JoinForm';
import withScreenSize from './HOC/ScreenSize';
import { DesktopAndTablet, Mobile } from './Common/Breakpoints';

// Images
const mailIcon = require('../assets/mail.png');
const instagramIcon = require('../assets/instagram.png');
const facebookIcon = require('../assets/facebook.png');
const linkedinIcon = require('../assets/linkedin.png');
const donateIcon = require('../assets/donation.png');

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
  Information Science community!`;

  const sponsorDescription = `Does your company want the opportunity to connect
  with extremely talented students of color in computing? Reach out to us via
  email to connect with our Corporate Directors and receive our Corporate
  Sponsorship Packet for 2019-2020!`;

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
