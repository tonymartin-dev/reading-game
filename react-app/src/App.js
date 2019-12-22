import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js'
import 'bootstrap/dist/js/bootstrap.min.js';

import ImageWords from './components/image-words/index.js'
import PruebaFn from './components/prueba-fn/index.js'


function Home() {
  return <h2>Home</h2>;
}

function App() {
  return (
    <div className="App">
      <Router>

        <nav>
          <ul className="main-menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/imageWords">ImageWords</Link></li>
            <li><Link to="/prueba-fn">Prueba FN</Link></li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/imageWords">
            <ImageWords />
          </Route>
          <Route path="/prueba-fn">
            <PruebaFn saludo="'hihi'" />
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
