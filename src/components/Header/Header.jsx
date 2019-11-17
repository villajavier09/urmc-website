import React from 'react';
import { Link } from 'react-router-dom';

import { Desktop, Tablet, Mobile, TabletAndMobile }
  from '../Util/Breakpoints';
import { ReactComponent as HamburgerIcon } from '../../assets/hamburger.svg';

import '../../main.css';
import './Header.css';

const fingerprint = require('../../assets/fingerprint.png');
const instagramIcon = require('../../assets/instagram.png');
const facebookIcon = require('../../assets/facebook.png');
const linkedinIcon = require('../../assets/linkedin.png');

const HeaderLink = (props) => {
  let underlineClass = props.title === props.currentPage ? 'headerUnderline colorCharcoal' : '';

  return (
    <Link to={props.to} className="noDecoration headerLink"
      onClick={() => props.updateCurrentPage(props.title)}>
      <div className={`${underlineClass} pointer horizontalMargin25px fontSize13px`}>{props.title}</div>
    </Link>
  )
}

const SocialMedia = (props) => {
  return (
    <a href={props.href} target="_blank">
      <img src={props.icon} className="socialMediaIcon horizontalMargin5px pointer" alt={props.alt} />
    </a>
  )
}

const Header = (props) => {
  return (
    <div className="flexSpaceBetween flexAlignCenter width90P marginAuto paddingTop15px">
      <Link to='/'>
        <img src={fingerprint} className="width50px" alt="URMC Fingerprint Logo"
          onClick={() => props.updateCurrentPage('Home')} />
      </Link>

      <Desktop>
        <div className="fontFamilyNovecento displayFlex fontSize14px">
          <HeaderLink to='/about' title='About Us' updateCurrentPage={props.updateCurrentPage}
            currentPage={props.currentPage} />
          <HeaderLink to='/leadership' title='Leadership' updateCurrentPage={props.updateCurrentPage}
            currentPage={props.currentPage} />
          <HeaderLink to='/events' title='Events' updateCurrentPage={props.updateCurrentPage}
            currentPage={props.currentPage} />
          <HeaderLink to='/sponsors' title='Sponsors' updateCurrentPage={props.updateCurrentPage}
            currentPage={props.currentPage} />
          <HeaderLink to='/join' title='Getting Involved' updateCurrentPage={props.updateCurrentPage}
            currentPage={props.currentPage} />
        </div>

        <div className="displayFlex flexAlignCenter">
          <SocialMedia
            icon={instagramIcon}
            href="https://www.instagram.com/urmc_cornell"
            alt="Instagram Logo" />

          <SocialMedia
            icon={facebookIcon}
            href="https://www.facebook.com/pg/cornellurmc/about"
            alt="Facebook Logo" />

          <SocialMedia
            icon={linkedinIcon}
            href="https://www.linkedin.com/company/19012674"
            alt="LinkedIn Logo" />
        </div>
      </Desktop>

      <TabletAndMobile>
        <HamburgerIcon onClick={props.openSidebar} className="hamburgerIcon pointer" />
      </TabletAndMobile>
    </div >
  )
}

export default Header;
