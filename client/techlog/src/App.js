import React, { useState } from 'react';
import './App.css';

import Authorised from './Components/App/Authorised';
import Unauthorised from './Components/App/Unauthorised';


function App() {

  //App level state
  const [authorised, setAuthorised] = useState(true);

  //Move to auth class in utils?
  const logout = () => {
    setAuthorised(false);
  }

  return (
    <div className="App">
      {authorised ? 
        <Authorised logout={logout}/> :
        <Unauthorised/>}
    </div>
  );
}

export default App;
