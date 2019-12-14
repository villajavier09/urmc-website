import React from 'react';

import '../styles/Main.css';
import '../styles/Leadership.css';

import withScreenSize from './HOC/ScreenSize';

const instagramIcon = require('../assets/instagram.png');
const facebookIcon = require('../assets/facebook.png');
const linkedInIcon = require('../assets/linkedin.png');

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

    const instaURL = person.socials['I'];
    const facebookURL = person.socials['F'];
    const linkedInURL = person.socials['L'];

    let name = person.name;
    let firstName = name.substr(0, name.indexOf(' ')).toLowerCase();
    const headshot = require(`../assets/headshots/${firstName}.jpg`);

    let marginBottom = this.props.marginBottom;

    let nameClasses = this.props.breakpoint === 'M' ? 'fontSize16px' : 'fontSize20px';
    let majorClasses = this.props.breakpoint === 'M' ? 'fontSize12px' : 'fontSize14px';
    let profilePicSize = this.props.breakpoint === 'M' ? 'smallProfilePic' : 'profilePic';

    let ID = person.name.toLowerCase().replace(' ', '');

    return (
      <div id={ID} className='displayFlex minWidth350px padding15px borderRadius10px' style={{ marginBottom: marginBottom !== undefined ? marginBottom : '25px' }}>

        <div className="displayFlex flexColumn flexAlignCenter horizontalMargin15px width25P">
          <img src={headshot} alt="Profile Picture" className={`${profilePicSize} verticalMargin5px`} />
          <div className={`fontSize20px textAlignCenter ${nameClasses}`}>{person.name}</div>
          <div className={`fontSize14px verticalMargin5px textAlignCenter ${majorClasses}`}>{person.major} '{person.year}</div>
          <div className="displayFlex flexAlignCenter verticalMargin5px">
            {instaURL ? <SocialMediaIcon URL={instaURL} icon={instagramIcon} /> : null}
            {facebookURL ? <SocialMediaIcon URL={facebookURL} icon={facebookIcon} /> : null}
            {linkedInURL ? <SocialMediaIcon URL={linkedInURL} icon={linkedInIcon} /> : null}
          </div>
        </div>

        <div className="horizontalMargin15px width75P">
          <div className="fontSize16px textUppercase marginBottom10px">{person.position}</div>
          <div className="fontFamilyRaleway fontSize13px marginBottom15px preserveLineSpacing">{person.bio}</div>

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
