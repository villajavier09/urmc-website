import React from 'react';
import '../../main.css';
import './Leadership.css';

const headshot = require('../../assets/headshot.JPG');
const instagramIcon = require('../../assets/instagram.png');
const facebookIcon = require('../../assets/facebook.png');
const linkedInIcon = require('../../assets/linkedin.png');

class BoardMember extends React.Component {
  render() {
    var person = this.props.person;
    var instaURL = person.socials.get('I');
    var facebookURL = person.socials.get('F');
    var linkedInURL = person.socials.get('L');

    return (
      <div className="eboardMember displayFlex marginBottom25px">
        <div className="displayFlex flexColumn flexAlignCenter horizontalMargin15px">
          <img src={headshot} alt="Profile Picture" className="profilePic verticalMargin5px" />
          <div className="fontSize20px">{person.name}</div>
          <div className="fontSize14px verticalMargin5px">{person.major} '{person.year}</div>
          <div className="displayFlex flexAlignCenter verticalMargin5px">
            {
              instaURL ?
                <a href={instaURL}>
                  <img src={instagramIcon} className="socialMediaIcon horizontalMargin5px pointer" alt="Instagram Icon" />
                </a>
                :
                null
            }
            {
              facebookURL ?
                <a href={facebookURL}>
                  <img src={facebookIcon} className="socialMediaIcon horizontalMargin5px pointer" alt="Facebook Icon" />
                </a>
                :
                null
            }
            {
              linkedInURL ?
                <a href={linkedInURL}>
                  <img src={linkedInIcon} className="socialMediaIcon horizontalMargin5px pointer" alt="LinkedIn Icon" />
                </a>
                :
                null
            }
          </div>
        </div>

        <div className="width60P horizontalMargin15px">
          <div className="fontSize16px textUppercase marginBottom10px">{person.position}</div>
          <div className="fontFamilyRaleway fontSize13px marginBottom15px">{person.bio}</div>

          <div className="marginBottom5px">Ask Me About</div>
          <div className="displayFlex flexWrap width90P">
            {
              person.askMe.map((interest) =>
                <div className="verticalMargin5px askAboutLabel horizontalMargin5px" key={interest}>{interest}</div>
              )
            }
          </div>
        </div>
      </div>
    )
  };
};

export default BoardMember; 
