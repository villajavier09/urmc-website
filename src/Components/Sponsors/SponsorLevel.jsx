import React from 'react';
import '../../styles/main.css';
import './Sponsors.css';

import withScreenSize from '../HOC/ScreenSize';

const BackgroundRow = (props) => {
  const BACKGROUND_WORDS = 50;

  let words = [];
  let i = 0;

  while (i < BACKGROUND_WORDS) {
    words.push(
      <div className="fontFamilyRalewayB textUppercase rotateText
      horizontalMargin10px transparentText" key={i}>{props.level}</div>
    )

    i++;
  }

  return (
    <div className="width75P maxWidth75P marginAuto overflowHidden">
      <div className="displayFlex verticalMargin15px">{words}</div>
    </div>
  )
}

class SponsorLevel extends React.Component {
  constructor(props) {
    super(props);

    this.imageDiv = React.createRef();
    this.bgRef = React.createRef();

    this.updateBackgroundRows = this.updateBackgroundRows.bind(this);
    
    this.state = {
      logoDivHeight: 0,
      backgroundRows: [],
      bgReady: false, // Wait for the initial loading of images.
      marginTop: 0
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateBackgroundRows);
    
    const LOAD_TIMEOUT = 200;

    setTimeout(() => {
      this.setState({ bgReady: true });
      this.updateBackgroundRows();
    }, LOAD_TIMEOUT);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateBackgroundRows, false);
  }

  updateBackgroundRows() {
    if (this.imageDiv.current == null) return;

    this.setState({ logoDivHeight: this.imageDiv.current.offsetHeight }, () => {
      const BACKGROUND_ROW_HEIGHT = 50;

      let counterHeight = 0;
      let backgroundRows = [];
      
      while (counterHeight < this.state.logoDivHeight) {
        backgroundRows.push(
          <BackgroundRow level={this.props.level} key={counterHeight} />
        )

        counterHeight += BACKGROUND_ROW_HEIGHT;
      }

      let bgHeight = backgroundRows.length * BACKGROUND_ROW_HEIGHT;
      let marginDifference = (bgHeight - this.imageDiv.current.offsetHeight) / 2;

      this.setState({ backgroundRows: backgroundRows, marginTop: marginDifference });
    });
  }

  render() {
    let logoArr = [];

    let logoHeightClass = {
      'Gold': 'logoGoldHeight',
      'Silver': 'logoSilverHeight',
      'Bronze': 'logoBronzeHeight'
    }[this.props.level];

    for (let i = 0; i < this.props.logos.length; i++) {
      logoArr.push(
        <img src={this.props.logos[i]} alt="Logo" className={`${logoHeightClass} margin15px`} key={i} />
      )
    }

    let backgroundRows = this.state.backgroundRows;
    let hiddenClass = !this.state.bgReady ? 'hidden' : null; // Show level only once initial background ready.
    
    return (
      <div className={`width75P maxWidth75P marginAuto displayFlex flexColumn
        flexAlignCenter overflowHidden ${hiddenClass}`}>
        <div className="levelSeparator"></div>
        <div ref={this.bgRef} className="displayFlex flexColumn flexAlignCenter">{backgroundRows}</div>
        <div ref={this.imageDiv} style={{marginTop: this.state.marginTop}} className="flexCenter flexAlignCenter flexWrap
          positionAbsolute maxWidth75P verticalPadding15px">{logoArr}</div>
      </div>
    )
  }
}

export default withScreenSize(SponsorLevel);