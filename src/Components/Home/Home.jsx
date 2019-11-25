// React Library
import React from 'react';
import { Link } from 'react-router-dom';

// CSS Files
import '../../main.css';
import './Home.css';

// Components
import { DesktopAndTablet, Mobile } from '../Util/Breakpoints';
import withScreenSize from '../HOC/ScreenSize';

// Images
const girl = require('../../assets/girl.png');

const HomeButton = (props) => {
  return (
    <Link to={props.link} className="noDecoration colorCharcoal"
      onClick={() => props.updateCurrentPage(props.pageTitle)}>
      <div className={`homeButton marginRight15px fitWidth pointer textAlignCenter
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

  let purposeTextClass = props.breakpoint === 'M' ? 'fontSize14px textAlignCenter' : 'fontSize16px';

  return (
    <div className="marginTop25px displayFlex flexAlignCenter">
      <div className={`${breakpoint === 'M' ? 'marginAuto' : 'width60P'}`}>
        <div className={`width75P marginAuto
          ${breakpoint === 'M' ? 'flexColumnAlignCenter' : null}`}>
          <div className={`fontFamilyRalewayB colorCharcoal
            ${breakpoint === 'M' ? 'fontSize20px textAlignCenter' : 'fontSize30px'}`}>Underrepresented Minorities in Computing</div>

          <div className={`${purposeTextClass} marginTop25px fontFamilyRaleway colorCharcoal`}>
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
        </div>
      </div>

      <DesktopAndTablet>
        <img src={girl} alt="URMC Girl" className={girlClasses} />
      </DesktopAndTablet>
    </div>
  )
}

export default withScreenSize(Home);
