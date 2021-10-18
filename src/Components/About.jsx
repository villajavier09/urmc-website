/**
 * @fileoverview The About Component which shows our purpose, the three pillars
 * of URMC, some quick facts about founding and current status, as well as few
 * high-quality pictures from events that happened this year.
 */

import React from 'react';

import '../styles/main.css';
import '../styles/Misc.css';

import PageTitle from './Common/PageTitle';
import withScreenSize from './HOC/ScreenSize';

const academicIcon = require('../assets/academic.png');
const communityIcon = require('../assets/community.png');
const professionalIcon = require('../assets/professional.png');
const aboutPictureOne = require('../assets/about/about-1.jpg');
const aboutPictureTwo = require('../assets/about/about-2.jpg');
const aboutPictureThree = require('../assets/about/about-3.jpg');
const aboutPictureFour = require('../assets/about/about-4.jpg');
const aboutPictureFive = require('../assets/about/about-5.jpg');
const aboutPictureSix = require('../assets/about/about-6.jpg');

/******************************************************************************/

const PurposeStatement = () => {
  return (
    <div className="fontFamilyRaleway">
      The purpose of Underrepresented Minorities in Computing is to promote
      diversity within the computing fields and foster an environment that
      empowers underrepresented minorities with technological aspirations
      through career development, community building and academic support.
    </div>
  )
}

/******************************************************************************/

const CommunityQuote = () => {
  return (
    <div className="marginTop25px">
      <i className="fontFamilyRalewayB fontSize15px">
        "Every successful individual knows that their achievements depend on a
        <span className="fontSize18px"> community</span> of people working together."
      </i>
    </div>
  )
}

/******************************************************************************/

const Pillar = (props) => {
  let programMap = {
    'Academic Support': [
      "Class Channels (Slack)",
      "Faculty Lunches",
      "Weekly Office Hours",
      "Prelim Review Sessions"
    ],
    'Community Development': [
      "M&M Mentorship Program",
      "Monthly General Body Meetings",
      "Social Outings",
      "Under the Hood Series"
    ],
    'Professional Excellence': [
      "Cracking the Coding Interview",
      "Company Recruitment",
      "Resume Reviews and Mock Interviews",
      "Technical Skills Workshops"
    ]
  };

  let programs = [];

  for (const program of programMap[props.title]) {
    programs.push(
      <div className="fontFamilyRaleway verticalMargin5px"><span>&#9675;</span> {program}</div>
    )
  }

  return (
    <div className="flexColumnAlignCenter horizontalMargin25px minWidth200px
    marginAuto verticalMargin25px">
      <img src={props.icon} alt="Academic Icon" className="height125px" />
      <div className="marginTop15px fontFamilyRalewayB">{props.title}</div>
      <div className="fontSize14px textAlignCenter marginTop10px">{programs}</div>
    </div>
  )
}

/******************************************************************************/

const QuickFact = (props) => {
  return (
    <div className={`${props.classes} textAlignCenter`}>
      <div>{props.title}</div>
      <div className="fontSize30px">{props.number}</div>
    </div>
  )
}

/******************************************************************************/

/**
 * Includes the founding year, the number of active members, as well as the
 * number of company sponsorships.
 */
const QuickFactBar = (props) => {

  let outerDivClasses = {
    'D': 'width50P flexCenter',
    'T': 'maxWidth90P flexCenter',
    'M': 'flexColumnAlignCenter horizontalPadding25px'
  }[props.breakpoint]

  let quickFactClasses = {
    'D': 'width33P',
    'T': 'horizontalMargin50px',
    'M': 'verticalMargin25px'
  }[props.breakpoint]

  return (
    <div className={`${outerDivClasses} fontFamilyRalewayB bgCharcoal
      colorWhite verticalPadding20px borderRadius10px marginTop50px marginBottom100px`}>
      <QuickFact classes={quickFactClasses} title="Founded" number="2016" />
      <QuickFact classes={quickFactClasses} title="Active Members" number="150+" />
      <QuickFact classes={quickFactClasses} title="Company Sponsors" number="15" />
    </div>
  )
}

/******************************************************************************/

class AboutPicture extends React.Component {

  constructor(props) {
    super(props);

    this.descriptionRef = React.createRef();
    this.imageRef = React.createRef();

    this.hidePictureOverlay = this.hidePictureOverlay.bind(this);
    this.showPictureOverlay = this.showPictureOverlay.bind(this);

    this.state = {
      descriptionOffsetTop: 0,
      descriptionOffsetLeft: 0,
      showDescription: false
    }
  }

  /**
   * Removes the description overlay from the image.
  */
  hidePictureOverlay() {
    let aboutDescription = this.descriptionRef.current;
    if (aboutDescription === null) return;

    aboutDescription.classList.remove('aboutPictureDescriptionHover');
    aboutDescription.classList.add('aboutPictureDescription');
    this.imageRef.current.classList.remove('aboutPictureHover');

    this.setState({
      showDescription: false,
      descriptionOffsetTop: 0,
      descriptionOffsetLeft: 0
    });
  }

  /**
   * Sets the absolute left and right positions of the description overlay.
  */
  showPictureOverlay() {
    this.setState({ showDescription: true }, () => {
      let aboutImage = this.imageRef.current;
      let aboutDescription = this.descriptionRef.current;

      let imageMidPixelX = aboutImage.offsetLeft + (aboutImage.offsetWidth / 2);
      let imageMidPixelY = aboutImage.offsetTop + (aboutImage.offsetHeight / 2);

      let descriptionOffsetLeft = imageMidPixelX - (aboutDescription.offsetWidth / 2);
      let descriptionOffsetTop = imageMidPixelY - (aboutDescription.offsetHeight / 2);

      aboutImage.classList.add('aboutPictureHover');

      this.setState({
        descriptionOffsetTop: descriptionOffsetTop,
        descriptionOffsetLeft: descriptionOffsetLeft
      }, () => {
        aboutDescription.classList.add('aboutPictureDescriptionHover');
        aboutDescription.classList.remove('aboutPictureDescription');
      });
    });
  }

  render() {

    let props = this.props;
    let pictureWidth = this.props.breakpoint !== 'M' ? 'width400px' : 'width350px';

    return (
      <div className={`margin10px borderRadius15px ${pictureWidth}`}
        onMouseEnter={this.showPictureOverlay} onMouseLeave={this.hidePictureOverlay}>
        <img ref={this.imageRef} src={props.picture}
          className={`aboutPicture ${pictureWidth}`} alt={props.alt} />

        {
          this.state.showDescription ?
            <div ref={this.descriptionRef}
              style={{
                top: this.state.descriptionOffsetTop + 'px',
                left: this.state.descriptionOffsetLeft + 'px'
              }}
              className="colorCharcoal zIndex1000 fontFamilyRalewayB
            textAlignCenter aboutPictureDescription fontSize20px">
              <div className="fontSize18px">{props.eventName}</div>
              <div className="fontSize30px marginTop25px">{props.eventDate}</div>
            </div> : null
        }
      </div>
    )
  }
}

/******************************************************************************/

const About = (props) => {

  let aboutTextWidthClass = props.breakpoint === 'M' ? 'width80P' : 'width60P';

  return (
    <div className="flexColumnAlignCenter">
      <PageTitle title="About Us" />

      <div className={`${aboutTextWidthClass} textAlignCenter colorCharcoal fontSize14px`}>
        <PurposeStatement />
        <CommunityQuote />
      </div>

      <div className="width90P flexCenter marginTop25px flexWrap textAlignCenter">
        <Pillar title="Academic Support" icon={academicIcon} />
        <Pillar title="Community Development" icon={communityIcon} />
        <Pillar title="Professional Excellence" icon={professionalIcon} />
      </div>

      <QuickFactBar breakpoint={props.breakpoint} />

      <div className="flexCenter flexAlignCenter width90P flexWrap marginBottom25px">
        <AboutPicture picture={aboutPictureOne} eventName="Welcome Back BBQ" eventDate="8.31.19" alt="About #1" {...props} />
        <AboutPicture picture={aboutPictureTwo} eventName="Career Fair Preparation" eventDate="9.5.19" alt="About #2" {...props} />
        <AboutPicture picture={aboutPictureThree} eventName="Under the Hood Series: Data Privacy and Security" eventDate="3.22.19" alt="About #3" {...props} />
        <AboutPicture picture={aboutPictureFour} eventName="Facebook Workshop: A Day in the Life of a Software Engineer" eventDate="4.17.19" alt="About #4" {...props} />
        <AboutPicture picture={aboutPictureFive} eventName="1st Fall General Body Meeting: Welcome Back" eventDate="9.3.19" alt="About #5" {...props} />
        <AboutPicture picture={aboutPictureSix} eventName="Final Spring General Body Meeting: Summer Preparation" eventDate="5.7.19" alt="About #6" {...props} />
      </div>

    </div>
  )
}

/******************************************************************************/

export default withScreenSize(About);
