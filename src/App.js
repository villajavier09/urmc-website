/**
 * @fileoverview The heart of the application which controls the highest level
 * components such as the Header, the Sidebar as well as the routing for the
 * entire application.
 */

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './main.css';
import './App.css';

import About from './Components/About/About';
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

    this.state = {
      currentPage: '',
      isSidebarOpen: false
    }
  }

  componentWillMount() {
    this.setState({ currentPage: pathnameMap[window.location.pathname] });
  }

  openSidebar() {
    this.setState({ isSidebarOpen: true });
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

    this.setState({ isSidebarOpen: false });
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

  render() {
    let isSidebarOpen = this.state.isSidebarOpen;

    let bgId = isSidebarOpen ? 'bgSidebarOverlay' : 'bgNormalOverlay';
    let sidebarClass = isSidebarOpen ? 'open' : null;

    return (
      <div onClick={this.closeSidebar}>
        <Router>
          <div id={bgId}></div>
          <div id='sidebarDiv'
            className={`${sidebarClass} ${this.props.breakpoint !== 'M' ? 'bigSidebarDiv' : 'smallSidebarDiv'}`}>
            {
              isSidebarOpen ?
                <Sidebar closeSidebar={this.closeSidebar} />
                :
                null
            }
          </div>

          <Header openSidebar={this.openSidebar} updateCurrentPage={this.updateCurrentPage}
            currentPage={this.state.currentPage} {...this.props} />

          <Switch>
            <Route path="/" exact render={(props) => <Home {...props}
              updateCurrentPage={this.updateCurrentPage} />} />
            <Route path="/about" exact component={About} />
            <Route path="/leadership" exact component={Leadership} />
            <Route path="/events" exact component={Events} />
            <Route path="/sponsors" exact render={(props) => <Sponsors {...props}
              updateCurrentPage={this.updateCurrentPage} />} />
            <Route path="/join" exact component={Join} />
          </Switch>
        </Router>

        <PageMargin />
      </div>
    )
  }
}

export default withScreenSize(App);
