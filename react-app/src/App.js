import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js'
import 'bootstrap/dist/js/bootstrap.min.js';

import ImageSyllables from './pages/image-syllables';
import ImageWords from './pages/image-words';
import Home from './pages/home';
import Articles from './pages/articles';
import Header from './shared/header'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/imageSyllables">
            <ImageSyllables />
          </Route>
          <Route path="/imageWords">
            <ImageWords />
          </Route>
          <Route path="/articles">
            <Articles />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

      </Router>
      </div>
  );
}

export default App;
