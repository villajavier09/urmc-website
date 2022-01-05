import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Main.css';
import '../styles/Sidebar.css';

const whiteX = require('../assets/white-x-icon.png');
const instagramIcon = require('../assets/white-instagram.png');
const facebookIcon = require('../assets/white-facebook.png');
const linkedinIcon = require('../assets/white-linkedin.png');

const SidebarLink = (props) => {
  return (
    <div className="displayFlex flexColumn marginAuto width75P maxWidth75P">
      <Link to={props.to} className="noDecoration colorWhite fontFamilyRalewayB textUppercase
      verticalMargin15px" onClick={(e) => props.closeSidebar(e, true)}>
        <div>{props.title}</div>
      </Link>

      <div className="lineDivisor"></div>
    </div>
  )
}

const SocialMediaIcon = (props) => {
  return (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      <img src={props.icon} className="socialMediaIcon horizontalMargin10px pointer" alt={props.alt} />
    </a>
  )
}

const Sidebar = (props) => {
  return (
    <div className='fullHeight' onClick={(e) => props.closeSidebar(e)}>
      <div className="flexSpaceBetween marginAuto width75P maxWidth75P marginTop25px marginBottom10px">
        <img src={whiteX} className="whiteXIcon visibilityHidden" alt="White X Icon" />
        <img src={whiteX} className="whiteXIcon pointer" onClick={(e) => props.closeSidebar(e, true)} alt="White X Icon" />
      </div>

      <div className="fullHeight flexSpaceBetween flexColumn">
        <div className="displayFlex flexColumn">
          <SidebarLink title="Home" to="/" {...props} />
          <SidebarLink title="About" to="/about" {...props} />
          <SidebarLink title="Leadership" to="/leadership" {...props} />
          <SidebarLink title="Events" to="/events" {...props} />
          <SidebarLink title="Sponsors" to="/sponsors" {...props} />
          <SidebarLink title="Getting Involved" to="/join" {...props} />
          <SidebarLink title="TA Directory" to="/tadirectory" {...props} />

          <a href="https://securelb.imodules.com/s/1717/alumni/index.aspx?sid=1717&gid=2&pgid=3052&cid=7311&dids=702.87&sort=1&bledit=1#"
            className="noDecoration colorWhite fontFamilyRalewayB textUppercase verticalMargin15px width75P maxWidth75P marginAuto"
            target="_blank" rel="noopener noreferrer">
            Donate
          </a>
        </div>

        <div className="width75P maxWidth75P marginAuto flexCenter">
          <SocialMediaIcon icon={instagramIcon} href="https://www.instagram.com/urmc_cornell" alt="Instagram Icon" />
          <SocialMediaIcon icon={facebookIcon} href="https://www.facebook.com/pg/cornellurmc/about" alt="Facebook Icon" />
          <SocialMediaIcon icon={linkedinIcon} href="https://www.linkedin.com/company/19012674" alt="LinkedIn Icon" />
        </div>
      </div>
    </div >
  )
}

export default Sidebar;