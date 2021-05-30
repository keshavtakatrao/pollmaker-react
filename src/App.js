import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Home from './components/home';
import Createpoll from './components/createpoll';
import Poll from './components/poll'
import Result from './components/result'

function App() {
  return (<Router>
        <>
          <Switch>
            <Route exact path='/' component={Home} exact={true}/>
            <Route path="/sign-in" component={Login} exact={true}/>
            <Route path="/sign-up" component={SignUp} exact={true} />
            <Route path="/createpoll" component={Createpoll} exact={true} />
            <Route path='/poll/:id' component={Poll} exact={true}/>
            <Route path='/result/:id' component={Result} exact={true} />
          </Switch> 
        </>
  </Router>
  );
}

export default App;