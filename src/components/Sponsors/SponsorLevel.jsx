import React from 'react';
import '../../main.css';
import './Sponsors.css';

import withScreenSize from '../HOC/ScreenSize';

import SponsorBackground from './SponsorBackground';

class SponsorLevel extends React.Component {
  constructor(props) {
    super(props);

    this.imageDiv = React.createRef();

    this.updateBackgroundRows = this.updateBackgroundRows.bind(this);
    this.LOAD_TIMEOUT = 200;
    
    this.state = {
      logoDivHeight: 0,
      backgroundRows: []
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateBackgroundRows);
    
    setTimeout(() => {
      this.updateBackgroundRows();
    }, this.LOAD_TIMEOUT);
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
          <SponsorBackground level={this.props.level} key={counterHeight} />
        )

        counterHeight += BACKGROUND_ROW_HEIGHT;
      }

      this.setState({ backgroundRows: backgroundRows }); 
    });
  }

  render() {
    let backgroundRows = this.state.backgroundRows;
    let logoArr = [];
    let i = 0;

    for (let logo of this.props.logos) {
      logoArr.push(
        <img src={logo} alt="Logo" className="margin15px" key={i} />
      )

      i++;
    }

    console.log(this.props.breakpoint)

    return (
      <div className="width75P maxWidth75P marginAuto displayFlex flexColumn
        flexAlignCenter overflowHidden">
        <div className="levelSeparator"></div>
        <div className="displayFlex flexColumn flexAlignCenter">{backgroundRows}</div>
        <div ref={this.imageDiv} className="flexCenter flexAlignCenter flexWrap positionAbsolute
          maxWidth75P verticalPadding15px">{logoArr}</div>
      </div>
    )
  }
}

export default withScreenSize(SponsorLevel);