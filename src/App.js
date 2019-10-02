import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { CSSTransition } from "react-transition-group";

import './main.css';
import './App.css';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Leadership from './components/Leadership/Leadership';
import Sponsors from './components/Sponsors/Sponsors';
import Events from './components/Events/Events';
import Sidebar from './components/Sidebar/Sidebar';
import ScreenSize from './components/HOC/ScreenSize';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.sidebarRef = React.createRef();

    this.state = {
      sidebarOpen: false
    }

    this.openSidebar = this.openSidebar.bind(this);
    this.closeSidebar = this.closeSidebar.bind(this);
  }

  openSidebar() {
    this.setState({ sidebarOpen: true });
  }

  closeSidebar(event, isLink = false) {
    // If click is within the sidebar but not on a link, don't close the sidebar.
    if (!this.checkIfOutsideSidebar(event, isLink)) return;

    this.setState({ sidebarOpen: false });
  }

  checkIfOutsideSidebar(event, isLink) {
    if (isLink) return true;

    let sidebarElement = document.getElementById('sidebar');
    if (sidebarElement === null) return false;

    // Retrieve the left-most pixel of the sidebar.
    let leftPixel = sidebarElement.offsetLeft;

    if (event.clientX < leftPixel) return true;

    return false;
  }


  render() {

    return (
      <div onClick={this.closeSidebar}>
        <Router>
          <div id="bgOverlay"></div>
          {
            this.state.sidebarOpen ?
              <Sidebar closeSidebar={this.closeSidebar} />
              :
              null
          }
          <Header openSidebar={this.openSidebar} {...this.props} />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/leadership" exact component={Leadership} />
            <Route path="/events" exact component={Events} />
            <Route path="/sponsors" exact component={Sponsors} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default ScreenSize(App);
