import logo from './images/logo.png'
import './App.css';
import Home from './screens/Home';
import Profile from './screens/Profile';
import { GoogleLogin } from '@react-oauth/google';
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
// import AccountPage from './screens/AccountPage';

function App() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  function Mode(component) {
    if (profile) {
      return component
    } else {
      return <div className='login'>
        <img className="logo" src={logo} alt="logo" />
        <GoogleLogin onSuccess={() => login()} />
      </div>
    }
  }

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          let data = res.data
          // setProfile(res.data);
          // console.log(profile)
          // Register the user with the backend if they don't already exist
          axios.post('http://localhost:8080/register', {
            ProfilePhoto: res.data.picture,
            email: res.data.email,
            Name: res.data.name
          })
            .then((res) => {
              // Log the user ID if registration is successful
              console.log(`User ID: ${res.data.userId}`);
              // console.log(profile)
              // console.log({...data, id: res.data.userId})
              setProfile({ ...data, id: res.data.userId })
              // console.log(profile)
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const addMusicItem = async (selected) => {
    const title = selected.title;
    const [artist, track] = title.split(" - ")

    // console.log(props)
    try {
      const response = await axios.post(`http://localhost:8080/add-music-item`, {
        userId: profile.id,
        name: track,
        artist: artist,
        genre: selected.genre[0],
        thumb: selected.thumb,
        format: selected.format[0].toLowerCase()
      });
      console.log(response.data); // handle success response
      // setChange(prev => !prev)
    } catch (error) {
      console.error(error); // handle error response
    }
  };

  useEffect(() => {
    console.log(profile)
  }, [profile])


  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
    setUser(null);
  };

  return (
    <div className="App">
      {/* {profile ?
        <Home {...profile} logOut={logOut} />
        // <Profile logOut={logOut} {...profile}/>
        // <AddMusic />
        :
        <div className='login'>
          <img className="logo" src={logo} alt="logo" />
          <GoogleLogin onSuccess={() => login()} />
        </div>
      } */}
      <Router>
        <Routes>
          <Route path="/" element={Mode(<Home {...profile} logOut={logOut} addMusicItem={addMusicItem}/>)} />
          {/* <Route path="/alive-frontend" element={} /> */}
          <Route path="/profile/:userid" element={Mode(<Profile logOut={logOut} {...profile} addMusicItem={addMusicItem}/>)} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// /*App.js*/



// function App() {
//   const [user, setUser] = useState([]);
//   const [profile, setProfile] = useState([]);



//   return (
//     <div>
//       <h2>React Google Login</h2>
//       <br />
//       <br />
//       {profile ? (
//         <div>
//           <img src={profile.picture} alt="user image" />
//           <h3>User Logged in</h3>
//           <p>Name: {profile.name}</p>
//           <p>Email Address: {profile.email}</p>
//           <br />
//           <br />
//           <button onClick={logOut}>Log out</button>
//         </div>
//       ) : (
//         <button onClick={() => login()}>Sign in with Google 🚀 </button>
//       )}
//     </div>
//   );
// }
// export default App;
