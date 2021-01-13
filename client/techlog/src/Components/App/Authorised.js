import React, { useState } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './Authorised.css';

import Navbar from '../Nav/Navbar';
import Searchlist from '../Search/SearchList';
import NewReport from '../Reports/NewReport';
import Login from '../Login/Login';
import Report from '../Reports/Report';

const Authorised = ({logout}) => {

  //Authorised App Level State
  const [mode, setMode] = useState('light');
  const [admin, setAdmin] = useState(true);

  //Mode change
  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', mode);
  }
  
  return (
    <Router>
      <div className="main-app">
        <Navbar 
          logout={logout}
          toggleMode={toggleMode}
          admin={admin}
          />
        <Switch>
          <Route exact path = '/search' component={Searchlist}/>
          <Route exact path = '/new' component={NewReport}/>
          <Route exact path = '/logout' component={Login}/>
          <Route path = '/report' component = {Report}/>
        </Switch>
      </div>
    </Router>

  )
}

export default Authorised;