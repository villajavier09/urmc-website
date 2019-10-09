import React from 'react';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import { Desktop, Tablet, Mobile, TabletAndMobile }
  from '../util/Breakpoints';
import MailModal from './MailModal';
import SocialMedia from './SocialMedia';
import HeaderLink from './HeaderLink';
import { ReactComponent as HamburgerIcon } from '../../assets/hamburger.svg';

import '../../main.css';
import './Header.css';

const fingerprint = require('../../assets/fingerprint.png');
const instagramIcon = require('../../assets/instagram.png');
const facebookIcon = require('../../assets/facebook.png');
const linkedinIcon = require('../../assets/linkedin.png');
const mailIcon = require('../../assets/mail.png');

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.handleMailClick = this.handleMailClick.bind(this);

    this.state = {
      clicked: false
    }
  }

  handleMailClick() {
    this.setState({
      clicked: !this.state.clicked
    });
  }

  render() {

    return (
      <div className="flexSpaceBetween flexAlignCenter width90P marginAuto marginTop15px">
        <Link to='/'>
          <img src={fingerprint} className="width50px" alt="URMC Fingerprint Logo" />
        </Link>

        <Desktop>
          <div className="fontFamilyNovecento displayFlex flexAlignCenter fontSize14px">
            <HeaderLink to='/about' title='About Us' />
            <HeaderLink to='/leadership' title='Leadership' />
            <HeaderLink to='/events' title='Events' />
            <HeaderLink to='/sponsors' title='Sponsors' />

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

            <img src={mailIcon} className="socialMediaIcon horizontalMargin5px pointer" alt="Mail Logo"
              onClick={this.handleMailClick} />

            {this.state.clicked ?
              <MailModal />
              :
              null
            }
          </div>
        </Desktop>

        <TabletAndMobile>
          <HamburgerIcon onClick={this.props.openSidebar} className="hamburgerIcon pointer" />
        </TabletAndMobile>
      </div >
    )
  };
};

export default Header;
