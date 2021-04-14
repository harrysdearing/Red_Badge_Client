import React, { useState } from 'react';
// import {
//   BrowserRouter as Router
// } from 'react-router-dom';
import Header from './home/Navbar';
import Auth from './auth/Auth';
import Home from './home/Home';

function App() {
  const [sessionToken, setSessionToken] = useState('');

  const updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }
  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }

  const protectedViews = () => {
    return (
      sessionToken === localStorage.getItem('token') ? 
      <Home token={sessionToken}/>
      : 
      <Auth updateToken={updateToken} sessionToken={sessionToken}/>
    )
  }

  return (
    <div>
      <Header clickLogout={clearToken}/>
      {protectedViews()}
    </div>
  );
}

export default App;
