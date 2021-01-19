import React, { useState } from 'react';
import './App.css';

import Authorised from './Components/App/Authorised';
import Unauthorised from './Components/App/Unauthorised';


function App() {

  const authorised = true;
  // //App level state
  // const [authorised, setAuthorised] = useState(true);

  // //Move to auth class in utils?
  // const logout = () => {
  //   setAuthorised(false);
  // }

  //logout={logout}

  return (
    <div className="App">
      {authorised ? 
        <Authorised/> :
        <Unauthorised/>}
    </div>
  );
}

export default App;
