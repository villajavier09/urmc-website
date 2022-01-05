// React Library
import React from 'react';

// CSS Files
import '../styles/Main.css';
import '../styles/Join.css';

// Components
import JoinForm from './JoinForm';
import withScreenSize from './HOC/ScreenSize';
import { DesktopAndTablet, Mobile } from './Common/Breakpoints';
import { Link } from 'react-router-dom';

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
      ${props.breakpoint === 'D' ? 'bigSocialMediaIcon' : 'smallSocialMediaIcon'}`} />
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

  const alumniDescription = 'Are you an alumni who wants to keep up with \
  URMC? Join the listserv to receive emails about URMC events and learn about \
  ways to get involved in the organization. ';

  const alumniTitle = "Alumni";
  const alumniSubtitle = "Join our Listserv"

  return (
    <div className={`flexSpaceBetween marginAuto verticalMargin25px
    ${props.breakpoint !== 'M' ? 'maxWidth75P' : null}`}>
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

        <div className={`${props.breakpoint === 'D' ? 'verticalFormDivider'
          : 'horizontalFormDivider'}`}></div>

        <div className="fontFamilyRalewayB colorCharcoal flexColumnAlignCenter width40P horizontalMargin25px">
          <div className="fontSize18px marginBottom3px">{alumniTitle}</div>
          <div className="colorGold fontSize16px marginBottom10px">{alumniSubtitle}</div>
          <div className="colorLightGrey fontSize12px textAlignCenter marginBottom10px">{alumniDescription}</div>
          <div className="colorGold marginTop15px">
            <a className="alumniButton fitWidth verticalPadding8px fontFamilyRalewayB colorWhite fontSize13px borderRadius5px" href="https://docs.google.com/forms/d/1FMHMJnXLrYXLFnZqWzgK9mXtQjUeEKSJji-XBJWpPm8/edit#responses" target="_blank">
              Interest Form
            </a>
          </div>
        </div>


        <Mobile>
          <div className='horizontalFormDivider marginBottom25px'></div>
          <ContactBar {...props} />
        </Mobile>
      </div>
    </div>
  )
}


export default withScreenSize(Join);
