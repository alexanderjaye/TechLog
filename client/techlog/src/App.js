import React, { useState } from 'react';
import './App.css';

import Authorised from './Components/App/Authorised';
import Unauthorised from './Components/App/Unauthorised';


function App() {

  //App level state
  const [authorised, setAuthorised] = useState(true);

  return (
    <div className="App">
      {authorised ? 
        <Authorised/> :
        <Unauthorised/>}
    </div>
  );
}

export default App;
