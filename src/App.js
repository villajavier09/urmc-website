// React Library
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group'

// CSS Files
import './main.css';
import './App.css';

// Components
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Leadership from './components/Leadership/Leadership';
import Sponsors from './components/Sponsors/Sponsors';
import Events from './components/Events/Events';
import Sidebar from './components/Sidebar/Sidebar';
import Join from './components/Join/Join';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.sidebarRef = React.createRef();

    this.state = { sidebarOpen: false }

    this.openSidebar = this.openSidebar.bind(this);
    this.closeSidebar = this.closeSidebar.bind(this);
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

    document.getElementById('sidebar').classList.remove('active');

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
    let sidebarElement = document.getElementById('sidebar');
    if (sidebarElement === null) return false;

    let leftPixel = sidebarElement.offsetLeft; // Left-most pixel of sidebar.
    if (event.clientX < leftPixel) return true;

    return false;
  }


  render() {

    let bgClass = this.state.sidebarOpen ? 'bgSidebarOverlay' : 'bgNormalOverlay';

    return (
      <div onClick={this.closeSidebar}>
        <Router>
          <div id={bgClass}></div>
          {
            this.state.sidebarOpen ?
              <CSSTransition
                in={this.state.sidebarOpen}
                appear={true}
                timeout={500}
                classNames="sidebar"
              >
                <Sidebar closeSidebar={this.closeSidebar} />
              </CSSTransition>
              :
              null
          }

          <Header openSidebar={this.openSidebar} {...this.props} />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/leadership" exact component={Leadership} />
            <Route path="/events" exact component={Events} />
            <Route path="/sponsors" exact component={Sponsors} />
            <Route path="/join" exact component={Join} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
