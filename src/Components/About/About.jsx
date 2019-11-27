/**
 * @fileoverview The about page that highlights 
 */

// React Library
import React from 'react';

// CSS Files
import '../../main.css';
import './About.css'

// Components
import PageTitle from '../Util/PageTitle';
import withScreenSize from '../HOC/ScreenSize';

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
        <div className={`${quickFactClasses} textAlignCenter`}>
          <div>Founded</div>
          <div className="fontSize30px">2016</div>
        </div>

        <div className={`${quickFactClasses} textAlignCenter`}>
          <div>Active Members</div>
          <div className="fontSize30px">150+</div>
        </div>

        <div className={`${quickFactClasses} textAlignCenter`}>
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
      through career development, community building and academic support.
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
      descriptionOffsetTop: 0,
      descriptionOffsetLeft: 0,
      showDescription: false
    }
  }

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

  render() {

    let pictureWidth = this.props.breakpoint !== 'M' ? 'pictureWidth' : 'mobilePictureWidth';

    return (
    <div className={`aboutPictureDiv ${pictureWidth}`} onMouseEnter={this.showPictureOverlay} onMouseLeave={this.hidePictureOverlay}>
      <img ref={this.imageRef} src={this.props.picture}
      className={`aboutPicture ${pictureWidth}`} alt={this.props.alt}/>

      {
        this.state.showDescription ?
        <div ref={this.descriptionRef}
        style={{top: this.state.descriptionOffsetTop + 'px',
                left: this.state.descriptionOffsetLeft + 'px'}}
          className="colorCharcoal zIndex1000 fontFamilyRalewayB
          textAlignCenter aboutPictureDescription fontSize20px">
            <div className="fontSize18px">{this.props.eventName}</div>
            <div className="fontSize30px marginTop25px">{this.props.eventDate}</div>
        </div>
        :
        null
      }
    </div>
    )
  }
}

const About = (props) => {

  let aboutTextWidthClass = props.breakpoint === 'M' ? 'width80P' : 'width60P';

  return (
    <div className="flexColumnAlignCenter">
    <PageTitle title="About Us" />

    <div className={`${aboutTextWidthClass} marginAuto textAlignCenter colorCharcoal fontSize14px`}>
      <PurposeStatement />
      <CommunityQuote />
    </div>

    <div className="width90P flexCenter marginTop25px flexWrap textAlignCenter">
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

    <QuickFactBar breakpoint={props.breakpoint} />

    <div className="flexCenter flexAlignCenter width90P flexWrap marginBottom25px">
      <AboutPicture picture={aboutPictureOne} eventName="Welcome Back BBQ"
        eventDate="8.31.19" alt="About #1" {...props} />

      <AboutPicture picture={aboutPictureTwo} eventName="Career Fair Preparation"
        eventDate="9.5.19" alt="About #2" {...props} />

      <AboutPicture picture={aboutPictureThree} eventName="Under the Hood Series: Data Privacy and Security"
        eventDate="3.22.19" alt="About #3" {...props} />

      <AboutPicture picture={aboutPictureFour} eventName="Facebook Workshop: A Day in the Life of a Software Engineer"
        eventDate="4.17.19" alt="About #4" {...props} />

      <AboutPicture picture={aboutPictureFive} eventName="1st Fall General Body Meeting: Welcome Back"
        eventDate="9.3.19" alt="About #5" {...props} />

      <AboutPicture picture={aboutPictureSix} eventName="Final Spring General Body Meeting: Summer Preparation"
        eventDate="5.7.19" alt="About #6" {...props} />

    </div>

  </div>
  )
}

export default withScreenSize(About);
