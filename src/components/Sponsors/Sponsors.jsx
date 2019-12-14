import React from 'react';
import { Link } from 'react-router-dom';

import '../../styles/main.css';
import './Sponsors.css';

import PageTitle from '../Util/PageTitle';
import SponsorLevel from './SponsorLevel';
import withScreenSize from '../HOC/ScreenSize';

// Corporate Logos
const google = require('../../assets/corporate/google.png');
const bloomberg = require('../../assets/corporate/bloomberg.png');
const blackrock = require('../../assets/corporate/blackrock.png');
const capitalOne = require('../../assets/corporate/capital-one.png');
const duolingo = require('../../assets/corporate/duolingo.png');
const facebook = require('../../assets/corporate/facebook.png');
const goldman = require('../../assets/corporate/goldman.png');
const lyft = require('../../assets/corporate/lyft.png');
const palantir = require('../../assets/corporate/palantir.png');
const serviceNow = require('../../assets/corporate/service-now.png');
const apt = require('../../assets/corporate/apt.png');
const hubspot = require('../../assets/corporate/hubspot.png');
const microsoft = require('../../assets/corporate/microsoft.png');
const twoSigma = require('../../assets/corporate/two-sigma.png');
const workday = require('../../assets/corporate/workday.png');

const Sponsors = (props) => {

  return (
    <div className="marginBottom50px">
      <div className="textAlignCenter fontFamilyRalewayB marginBottom25px">
        <PageTitle title="2019-2020 Corporate Sponsors" />

        <div className='width90P marginAuto'>
          <div className="fontSize14px fontFamilyRaleway marginTop-15px textAlignCenter">
            Thank you all for your continued support for our organization!
          </div>

          <div className="fontSize14px fontFamilyRaleway textAlignCenter marginTop3px">
            If you would like to sponsor or donate to URMC, please visit the <span>
              <Link to='/join' onClick={() => props.updateCurrentPage('Getting Involved')}
                className="linkColor fontFamilyRalewayB noDecoration">
                Getting Involved
            </Link>
            </span> page.
          </div>
        </div>
      </div>

      <SponsorLevel level="Gold" logos={[google]} />
      <SponsorLevel level="Silver" logos={[bloomberg, blackrock, capitalOne, duolingo,
        facebook, goldman, lyft, palantir, serviceNow]} />
      <SponsorLevel level="Bronze" logos={[apt, hubspot, microsoft, twoSigma, workday]} />
    </div>
  )
}

export default withScreenSize(Sponsors); 
