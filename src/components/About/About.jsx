// React Library
import React from 'react';

// CSS Files
import '../../main.css';
import './About.css'

// Components
import PageTitle from '../Util/PageTitle';
import withScreenSize from '../HOC/ScreenSize';
import { exec } from 'child_process';

// Images
const academicIcon = require('../../assets/academic.png');
const communityIcon = require('../../assets/community.png');
const professionalIcon = require('../../assets/professional.png');
const aboutPictureOne = require('../../assets/about/about-1.jpg');
const aboutPictureTwo = require('../../assets/about/about-2.jpg');
const aboutPictureThree = require('../../assets/about/about-3.jpg');
const aboutPictureFour = require('../../assets/about/about-4.jpg');
const aboutPictureFive = require('../../assets/about/about-5.jpg');
const aboutPictureSix = require('../../assets/about/about-6.jpg');

const QuickFactBar = (props) => {
  return (
    <div className="flexSpaceBetween fontFamilyRalewayB width50P bgCharcoal
      colorWhite verticalPadding20px borderRadius10px marginTop50px marginBottom100px">
        <div className="width33P textAlignCenter">
          <div>Founded</div>
          <div className="fontSize30px">2016</div>
        </div>

        <div className="width33P textAlignCenter">
          <div>Active Members</div>
          <div className="fontSize30px">150+</div>
        </div>

        <div className="width33P textAlignCenter">
          <div>Company Sponsors</div>
          <div className="fontSize30px">15</div>
        </div>
      </div>
  )
}

const PurposeStatement = () => {
  return (
    <div className="fontFamilyRaleway">
      The purpose of Underrepresented Minorities in Computing is to promote
      diversity within the computing fields and foster an environment that
      empowers underrepresented minorities with technological aspirations
      through <span className="">career development, community building and academic support.</span>
    </div>
  )
}

const CommunityQuote = () => {
 return (
  <div className="marginTop25px">
    <i className="fontFamilyRalewayB fontSize15px">
        "Every successful individual knows that their achievements depend on a
      <span className="fontFamilyRalewayB fontSize18px"> community</span> of people working together."
    </i>  
  </div>
 )
}

class AboutPicture extends React.Component {

  constructor(props) {
    super(props);

    this.showPictureOverlay = this.showPictureOverlay.bind(this);
    this.hidePictureOverlay = this.hidePictureOverlay.bind(this);

    this.imageRef = React.createRef();
    this.descriptionRef = React.createRef();

    this.state = {
      imageHeight: 0
    }
  }

  showPictureOverlay() {
    this.imageRef.current.classList.add('aboutPictureHover');
    this.descriptionRef.current.classList.remove('hidden');

    this.setState({ imageHeight: this.imageRef.current.height });
  }

  hidePictureOverlay() {
    this.imageRef.current.classList.remove('aboutPictureHover');
    this.descriptionRef.current.classList.add('hidden');
  }

  render() {
    return (
    <div className="aboutPictureDiv" onMouseEnter={this.showPictureOverlay} onMouseLeave={this.hidePictureOverlay}>
      <img ref={this.imageRef} src={this.props.picture}
      className="aboutPicture" alt={this.props.alt}/>
      <div ref={this.descriptionRef} style={{bottom: (this.state.imageHeight / 2) + 'px'}}
      className="fullWidthAndHeight colorCharcoal zIndex1000 fontFamilyRalewayB
      textAlignCenter positionRelative hidden fontSize20px">
        Hello
      </div>
    </div>
    )
  }
}

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="flexColumnAlignCenter">
      <PageTitle title="About Us" />

      <div className="marginAuto width60P textAlignCenter colorCharcoal fontSize14px">
        <PurposeStatement />
        <CommunityQuote />
      </div>

      <div className="width90P flexCenter marginTop50px flexWrap textAlignCenter">
        <div className="flexColumnAlignCenter horizontalMargin25px minWidth200px marginAuto verticalMargin25px">
          <img src={academicIcon} alt="Academic Icon" className="aboutIcon" />
          <div className="marginTop15px fontFamilyRalewayB">Academic Support</div>

          <div className="fontSize14px textAlignCenter marginTop10px">
            <div className="fontFamilyRaleway verticalMargin5px"><span>&#9675;</span> Class Channels (Slack)</div>
            <div className="fontFamilyRaleway verticalMargin5px"><span>&#9675;</span> Faculty Lunches</div>
            <div className="fontFamilyRaleway verticalMargin5px"><span>&#9675;</span> Weekly Office Hours</div>
            <div className="fontFamilyRaleway verticalMargin5px"><span>&#9675;</span> Prelim Review Sessions</div>
          </div>
        </div>

        <div className="flexColumnAlignCenter horizontalMargin25px minWidth200px marginAuto verticalMargin25px">
          <img src={communityIcon} alt="Community Icon" className="aboutIcon" />
          <div className="marginTop15px fontFamilyRalewayB">Community Development</div>

          <div className="fontSize14px textAlignCenter marginTop10px">
            <div className="fontFamilyRaleway verticalMargin5px"><span>&#9675;</span> M&M Mentorship Program</div>
            <div className="fontFamilyRaleway verticalMargin5px"><span>&#9675;</span> Monthly General Body Meetings</div>
            <div className="fontFamilyRaleway verticalMargin5px"><span>&#9675;</span> Social Outings</div>
            <div className="fontFamilyRaleway verticalMargin5px"><span>&#9675;</span> Under the Hood Series</div>
          </div>
        </div>

        <div className="flexColumnAlignCenter horizontalMargin25px minWidth200px marginAuto verticalMargin25px">
          <img src={professionalIcon} alt="Professional Icon" className="aboutIcon" />
          <div className="marginTop15px fontFamilyRalewayB">Professional Excellence</div>

          <div className="fontSize14px textAlignCenter marginTop10px">
            <div className="fontFamilyRaleway verticalMargin5px"><span>&#9675;</span> Cracking the Coding Interview</div>
            <div className="fontFamilyRaleway verticalMargin5px"><span>&#9675;</span> Company Recruitment</div>
            <div className="fontFamilyRaleway verticalMargin5px"><span>&#9675;</span> Resume Reviews and Mock Interviews</div>
            <div className="fontFamilyRaleway verticalMargin5px"><span>&#9675;</span> Technical Skills Workshops</div>
          </div>
        </div>
      </div>

      <QuickFactBar />

      <div className="flexCenter flexAlignCenter width90P flexWrap marginBottom25px">
        <AboutPicture picture={aboutPictureOne} alt="About #1" />
        {/* <img src={aboutPictureOne} className="aboutPicture" alt="About #1"/> */}
        <img src={aboutPictureTwo} className="aboutPicture" alt="About #1"/>
        <img src={aboutPictureThree} className="aboutPicture" alt="About #1"/>
        <img src={aboutPictureFour} className="aboutPicture" alt="About #1"/>
        <img src={aboutPictureFive} className="aboutPicture" alt="About #1"/>
        <img src={aboutPictureSix} className="aboutPicture" alt="About #1"/>
      </div>

    </div>
    )
  }
}

export default withScreenSize(About);
