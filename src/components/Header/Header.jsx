import React from 'react';
import { Link } from 'react-router-dom';

import { Desktop, Tablet, Mobile, TabletAndMobile }
  from '../Util/Breakpoints';
import MailModal from './MailModal';
import SocialMedia from './SocialMedia';
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
    this.updateCurrentPage = this.updateCurrentPage.bind(this);

    this.pathnameMap = {
      '/': 'Home',
      '/about': 'About Us',
      '/leadership': 'Leadership',
      '/events': 'Events',
      '/sponsors': 'Sponsors'
    }

    this.state = {
      clicked: false,
      currentPage: ''
    }
  }

  componentWillMount() {
    this.setState({ currentPage: this.pathnameMap[window.location.pathname] })
  }

  handleMailClick() {
    this.setState({
      clicked: !this.state.clicked
    });
  }

  updateCurrentPage(page) {
    this.setState({ currentPage: page });
  }

  componentDidUpdate() {
    console.log(this.state.currentPage)
  }

  render() {

    return (
      <div className="flexSpaceBetween flexAlignCenter width90P marginAuto marginTop15px">
        <Link to='/'>
          <img src={fingerprint} className="width50px" alt="URMC Fingerprint Logo"
            onClick={() => this.updateCurrentPage('Home')} />
        </Link>

        <Desktop>
          <div className="fontFamilyNovecento displayFlex fontSize14px">
            <HeaderLink to='/about' title='About Us' updateCurrentPage={this.updateCurrentPage}
              currentPage={this.state.currentPage} />
            <HeaderLink to='/leadership' title='Leadership' updateCurrentPage={this.updateCurrentPage}
              currentPage={this.state.currentPage} />
            <HeaderLink to='/events' title='Events' updateCurrentPage={this.updateCurrentPage}
              currentPage={this.state.currentPage} />
            <HeaderLink to='/sponsors' title='Sponsors' updateCurrentPage={this.updateCurrentPage}
              currentPage={this.state.currentPage} />

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
            {/* 
            {this.state.clicked ?
              <MailModal />
              :
              null
            } */}
          </div>
        </Desktop>

        <TabletAndMobile>
          <HamburgerIcon onClick={this.props.openSidebar} className="hamburgerIcon pointer" />
        </TabletAndMobile>
      </div >
    )
  };
};

const HeaderLink = (props) => {
  let underlineClass = props.title === props.currentPage ? 'headerUnderline' : '';

  return (
    <Link to={props.to} className="noDecoration colorCharcoal"
      onClick={() => props.updateCurrentPage(props.title)}>
      <div className={`${underlineClass} pointer horizontalMargin25px`}>{props.title}</div>
    </Link>
  )
}

export default Header;
