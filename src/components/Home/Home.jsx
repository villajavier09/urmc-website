import React from 'react';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import { DesktopAndTablet, Mobile } from '../util/Breakpoints';

import '../../main.css';
import './Home.css';

import withScreenSize from '../HOC/ScreenSize';

const girl = require('../../assets/girl.png');

class Home extends React.Component {
  render() {

    let girlClasses = {
      desktop: 'girlHeight-lg',
      tablet: 'girlHeight-med',
      mobile: 'girlHeight-sm marginTop15px'
    }[this.props.breakpoint]

    let titleClasses = {
      desktop: 'fontSize30px fontFamilyRalewayB colorCharcoal',
      tablet: 'fontSize30px fontFamilyRalewayB colorCharcoal',
      mobile: 'fontSize20px fontFamilyRalewayB colorCharcoal'
    }[this.props.breakpoint]

    let purposeClasses = {
      desktop: '',
      tablet: '',
      mobile: 'fontSize12px'
    }[this.props.breakpoint]

    return (
      <div className="marginTop25px displayFlex flexAlignCenter">
        <DesktopAndTablet>
          <div className="width60P">
              <div className="width75P marginAuto">
                <div className="fontSize30px fontFamilyRalewayB colorCharcoal">Underrepresented Minorities in Computing</div>

                <div className="marginTop25px fontFamilyRaleway colorCharcoal">
                  The purpose of Underrepresented Minorities in Computing is to promote
                  diversity within the computing fields and foster an environment that
                  empowers underrepresented minorities with technological aspirations
                  through career development, community building and academic support.
                </div>

                <div className="fontFamilyNovecento fontSize14px displayFlex marginTop35px">
                  <div className="homeButton listservButton fitWidth
                    marginRight15px pointer textAlignCenter">Join the Listserv</div>

                  <Link to='/about' className="noDecoration colorCharcoal">
                    <div className="homeButton aboutButton fitWidth
                      pointer textAlignCenter">Learn More</div>
                  </Link>
                </div>
              </div>
            </div>

            <img src={girl} alt="URMC Girl" className={girlClasses}/>
        </DesktopAndTablet>
          

        <Mobile>
          <div className="width90P displayFlex flexColumn flexAlignCenter marginAuto">
            <div>
              <div className="fontSize20px fontFamilyRalewayB colorCharcoal">Underrepresented Minorities in Computing</div>

              <div className="marginTop25px fontFamilyRaleway colorCharcoal fontSize12px">
                The purpose of Underrepresented Minorities in Computing is to promote
                diversity within the computing fields and foster an environment that
                empowers underrepresented minorities with technological aspirations
                through career development, community building and academic support.
              </div>
            </div>

            <img src={girl} alt="URMC Girl" className={girlClasses}/>

            <div className="fontFamilyNovecento fontSize12px displayFlex marginTop35px">
                <div className="homeButton listservButton fitWidth
                  marginRight15px pointer textAlignCenter">Join the Listserv</div>

                <Link to='/about' className="noDecoration colorCharcoal">
                  <div className="homeButton aboutButton fitWidth
                    pointer textAlignCenter">Learn More</div>
                </Link>
            </div>
          </div>
        </Mobile>
      </div>

      
    )
  };
};

export default withScreenSize(Home);
