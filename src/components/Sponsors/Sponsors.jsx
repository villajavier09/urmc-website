import React from 'react';
import MediaQuery from 'react-responsive';
import '../../main.css';
import './Sponsors.css';

import SponsorBackground from './SponsorBackground';

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
  constructor(props) {
    super(props);

    this.goldImageRef = React.createRef();
    this.goldDiv = React.createRef();

    this.state = {
      addGold: false,
      numGoldRows: 0,
      addSilver: false,
      numSilverRows: 0
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setAddBooleans();
    }, 0)
  }

  // componentDidUpdate() {
  //   setTimeout(() => {
  //     this.setAddBooleans();
  //   }, 100)
  // }

  setAddBooleans() {
    if (this.goldImageRef.current.offsetHeight > this.goldDiv.current.offsetHeight) {
      this.setState({
        addGold: true
      });
    } else this.setState({ addGold: false });
  }

  render() {

    // console.log(this.state.addGold);
    // if (this.state.addGold) {
    //   this.setState({
    //     numGoldRows: this.state.numGoldRows + 1
    //   })
    // }

    // console.log(this.state.numGoldRows)

    // let goldBackgroundRows = [];
    // let i = 0;

    // while (i < this.state.numGoldRows) {
    //   goldBackgroundRows.push(<SponsorBackground level="Gold" />)
    //   i++;
    // }

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

        <div ref={this.goldDiv} className="width75P maxWidth75P marginAuto displayFlex flexColumn flexAlignCenter
        overflowHidden">
          <div className="levelSeparator"></div>
          <SponsorBackground level="Gold" />
          <SponsorBackground level="Gold" />
          <SponsorBackground level="Gold" />
          <img ref={this.goldImageRef} src={google} alt="Google Logo" className="verticalMargin25px positionAbsolute" />
        </div>

        <div className="width75P maxWidth75P marginAuto displayFlex flexColumn flexAlignCenter
        overflowHidden positionRelative">
          <div className="levelSeparator"></div>
          <SponsorBackground level="Silver" />
          <SponsorBackground level="Silver" />
          <SponsorBackground level="Silver" />
          <SponsorBackground level="Silver" />
          <SponsorBackground level="Silver" />
          <SponsorBackground level="Silver" />
          <MediaQuery maxWidth={1352}>
            <SponsorBackground level="Silver" />
            <SponsorBackground level="Silver" />
          </MediaQuery>
          <div className="flexCenter flexAlignCenter flexWrap verticalMargin25px positionAbsolute">
            <img src={bloomberg} alt="Bloomberg Logo" className="horizontalMargin25px verticalMargin15px" />
            <img src={capitalOne} alt="Capital One Logo" className="horizontalMargin25px verticalMargin15px" />
            <img src={duolingo} alt="Duolingo Logo" className="horizontalMargin25px verticalMargin15px" />
            <img src={facebook} alt="Facebook Logo" className="horizontalMargin25px verticalMargin15px" />
            <img src={goldman} alt="Goldman Logo" className="horizontalMargin25px verticalMargin15px" />
            <img src={lyft} alt="Lyft Logo" className="horizontalMargin25px verticalMargin15px" />
            <img src={palantir} alt="Palantir Logo" className="horizontalMargin25px verticalMargin15px" />
          </div>
        </div>

        <div className="width75P maxWidth75P marginAuto displayFlex flexColumn flexAlignCenter
        overflowHidden positionRelative">
          <div className="levelSeparator"></div>
          <SponsorBackground level="Bronze" />
          <SponsorBackground level="Bronze" />
          <img src={microsoft} alt="Microsoft Logo" className="verticalMargin25px positionAbsolute" />
        </div>
      </div>
    )
  };
};

export default Sponsors; 
