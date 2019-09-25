import React from 'react';
import { Link } from 'react-router-dom';

import MailModal from './MailModal';
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

        <div className="fontFamilyNovecento displayFlex fontSize14px colorCharcoal">
          <Link to='/about' className="noDecoration colorCharcoal">
            <div className="horizontalMargin25px pointer">About Us</div>
          </Link>

          <Link to='/leadership' className="noDecoration colorCharcoal">
            <div className="horizontalMargin25px pointer">Leadership</div>
          </Link>

          <Link to='/events' className="noDecoration colorCharcoal">
            <div className="horizontalMargin25px pointer">Events</div>
          </Link>

          <Link to='/sponsors' className="noDecoration colorCharcoal">
            <div className="horizontalMargin25px pointer">Sponsors</div>
          </Link>
        </div>

        <div className="displayFlex flexColumn flexAlignEnd">
          <div>
            <a href="https://www.instagram.com/urmc_cornell" target="_blank">
              <img src={instagramIcon} className="socialMediaIcon horizontalMargin5px pointer" alt="Instagram Logo" />
            </a>

            <a href="https://www.facebook.com/pg/cornellurmc/about" target="_blank">
              <img src={facebookIcon} className="socialMediaIcon horizontalMargin5px pointer" alt="Facebook Logo" />
            </a>

            <a href="https://www.linkedin.com/company/19012674" target="_blank">
              <img src={linkedinIcon} className="socialMediaIcon horizontalMargin5px pointer" alt="LinkedIn Logo" />
            </a>

            <img src={mailIcon} className="socialMediaIcon horizontalMargin5px pointer" alt="Mail Logo"
              onClick={this.handleMailClick} />
          </div>

          {this.state.clicked ?
            <MailModal />
            :
            null
          }
        </div>
      </div >
    )
  };
};

export default Header; 
