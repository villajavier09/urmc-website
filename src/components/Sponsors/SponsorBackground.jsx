import React from 'react';
import '../../main.css';
import './Sponsors.css';

class SponsorBackground extends React.Component {
  render() {
    let words = [];
    let i = 0;
  
    while (i < 25) {
      words.push(
        <div className="fontFamilyRalewayB textUppercase rotateText
        horizontalMargin10px transparentText">
          {this.props.level}
        </div>
      )
  
      i++;
    }
  
  
    return (
      <div className="displayFlex flexColumn">
        <div className="displayFlex verticalMargin15px">{words}</div>
      </div>
    )
  }
}

export default SponsorBackground; 
