/**
 * @fileoverview The root of the application which controls the highest level
 * components such as the Header, the Sidebar as well as the routing for the
 * entire application.
 */

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './styles/App.css';
import './styles/Main.css';

import About from './Components/About';
import Admin from './Components/Admin/Admin';
import Events from './Components/Events';
import Header from './Components/Header';
import Home from './Components/Home';
import Join from './Components/Join';
import Leadership from './Components/Leadership';
import PageMargin from './Components/Common/PageMargin';
import Sidebar from './Components/Sidebar';
import Sponsors from './Components/Sponsors';
import withScreenSize from './Components/HOC/ScreenSize';

const pathnameMap = require('./util/pathnameMap');

/******************************************************************************/

class App extends React.Component {
  constructor(props) {
    super(props);

    this.closeSidebar = this.closeSidebar.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.openSidebar = this.openSidebar.bind(this);
    this.toggleOverlay = this.toggleOverlay.bind(this);
    this.updateCurrentPage = this.updateCurrentPage.bind(this);

    this.state = {
      currentPage: '',
      isNormalOverlay: true,
      isSidebarOpen: false
    }
  }

  componentWillMount() {
    this.setState({ currentPage: pathnameMap[window.location.pathname] });
  }

  /**
   * Handles all clicks in the application. If the sidebar is open, call the
   * closeSidebar function and/or if there is another overlay that is not the
   * lightgray over the application, in the case of the Admin's edit member
   * modal, then close the modal.
   * 
   * @param event - The JS event associated with a click.
   */
  handleClick(event) {
    if (this.state.isSidebarOpen) this.closeSidebar(event);
    else if (!this.state.isNormalOverlay && this.isOutsideEMModal(event)) {
      this.setState({ isNormalOverlay: true });
    }
  }

  /**
   * Closes the sidebar.
   * 
   * @param event - The JS event associated with a click.
   * @param isLinkOrX - (Optional) True if the click event's target is either
   * a link to another page or the X Icon in the sidebar.
   */
  closeSidebar(event, isLinkOrX = false) {
    if (!this.isOutsideSidebar(event, isLinkOrX)) return; // Don't close sidebar.

    this.setState({ isSidebarOpen: false, isNormalOverlay: true });
  }

  /**
   * Returns whether or not the click event's target is outside the sidebar's
   * dimensions or is a link or X Icon.
   * 
   * @returns {Boolean}
   * 
   * @param event - The JS event associated with a click.
   * @param {Boolean} isLinkOrX - True if the click event's target is either a link to
   * another page or the X Icon.
   */
  isOutsideSidebar(event, isLinkOrX) {
    if (isLinkOrX) return true;

    // Sanity check to ensure that sidebar is actually present.
    let sidebarElement = document.getElementById('sidebarDiv');
    if (sidebarElement === null) return false;

    let leftPixel = sidebarElement.offsetLeft; // Left-most pixel of sidebar.
    if (event.clientX < leftPixel) return true;

    return false;
  }

  openSidebar() {
    this.setState({ isSidebarOpen: true, isNormalOverlay: false });
  }

  /**
   * Returns whether or not the click event's target is outside the edit
   * member's modal in the Admin Component.
   * 
   * @returns {Boolean}
   * 
   * @param event - The JS event associated with a click.
   */
  isOutsideEMModal(event) {
    let editModalElement = document.getElementById('editMemberModal');
    if (editModalElement === null) return false;

    const leftPixel = editModalElement.offsetLeft;
    const rightPixel = leftPixel + editModalElement.offsetWidth;
    const topPixel = editModalElement.offsetTop;
    const bottomPixel = topPixel + editModalElement.offsetHeight;

    if (event.clientX < leftPixel || event.clientX > rightPixel) return true;
    if (event.clientY < topPixel || event.clientY > bottomPixel) return true;

    return false;
  }

  toggleOverlay() {
    let isNormalOverlay = this.state.isNormalOverlay;
    this.setState({ isNormalOverlay: !isNormalOverlay });
  }

  /**
   * Update the current page in the state so that the Header Component correctly
   * highlights the current page.
   * 
   * @param {String} page  - The page title.
   */
  updateCurrentPage(page) {
    this.setState({ currentPage: page });
  }

  render() {
    setTimeout(() => {
      this.setState({ showPopup: true });
    }, 3000);
    const isSidebarOpen = this.state.isSidebarOpen;

    const bgClass = this.state.isNormalOverlay ? 'bgNormalOverlay' : 'bgOtherOverlay';
    const sidebarClass = isSidebarOpen ? 'open' : null;

    return (
      <div onClick={this.handleClick}>
        <Router>
          <div className={bgClass} />
          <div id='sidebarDiv'
            className={`${sidebarClass} ${this.props.breakpoint !== 'M' ? 'bigSidebarDiv' : 'smallSidebarDiv'}`}>
            {isSidebarOpen ? <Sidebar closeSidebar={this.closeSidebar} /> : null}
          </div>

          {
            this.state.currentPage !== 'Admin' ?
              <Header openSidebar={this.openSidebar} updateCurrentPage={this.updateCurrentPage}
                currentPage={this.state.currentPage} {...this.props} /> : null
          }

          <Switch>
            <Route path="/" exact render={(props) => <Home {...props}
              updateCurrentPage={this.updateCurrentPage} />} />

            <Route path="/about" exact component={About} />

            <Route path="/leadership" exact component={Leadership} />

            <Route path="/events" exact component={Events} />

            <Route path="/sponsors" exact render={(props) => <Sponsors {...props}
              updateCurrentPage={this.updateCurrentPage} />} />

            <Route path="/join" exact component={Join} />

            <Route path="/admin" exact render={(props) => <Admin {...props}
              updateCurrentPage={this.updateCurrentPage} toggleOverlay={this.toggleOverlay} />} />
          </Switch>
        </Router>

        <PageMargin />
      </div>
    )
  }
}

/******************************************************************************/

export default withScreenSize(App);
