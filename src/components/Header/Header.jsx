import React from 'react';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import MailModal from './MailModal';
import '../../main.css';
import './Header.css';
import { ReactComponent as HamburgerIcon } from '../../assets/hamburger.svg';

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

    let windowWidth = this.props.windowWidth;

    let linkMarginStyle = {
      marginRight: '25px',
      marginLeft: '25px'
    }

    if (windowWidth < 1000) {
      linkMarginStyle = {
        marginRight: '10px',
        marginLeft: '10px'
      }
    }

    return (
      <div className="flexSpaceBetween flexAlignCenter width90P marginAuto marginTop15px">
        <Link to='/'>
          <img src={fingerprint} className="width50px" alt="URMC Fingerprint Logo" />
        </Link>

        <MediaQuery minWidth={800}>
          <div className="fontFamilyNovecento displayFlex fontSize14px colorCharcoal">
            <Link to='/about' className="noDecoration colorCharcoal">
              <div className="pointer"
                style={linkMarginStyle}>About Us</div>
            </Link>

            <Link to='/leadership' className="noDecoration colorCharcoal">
              <div className="pointer" style={linkMarginStyle}>Leadership</div>
            </Link>

            <Link to='/events' className="noDecoration colorCharcoal">
              <div className="pointer" style={linkMarginStyle}>Events</div>
            </Link>

            <Link to='/sponsors' className="noDecoration colorCharcoal">
              <div className="pointer" style={linkMarginStyle}>Sponsors</div>
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
        </MediaQuery>

        <MediaQuery maxWidth={799}>
          <HamburgerIcon onClick={this.props.openSidebar} className="hamburgerIcon pointer" />
        </MediaQuery>
      </div >
    )
  };
};

export default Header;
