import React from 'react';
import { Link } from 'react-router-dom';

import '../../main.css';
import './Home.css';

const girl = require('../../assets/girl.png');

class Home extends React.Component {
  render() {
    return (
      <div className="marginTop25px displayFlex flexAlignCenter">
        <div className="width60P">
          <div className="width75P marginAuto">
            <div className="fontFamilyRalewayB colorCharcoal fontSize30px">Underrepresented Minorities in Computing</div>

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

        <img src={girl} alt="URMC Girl" className="girlHeight-lg"/>

      </div>
    )
  };
};

export default Home; 
