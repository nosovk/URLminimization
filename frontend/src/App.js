import React from 'react';
import './App.css';
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Navbar from './components/NavBar'

function App() {
  return (
      <Router>
          <Navbar/>
          <Layout>
              <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
              </Switch>
          </Layout>
      </Router>
  );
}

export default App;
