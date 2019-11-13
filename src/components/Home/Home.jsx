import React from 'react';
import { Link } from 'react-router-dom';

import { DesktopAndTablet, Mobile } from '../Util/Breakpoints';
import ListservModal from './ListservModal';

import '../../main.css';
import './Home.css';

import withScreenSize from '../HOC/ScreenSize';

const girl = require('../../assets/girl.png');

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listservModalOpen: false
    }

    this.openListservModal = this.openListservModal.bind(this);
    this.closeListservModal = this.closeListservModal.bind(this);
  }

  openListservModal() {
    console.log("OPEN")
    this.setState({ listservModalOpen: true });
  }

  closeListservModal(event = null) {
    if (event && this.outsideListservModal(event)) return;

    this.setState({ listservModalOpen: false });
  }

  outsideListservModal(event) {

    let listservModal = document.getElementById('listservModal');
    if (listservModal === null) return false;

    // Retrieve the left-most pixel of the sidebar.
    let leftPixel = listservModal.offsetLeft;
    let rightPixel = leftPixel + listservModal.offsetWidth;
    let topPixel = listservModal.offsetTop;
    let bottomPixel = topPixel + listservModal.offsetHeight;

    if (event.clientX < leftPixel || event.clientX > rightPixel) return true;
    if (event.clientY < topPixel || event.clientY > bottomPixel) return true;

    return false;
  }

  render() {

    let girlClasses = {
      D: 'girlHeight-lg',
      T: 'girlHeight-med',
      M: 'girlHeight-sm marginTop15px'
    }[this.props.breakpoint]

    let titleClasses = {
      D: 'fontSize30px fontFamilyRalewayB colorCharcoal',
      T: 'fontSize30px fontFamilyRalewayB colorCharcoal',
      M: 'fontSize20px fontFamilyRalewayB colorCharcoal'
    }[this.props.breakpoint]

    let purposeClasses = {
      D: '',
      T: '',
      M: 'fontSize12px'
    }[this.props.breakpoint]

    return (
      <div className="marginTop25px displayFlex flexAlignCenter">
        <DesktopAndTablet>
          <div className="width60P">
              <div className="width75P marginAuto">
                <div className="fontSize30px fontFamilyRalewayB colorCharcoal">Underrepresented Minorities in Computing</div>

                <div className="marginTop25px fontFamilyRaleway colorCharcoal">
                  The purpose of Underrepresented Minorities in Computing is to promote
                  diversity within the computing fields and foster an environment that
                  empowers underrepresented minorities with technological aspirations
                  through career development, community building and academic support.
                </div>

                <div className="fontFamilyNovecento fontSize14px displayFlex marginTop35px">
                  <div className="homeButton listservButton fitWidth
                    marginRight15px pointer textAlignCenter"
                    onClick={() => this.openListservModal()}>
                      Join the Listserv
                  </div>

                  <Link to='/about' className="noDecoration colorCharcoal">
                    <div className="homeButton aboutButton fitWidth
                      pointer textAlignCenter">Learn More</div>
                  </Link>
                </div>
              </div>
            </div>

            <img src={girl} alt="URMC Girl" className={girlClasses}/>
        </DesktopAndTablet>
          

        <Mobile>
          <div className="width90P displayFlex flexColumn flexAlignCenter marginAuto">
            <div>
              <div className="fontSize20px fontFamilyRalewayB colorCharcoal">Underrepresented Minorities in Computing</div>

              <div className="marginTop25px fontFamilyRaleway colorCharcoal fontSize12px">
                The purpose of Underrepresented Minorities in Computing is to promote
                diversity within the computing fields and foster an environment that
                empowers underrepresented minorities with technological aspirations
                through career development, community building and academic support.
              </div>
            </div>

            <img src={girl} alt="URMC Girl" className={girlClasses}/>

            <div className="fontFamilyNovecento fontSize12px displayFlex marginTop35px">
                <div className="homeButton listservButton fitWidth
                  marginRight15px pointer textAlignCenter"
                  onClick={() => this.openListservModal()}
                  >Join the Listserv</div>

                <Link to='/about' className="noDecoration colorCharcoal">
                  <div className="homeButton aboutButton fitWidth
                    pointer textAlignCenter">Learn More</div>
                </Link>
            </div>
          </div>
        </Mobile>

        {
          this.state.listservModalOpen ?
            <div>
              <div className="overlayBlur"></div>
              <ListservModal closeListservModal={this.closeListservModal} />
            </div>
          :
          null
        }

        
      </div>
      
    )
  };
};

export default withScreenSize(Home);
