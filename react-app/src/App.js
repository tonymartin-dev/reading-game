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

import ImageWords from './pages/image-words';
import Home from './pages/home';

function App() {
  return (
    <div className="App">
      <Router>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/imageWords">
            <ImageWords />
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
