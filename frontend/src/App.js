import React from 'react';
import './App.css';
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import ResetPsw from "./ResetPsw";
import {BrowserRouter as Router, Switch, Route, useParams} from 'react-router-dom';
import Layout from './components/Layout';
import Navbar from './components/NavBar'
import EmailTokenReset from "./EmailTokenReset";

function App() {
  return (
      <Router>
          <Navbar/>
          <Layout>
              <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                  <Route path="/resetPsw" component={ResetPsw} />
                  <Route
                      path="/update-password/:_id/:token"
                      render={({ match }) => (
                          <EmailTokenReset _id={match.params._id} token={match.params.token} />
                      )}
                  />
              </Switch>
          </Layout>
      </Router>
  );
}

export default App;
