import React from 'react';
import '../../main.css';
import './Sponsors.css';

class SponsorBackground extends React.Component {
  render() {
    const BACKGROUND_WORDS = 50;

    let words = [];
    let i = 0;

    while (i < BACKGROUND_WORDS) {
      words.push(
        <div className="fontFamilyRalewayB textUppercase rotateText
        horizontalMargin10px transparentText" key={i}>
          {this.props.level}
        </div>
      )
  
      i++;
    }
  
    return (
      <div className="width75P maxWidth75P marginAuto overflowHidden">
        <div className="displayFlex verticalMargin15px">{words}</div>
      </div>
    )
  }
}

export default SponsorBackground; 
