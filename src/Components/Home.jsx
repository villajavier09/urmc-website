/**
 * @fileoverview The home page which includes a graphic design of URMs coding,
 * as well as links to both the About and Join pages.
 */

import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Main.css';
import '../styles/Home.css';

import { DesktopAndTablet, Mobile } from './Common/Breakpoints';
import withScreenSize from './HOC/ScreenSize';

const girl = require('../assets/girl.png');


const HomeButton = (props) => {
  return (
    <Link to={props.link} className="noDecoration colorCharcoal"
      onClick={() => props.updateCurrentPage(props.pageTitle)}>
      <div className={`homeButton marginRight15px fitWidth textAlignCenter
        ${props.link === '/about' ? 'aboutButton' : 'listservButton'}
        ${props.breakpoint === 'D' ? 'fontSize14px' : 'fontSize12px'}`}>
        {props.buttonTitle}
      </div>
    </Link>
  )
}

const Home = (props) => {
  let breakpoint = props.breakpoint;

  let girlClasses = {
    D: 'girlHeight-lg',
    T: 'girlHeight-med',
    M: 'girlHeight-sm marginTop15px'
  }[breakpoint]

  let purposeText = breakpoint === 'M' ? 'fontSize14px textAlignCenter' : 'fontSize16px';


const GivingDayMessage = (props) =>{
  return(
    <div className= "marginTop35px">
    <div className= "fontFamilyRalewayB colorCharcoal fontSize25px ">
      {props.givingDayTitle}
    </div>
    <div className= {'${purposeText} marginTop25px fontFamilyRaleway colorCharcoal fontSize15px'}>
    Cornell's annual Day of Giving is on March 12th. This year consider making a gift to URMC. In the past year,
    our organization has grown in size from 10 active members to over 160. Your donation will help us sustain this
    growth. Donations will greatly assist URMC in funding scholarships for Tapia and AfroTech conferences, funding
    learning software and online courses, and expanding outreach oppurtunities.

    </div>
    <div className="marginTop15px">
    <iframe width= "500" height= "300" src="https://youtu.be/_kks1RLvpDg">
    </iframe>
    </div>
    <div className='marginTop25px colorCharcoal'>
    <Link to ="https://givingday.cornell.edu/campaigns/under-represented-minorities-in-computing-urmc">
    <button type = "button" className= "donateButton fontSize16px homeButton marginRight15px fitWidth textAlignCenter fontFamilyNovecento">
    Donate
    </button>
    </Link>
    </div>
    </div>
  )
}

  return (
    <div className="marginTop25px displayFlex">
      <div className={`${breakpoint === 'M' ? 'marginAuto' : 'width60P'}`}>
        <div className={`width75P marginAuto ${breakpoint === 'M' ? 'flexColumnAlignCenter' : ''}`}>
          <div className={`fontFamilyRalewayB colorCharcoal
            ${breakpoint === 'M' ? 'fontSize20px textAlignCenter' : 'fontSize30px'}`}>
            Underrepresented Minorities in Computing
          </div>

          <div className="marginTop25px fontFamilyRaleway colorCharcoal">
            The purpose of Underrepresented Minorities in Computing is to promote
            diversity within the computing fields and foster an environment that
            empowers underrepresented minorities with technological aspirations
            through career development, community building and academic support.
          </div>

          <Mobile>
            <img src={girl} alt="URMC Girl" className={girlClasses} />
          </Mobile>

          <div className="fontFamilyNovecento fontSize14px displayFlex marginTop35px">
            <HomeButton buttonTitle='Join the Listserv' link='/join' pageTitle='Getting Involved' {...props} />
            <HomeButton buttonTitle='Learn More' link='/about' pageTitle='About Us' {...props} />
          </div>

          <div>
          <GivingDayMessage givingDayTitle="Consider Donating for Giving Day"/ >
          </div>

      </div>
      </div>
      <DesktopAndTablet>
        <img src={girl} alt="URMC Girl" className={girlClasses} />
      </DesktopAndTablet>
    </div>
  )
}

export default withScreenSize(Home);
