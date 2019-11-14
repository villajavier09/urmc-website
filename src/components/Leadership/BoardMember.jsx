import React from 'react';
import '../../main.css';
import './Leadership.css';

import withScreenSize from '../HOC/ScreenSize';

const headshot = require('../../assets/headshot.JPG');
const instagramIcon = require('../../assets/instagram.png');
const facebookIcon = require('../../assets/facebook.png');
const linkedInIcon = require('../../assets/linkedin.png');

const SocialMediaIcon = (props) => {
  return (
    <div>
      {
        props.URL ?
          <a href={props.URL} target="_blank" rel="noopener noreferrer">
            <img src={props.icon} className="socialMediaIcon horizontalMargin5px pointer" alt="Social Media Icon" />
          </a>
          :
          null
      }
    </div>
  )
}

class BoardMember extends React.Component {
  render() {
    var person = this.props.person;
    var instaURL = person.socials['I'];
    var facebookURL = person.socials['F'];
    var linkedInURL = person.socials['L'];

    let marginBottom = this.props.marginBottom;

    let nameClasses = this.props.breakpoint === 'M' ? 'fontSize16px' : 'fontSize20px';
    let majorClasses = this.props.breakpoint === 'M' ? 'fontSize12px' : 'fontSize14px';

    return (
      <div id={this.props.person.id} className={`displayFlex minWidth400px padding15px borderRadius10px
        `}
        style={{ marginBottom: marginBottom !== undefined ? marginBottom : '25px' }}>

        <div className="displayFlex flexColumn flexAlignCenter horizontalMargin15px width25P">
          <img src={headshot} alt="Profile Picture" className="profilePic verticalMargin5px" />
          <div className={`fontSize20px textAlignCenter ${nameClasses}`}>{person.name}</div>
          <div className={`fontSize14px verticalMargin5px textAlignCenter ${majorClasses}`}>{person.major} '{person.year}</div>
          <div className="displayFlex flexAlignCenter verticalMargin5px">
            <SocialMediaIcon URL={instaURL} icon={instagramIcon} />
            <SocialMediaIcon URL={facebookURL} icon={facebookIcon} />
            <SocialMediaIcon URL={linkedInURL} icon={linkedInIcon} />
          </div>
        </div>

        <div className="horizontalMargin15px width75P">
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

export default withScreenSize(BoardMember); 
