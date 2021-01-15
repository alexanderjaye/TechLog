import React, { useState } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './Authorised.css';

import Navbar from '../Nav/Navbar';
import SearchList from '../Search/SearchList';
import NewReport from '../NewReport/NewReport';
import EditReport from '../EditReport/EditReport'
import Login from '../Login/Login';
import Footer from '../Footer/Footer';

const Authorised = ({logout}) => {

  //Authorised App Level State
  const [mode, setMode] = useState('light');
  const [admin, setAdmin] = useState(true);

  //Mode change
  const toggleMode = () => {
    trans();
    setMode(mode === 'light' ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', mode);
  }

  const trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
      document.documentElement.classList.remove('transition')}, 1000);
  };

  return (
    <Router>
      <div className="main-app">
        <Navbar 
          logout={logout}
          mode={mode}
          toggleMode={toggleMode}
          admin={admin}
          />
        <Switch>
          <Route exact path = '/search' render={(props) => (<SearchList {...props} admin={admin}/>)}/>  
          <Route exact path = '/new' component={NewReport}/>
          <Route exact path = '/edit' component={EditReport}></Route>
          <Route exact path = '/logout' component={Login}/>
        </Switch>
        <Footer/>
      </div>
    </Router>

  )
}

export default Authorised;

//<Route exact path = '/search' component={SearchList} admin={admin}/>