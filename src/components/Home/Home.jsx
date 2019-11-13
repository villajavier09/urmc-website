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

const Home = (props) => {
  let girlClasses = {
    D: 'girlHeight-lg',
    T: 'girlHeight-med',
    M: 'girlHeight-sm marginTop15px'
  }[props.breakpoint]

  let purposeClasses = {
    D: '',
    T: '',
    M: 'fontSize12px'
  }[props.breakpoint]

  let titleSize = props.breakpoint === 'M' ? 'fontSize20px' : 'fontSize30px';

  return (
    <div className="marginTop25px displayFlex flexAlignCenter">
        <div className="width60P">
            <div className="width75P marginAuto">
              <div className={`${titleSize} fontFamilyRalewayB colorCharcoal`}>Underrepresented Minorities in Computing</div>

              <div className="marginTop25px fontFamilyRaleway colorCharcoal">
                The purpose of Underrepresented Minorities in Computing is to promote
                diversity within the computing fields and foster an environment that
                empowers underrepresented minorities with technological aspirations
                through career development, community building and academic support.
              </div>

              <div className="fontFamilyNovecento fontSize14px displayFlex marginTop35px">
                <div className="homeButton listservButton fitWidth
                  marginRight15px pointer textAlignCenter">
                    Join the Listserv
                </div>

                <Link to='/about' className="noDecoration colorCharcoal">
                  <div className="homeButton aboutButton fitWidth
                    pointer textAlignCenter">Learn More</div>
                </Link>
              </div>
            </div>
          </div>

          <img src={girl} alt="URMC Girl" className={girlClasses}/>
        

      {/* <Mobile>
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
                marginRight15px pointer textAlignCenter"
                onClick={() => this.openListservModal()}
                >Join the Listserv</div>

              <Link to='/about' className="noDecoration colorCharcoal">
                <div className="homeButton aboutButton fitWidth
                  pointer textAlignCenter">Learn More</div>
              </Link>
          </div>
        </div>
      </Mobile> */}
    </div>
  )
}

export default withScreenSize(Home);
