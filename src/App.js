import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './main.css';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Leadership from './components/Leadership/Leadership';
import Sponsors from './components/Sponsors/Sponsors';
import Events from './components/Events/Events';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/leadership" exact component={Leadership} />
          <Route path="/events" exact component={Events} />
          <Route path="/sponsors" exact component={Sponsors} />
        </Switch>
      </Router>
    )
  }
}

export default App;
