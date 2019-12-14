/**
 * @fileoverview The header of the application. Includes links to each of the
 * components and has logos to different URMC social media pages. When the window's
 * width of the window is tablet size or smaller, the header turns into a
 * hamburger menu.
 */

import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/main.css';
import '../styles/Header.css';

import { Desktop, TabletAndMobile } from './Util/Breakpoints';
import { ReactComponent as HamburgerIcon } from '../assets/hamburger.svg';

const pathnameMap = require('./Util/pathnameMap');
const socialMediaMap = require('./Util/socialMedia');
const fingerprint = require('../assets/fingerprint.png');

const HeaderLink = (props) => {
  let selectedPage = props.title === props.currentPage ? 'headerUnderline colorCharcoal' : '';

  return (
    <Link to={props.to} className="noDecoration headerLink"
      onClick={() => props.updateCurrentPage(props.title)}>
      <div className={`${selectedPage} horizontalMargin25px fontSize13px textAlignCenter`}>{props.title}</div>
    </Link>
  )
}

const SocialMedia = (props) => {
  return (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      <img src={props.icon} className="socialMediaIcon horizontalMargin5px" alt={props.alt} />
    </a>
  )
}

const Header = (props) => {
  let headerLinks = [];

  for (const [path, title] of Object.entries(pathnameMap)) {
    if (path === '/' || path === '/admin') continue;

    headerLinks.push(
      <HeaderLink to={path} title={title} updateCurrentPage={props.updateCurrentPage}
        currentPage={props.currentPage} key={path} />
    )
  }

  let socialMedias = [];

  for (const [name, obj] of Object.entries(socialMediaMap)) {
    socialMedias.push(
      <SocialMedia icon={obj.logo} href={obj.href} alt={`${name} Logo`} key={name} />
    )
  }

  return (
    <div className="flexSpaceBetween flexAlignCenter width90P marginAuto paddingTop15px">
      <Link to='/'>
        <img src={fingerprint} className="width50px" alt="URMC Fingerprint Logo"
          onClick={() => props.updateCurrentPage('Home')} />
      </Link>

      <Desktop>
        <div className="fontFamilyNovecento displayFlex fontSize14px">
          {headerLinks}

          <a href="https://securelb.imodules.com/s/1717/alumni/index.aspx?sid=1717&gid=2&pgid=3052&cid=7311&dids=702.87&sort=1&bledit=1#"
            className="noDecoration headerLink horizontalMargin25px" target="_blank" rel="noopener noreferrer">
            Donate
          </a>
        </div>

        <div className="displayFlex flexAlignCenter">{socialMedias}</div>
      </Desktop>

      <TabletAndMobile>
        <HamburgerIcon onClick={props.openSidebar} className="minWidth50px pointer" />
      </TabletAndMobile>
    </div >
  )
}

export default Header;
