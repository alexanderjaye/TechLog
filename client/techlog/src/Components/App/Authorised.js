import React, { useState } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './Authorised.css';

import { modeAnimation } from '../../Utils/animations';

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

  const [editReport, setEditReport] = useState(null);

  //Variable to store report id for 'copy and paste' function
  const reportId = (id) => {
    setEditReport(id);
  };  

  //Mode change
  const toggleMode = () => {
    modeAnimation();
    if (mode === 'light') {
      trans();
      setMode('dark'); 
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      trans();
      setMode('light'); 
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  const trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
      document.documentElement.classList.remove('transition')}, 1000);
  };

  return (
    <Router>
      <div className="footer-wrap">
        <div className="main-app">
          <Navbar 
            logout={logout}
            mode={mode}
            toggleMode={toggleMode}
            admin={admin}
            />
          <Switch>
            <Route exact path = '/search' render={(props) => (<SearchList {...props} admin={admin} reportId={reportId}/>)}/>  
            <Route exact path = '/new' component={NewReport}/>
            <Route exact path = '/edit' render={(props) => (<EditReport {...props} editReport={editReport}/>)}/>
            <Route exact path = '/logout' component={Login}/>
          </Switch>
        </div>
          <Footer/>
      </div>
    </Router>

  )
}

export default Authorised;

//<Route exact path = '/search' component={SearchList} admin={admin}/>
//<Route exact path = '/edit' component={EditReport}></Route>