// React Library
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// CSS Files
import './main.css';
import './App.css';

// Components
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Leadership from './Components/Leadership/Leadership';
import Sponsors from './Components/Sponsors/Sponsors';
import Events from './Components/Events/Events';
import Sidebar from './Components/Sidebar/Sidebar';
import Join from './Components/Join/Join';
import PageMargin from './Components/Util/PageMargin';
import withScreenSize from './Components/HOC/ScreenSize';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.pathnameMap = {
      '/': 'Home',
      '/about': 'About Us',
      '/leadership': 'Leadership',
      '/events': 'Events',
      '/sponsors': 'Sponsors',
      '/join': 'Getting Involved'
    }

    this.sidebarRef = React.createRef();

    this.state = {
      currentPage: '',
      sidebarOpen: false
    }

    this.openSidebar = this.openSidebar.bind(this);
    this.closeSidebar = this.closeSidebar.bind(this);
    this.updateCurrentPage = this.updateCurrentPage.bind(this);
  }

  componentWillMount() {
    this.setState({ currentPage: this.pathnameMap[window.location.pathname] });
  }

  openSidebar() {
    this.setState({ sidebarOpen: true });
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

    this.setState({ sidebarOpen: false });
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

    let bgId = this.state.sidebarOpen ? 'bgSidebarOverlay' : 'bgNormalOverlay';
    let sidebarClass = this.state.sidebarOpen ? 'open' : null;

    return (
      <div onClick={this.closeSidebar}>
        <Router>
          <div id={bgId}></div>
          <div id='sidebarDiv' className={`${sidebarClass}
          ${this.props.breakpoint !== 'M' ? 'bigSidebarDiv' : 'smallSidebarDiv'}`}>
            {
              this.state.sidebarOpen ?
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
