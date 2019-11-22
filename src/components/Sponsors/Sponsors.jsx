import React from 'react';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';

import '../../main.css';
import './Sponsors.css';

import PageTitle from '../Util/PageTitle';
import SponsorLevel from './SponsorLevel';
import withScreenSize from '../HOC/ScreenSize';

// Corporate Logos
const google = require('../../assets/corporate/google.png');
const bloomberg = require('../../assets/corporate/bloomberg.png');
const capitalOne = require('../../assets/corporate/capital-one.png');
const duolingo = require('../../assets/corporate/duolingo.png');
const facebook = require('../../assets/corporate/facebook.png');
const goldman = require('../../assets/corporate/goldman.png');
const lyft = require('../../assets/corporate/lyft.png');
const palantir = require('../../assets/corporate/palantir.png');
const microsoft = require('../../assets/corporate/microsoft.png');

const Sponsors = (props) => {

  console.log(props);

  // let textClass = props.breakpoint === 'M' ? '' : null;

  return (
    <div>
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
      <SponsorLevel level="Silver" logos={[bloomberg, capitalOne, duolingo, facebook, goldman, lyft, palantir]} />
      <SponsorLevel level="Bronze" logos={[microsoft]} />
    </div>
  )
}

export default withScreenSize(Sponsors); 
