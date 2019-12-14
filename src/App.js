/**
 * @fileoverview The heart of the application which controls the highest level
 * components such as the Header, the Sidebar as well as the routing for the
 * entire application.
 */

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './styles/main.css';
import './App.css';

import About from './Components/About/About';
import Admin from './Components/Admin/Admin';
import Events from './Components/Events/Events';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Join from './Components/Join/Join';
import Leadership from './Components/Leadership/Leadership';
import PageMargin from './Components/Util/PageMargin';
import Sidebar from './Components/Sidebar/Sidebar';
import Sponsors from './Components/Sponsors/Sponsors';
import withScreenSize from './Components/HOC/ScreenSize';

const pathnameMap = require('./Components/Util/pathnameMap');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.sidebarRef = React.createRef();

    this.openSidebar = this.openSidebar.bind(this);
    this.closeSidebar = this.closeSidebar.bind(this);
    this.updateCurrentPage = this.updateCurrentPage.bind(this);
    this.toggleOverlay = this.toggleOverlay.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      currentPage: '',
      isSidebarOpen: false,
      normalOverlay: true
    }
  }

  componentWillMount() {
    this.setState({ currentPage: pathnameMap[window.location.pathname] });
  }

  openSidebar() {
    this.setState({ isSidebarOpen: true, normalOverlay: false });
  }

  handleClick(event) {
    if (this.state.isSidebarOpen) {
      this.closeSidebar(event);
    } else if (!this.state.normalOverlay) {
      if (this.isOutsideModal(event)) {
        this.setState({ normalOverlay: true });
      }
    }
  }

  isOutsideModal(event) {
    let editModalElement = document.getElementById('editMemberModal');
    if (editModalElement === null) return false;

    console.log(editModalElement)

    let leftPixel = editModalElement.offsetLeft;
    let rightPixel = leftPixel + editModalElement.offsetWidth;
    let topPixel = editModalElement.offsetTop;
    let bottomPixel = topPixel + editModalElement.offsetHeight;

    // console.log(leftPixel)
    // console.log(rightPixel)
    // console.log(event.clientX)

    // console.log(topPixel)
    // console.log(bottomPixel)
    // console.log(event.clientY)

    if (event.clientX < leftPixel || event.clientX > rightPixel) return true;
    if (event.clientY < topPixel || event.clientY > bottomPixel) return true;

    return false;
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

    this.setState({ isSidebarOpen: false, normalOverlay: true });
  }

  /**
   * Returns whether or not the click event's target is outside the sidebar's
   * dimensions or is a link or X Icon.
   * 
   * @returns {Boolean}
   * 
   * @param event - The JS event associated with a click.
   * @param isLinkOrX - True if the click event's target is either a link to
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

  updateCurrentPage(page) {
    this.setState({ currentPage: page });
  }

  toggleOverlay() {
    let normalOverlay = this.state.normalOverlay;
    this.setState({ normalOverlay: !normalOverlay });
  }

  render() {
    let isSidebarOpen = this.state.isSidebarOpen;

    let bgClass = this.state.normalOverlay ? 'bgNormalOverlay' : 'bgSidebarOverlay';
    let sidebarClass = isSidebarOpen ? 'open' : null;

    return (
      <div onClick={this.handleClick}>
        <Router>
          <div className={bgClass}></div>
          <div id='sidebarDiv'
            className={`${sidebarClass} ${this.props.breakpoint !== 'M' ? 'bigSidebarDiv' : 'smallSidebarDiv'}`}>
            {
              isSidebarOpen ?
                <Sidebar closeSidebar={this.closeSidebar} />
                :
                null
            }
          </div>

          {
            this.state.currentPage !== 'Admin' ?
              <Header openSidebar={this.openSidebar} updateCurrentPage={this.updateCurrentPage}
                currentPage={this.state.currentPage} {...this.props} />
              :
              null
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

export default withScreenSize(App);
