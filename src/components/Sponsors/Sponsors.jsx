import React from 'react';
import '../../main.css';
import './Sponsors.css';

const google = require('../../assets/corporate/google.png');
const bloomberg = require('../../assets/corporate/bloomberg.png');
const capitalOne = require('../../assets/corporate/capital-one.png');
const duolingo = require('../../assets/corporate/duolingo.png');
const facebook = require('../../assets/corporate/facebook.png');
const goldman = require('../../assets/corporate/goldman.png');
const lyft = require('../../assets/corporate/lyft.png');
const palantir = require('../../assets/corporate/palantir.png');
const microsoft = require('../../assets/corporate/microsoft.png');

class Sponsors extends React.Component {
  render() {
    return (
      <div>
        <div className="textAlignCenter fontFamilyRalewayB marginBottom25px">
          <div className="marginTop25px fontSize20px">
            2019-2020 Corporate Sponsors
          </div>

          <div className="marginTop10px fontSize14px">
            Thank you all for your continued support for our organization!
          </div>
        </div>

        <div className="width75P marginAuto displayFlex flexColumn flexAlignCenter">
          <div className="levelSeparator"></div>
          <img src={google} alt="Google Logo" className="verticalMargin25px" />
        </div>

        <div className="width75P marginAuto displayFlex flexColumn flexAlignCenter">
          <div className="levelSeparator"></div>
          <div className="flexCenter flexAlignCenter flexWrap verticalMargin25px">
            <img src={bloomberg} alt="Bloomberg Logo" className="horizontalMargin25px verticalMargin15px" />
            <img src={capitalOne} alt="Capital One Logo" className="horizontalMargin25px verticalMargin15px" />
            <img src={duolingo} alt="Duolingo Logo" className="horizontalMargin25px verticalMargin15px" />
            <img src={facebook} alt="Facebook Logo" className="horizontalMargin25px verticalMargin15px" />
            <img src={goldman} alt="Goldman Logo" className="horizontalMargin25px verticalMargin15px" />
            <img src={lyft} alt="Lyft Logo" className="horizontalMargin25px verticalMargin15px" />
            <img src={palantir} alt="Palantir Logo" className="horizontalMargin25px verticalMargin15px" />
          </div>
        </div>

        <div className="width75P marginAuto displayFlex flexColumn flexAlignCenter">
          <div className="levelSeparator"></div>
          <img src={microsoft} alt="Microsoft Logo" className="verticalMargin25px" />
        </div>
      </div>
    )
  };
};

export default Sponsors; 
