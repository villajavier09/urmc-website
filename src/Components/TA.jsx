import React from 'react';

import '../styles/main.css';
import '../styles/Misc.css';

import withScreenSize from './HOC/ScreenSize';

const emailIcon = require('../assets/email.png')

const { serverURL } = require('../util/config');

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

class TA extends React.Component {

  arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };

  render() {
    var person = this.props.person;

    const instaURL = person.instagram;
    const facebookURL = person.facebook;
    const linkedInURL = person.linkedIn;

    let marginBottom = this.props.marginBottom;

    let nameClasses = this.props.breakpoint === 'M' ? 'fontSize16px' : 'fontSize20px';
    let majorClasses = this.props.breakpoint === 'M' ? 'fontSize12px' : 'fontSize14px';
    let emailClasses = this.props.breakpoint === 'M' ? 'fontSize10px' : 'fontSize12px';
    let profilePicSize = this.props.breakpoint === 'M' ? 'smallProfilePic' : 'profilePic';

    let ID = person.name.toLowerCase().replace(' ', '');

    return (
      <div id={ID} className='displayFlex minWidth350px padding15px borderRadius10px' style={{ marginBottom: marginBottom !== undefined ? marginBottom : '25px' }}>

        <div className="displayFlex flexColumn flexAlignCenter horizontalMargin15px width25P">
          <img src={`https://urmc-board.s3.us-east-2.amazonaws.com/${person._id}`} alt="Profile Picture" className={`${profilePicSize} verticalMargin5px`} />
          <div className={`fontSize20px textAlignCenter ${nameClasses}`}>{person.name}</div>
          <div className={`fontSize14px verticalMargin5px textAlignCenter ${majorClasses}`}>{person.major} '{person.year}</div>
          <div className={`fontSize20px textAlignCenter ${emailClasses}`}>{person.email}</div>
        </div>

        <div className="horizontalMargin15px width75P">
          <div className="fontSize16px textUppercase marginBottom10px">{person.taClass}</div>
          <div className="fontFamilyRaleway fontSize13px marginBottom15px preserveLineSpacing">{person.bio}</div>

          <div className="marginBottom5px">Prior Classes TA'd For</div>
          <div className="displayFlex flexWrap width90P">
            {
              person.classes.map((interest) =>
                <div className="verticalMargin5px askAboutLabel horizontalMargin5px" key={interest}>{interest}</div>
              )
            }
          </div>
        </div>
      </div>
    )
  };
};

export default withScreenSize(TA);
