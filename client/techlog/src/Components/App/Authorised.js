import React, { useState } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './Authorised.css';

import Navbar from '../Nav/Navbar';
import Searchlist from '../Search/SearchList';
import NewReport from '../Reports/NewReport';
import Report from '../Reports/Report';

const Authorised = () => {

  //Authorised App Level State
  const [mode, setMode] = useState('light');
  const [admin, setAdmin] = useState(true);

  return (
    <Router>
      <div className="main-app">
        <Navbar/>
        <Switch>
          <Route exact path = '/search' component={Searchlist}/>
          <Route exact path = '/new' component={NewReport}/>
          <Route path = 'report' component = {Report}/>
        </Switch>
      </div>
    </Router>

  )
}

export default Authorised;