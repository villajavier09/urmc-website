import React from 'react';
import MediaQuery from 'react-responsive';
import '../../main.css';
import './Sponsors.css';

import PageTitle from '../Util/PageTitle';
import SponsorLevel from './SponsorLevel';

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

const Sponsors = () => {
  return (
    <div>
      <div className="textAlignCenter fontFamilyRalewayB marginBottom25px">
        <PageTitle title="2019-2020 Corporate Sponsors" />

        <div className="fontSize14px marginTop-15px">
          Thank you all for your continued support for our organization!
        </div>
      </div>

      <SponsorLevel level="Gold" logos={[google]} />
      <SponsorLevel level="Silver" logos={[bloomberg, capitalOne, duolingo, facebook, goldman, lyft, palantir]} />
      <SponsorLevel level="Bronze" logos={[microsoft]} />
    </div>
  )
}

export default Sponsors; 
