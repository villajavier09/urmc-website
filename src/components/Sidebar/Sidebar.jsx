import React from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

import '../../main.css';
import './Sidebar.css';

import { ReactComponent as WhiteXIcon } from '../../assets/white-x-icon.svg';
const instagramIcon = require('../../assets/white-instagram.png');
const facebookIcon = require('../../assets/white-facebook.png');
const linkedinIcon = require('../../assets/white-linkedin.png');
const mailIcon = require('../../assets/white-mail.png');

class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    this.sidebarRef = React.createRef();

    this.state = {
      active: false
    }
  }

  componentDidMount () {
    this.sidebarRef.current.classList.add('active');
  }

  render () {
    return (
        <div id='sidebar' ref={this.sidebarRef} onClick={(e) => this.props.closeSidebar(e)}>
          <div className="flexSpaceBetween marginAuto width75P maxWidth75P marginTop25px">
              <WhiteXIcon className="whiteXIcon pointer hidden" />
              <WhiteXIcon className="whiteXIcon pointer" onClick={(e) => this.props.closeSidebar(e, true)} />
          </div>

          <div className="fullHeight">
            <div className="displayFlex flexColumn">
              <div className="displayFlex flexColumn marginAuto width75P maxWidth75P">
                <Link to='/' className="noDecoration colorWhite fontFamilyRalewayB textUppercase
                verticalMargin15px" onClick={(e) => this.props.closeSidebar(e, true)}>
                  <div>Home</div>
                </Link>

                <div className="lineDivisor"></div>
              </div>

              <div className="displayFlex flexColumn marginAuto width75P maxWidth75P">
                <Link to='/about' className="noDecoration colorWhite fontFamilyRalewayB textUppercase
                verticalMargin15px" onClick={(e) => this.props.closeSidebar(e, true)}>
                  <div>About</div>
                </Link>

                <div className="lineDivisor"></div>
              </div>

              <div className="displayFlex flexColumn marginAuto width75P maxWidth75P">
                <Link to='/leadership' className="noDecoration colorWhite fontFamilyRalewayB textUppercase
                verticalMargin15px" onClick={(e) => this.props.closeSidebar(e, true)}>
                  <div>Leadership</div>
                </Link>

                <div className="lineDivisor"></div>
              </div>

              <div className="displayFlex flexColumn marginAuto width75P maxWidth75P">
                <Link to='/events' className="noDecoration colorWhite fontFamilyRalewayB textUppercase
                verticalMargin15px" onClick={(e) => this.props.closeSidebar(e, true)}>
                  <div>Events</div>
                </Link>

                <div className="lineDivisor"></div>
              </div>

              <div className="displayFlex flexColumn marginAuto width75P maxWidth75P">
                <Link to='/sponsors' className="noDecoration colorWhite fontFamilyRalewayB textUppercase
                verticalMargin15px" onClick={(e) => this.props.closeSidebar(e, true)}>
                  <div>Sponsors</div>
                </Link>
              </div>
            </div>

            <div className="flexCenter flexColumn height50P">
              <div className="marginAuto width75P maxWidth75P bgWhite borderRadius10px
              fontFamilyRalewayB textUppercase colorGold textAlignCenter
              verticalPadding10px">
                Join Listserv
              </div>
            </div>
            

            <div className="width75P maxWidth75P marginAuto flexCenter">
              <a href="https://www.instagram.com/urmc_cornell" target="_blank">
                <img src={instagramIcon} className="socialMediaIcon horizontalMargin10px pointer" alt="Instagram Logo" />
              </a>

              <a href="https://www.facebook.com/pg/cornellurmc/about" target="_blank">
                <img src={facebookIcon} className="socialMediaIcon horizontalMargin10px pointer" alt="Facebook Logo" />
              </a>

              <a href="https://www.linkedin.com/company/19012674" target="_blank">
                <img src={linkedinIcon} className="socialMediaIcon horizontalMargin10px pointer" alt="LinkedIn Logo" />
              </a>

              <img src={mailIcon} className="socialMediaIcon horizontalMargin10px pointer" alt="Mail Logo" />
            </div>
          </div>        
        </div >
    )
  }
}

export default Sidebar; 