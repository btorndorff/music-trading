import logo from './images/logo.png'
import './App.css';
import Home from './screens/Home';
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <div className="App">
      {authenticated ?
        <Home />
        :
        <div className='login'>
          <img className="logo" src={logo} alt="logo" />
          <GoogleLogin onSuccess={() => setAuthenticated(true)} />
        </div>
      }
    </div>
  );
}

export default App;
