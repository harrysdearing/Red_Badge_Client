// import React from 'react';
// import Clover_Fetch from './components/Fetch';
// import Header from './home/Navbar';
// import Auth from './auth/Auth';

// interface AppProps {
//     token: string,
//     updateToken: string,
//     sessionToken: string

// }
// interface AppState {
//   sessionToken: string
// }

// class App extends React.Component <AppProps, AppState>{
//   constructor(props: AppProps){
//       super(props)
//       this.state = {
//           sessionToken: ''
//       }
//   }
  
//   // useEffect(()=>{
//   //   if(localStorage.getItem('token')){
//   //     let localStorage: any;
//   //     setSessionToken(localStorage.getItem('token'))
//   //   }
//   // },[])

//  updateToken=(newToken: any)=>{
//     localStorage.setItem('token', newToken);
//     setSessionToken(newToken)
//     console.log(this.state.sessionToken);
//   }
//   clearToken=()=>{
//     localStorage.clear();
//     this.setState({sessionToken: ''});

//   }


// protectedViews=()=>{
//   console.log('Token', this.state.sessionToken);

//     return (
//       this.state.sessionToken===localStorage.getItem('token')?<Clover_Fetch token={this.state.sessionToken}/>:<Auth updateToken={this.updateToken}/>
//     )
//   }

  
//   render(){
//     console.log('App', this);
//   return (
//     <div>
//       <Header sessionToken={this.state.sessionToken} clickLogout={this.clearToken}/>
//       <Auth />
//       {this.protectedViews}
//       {/* <Clover_Fetch/> */}
//     </div>
   
//   );
// }
// }

// export default App;

import React, { useState } from 'react';
import Header from './home/Navbar';
import Auth from './auth/Auth';
import Home from './home/Home';

function App() {
  const [sessionToken, setSessionToken] = useState('');

  // useEffect(() => {
  //   if (localStorage.getItem('token')){
  //     setSessionToken(
  //       localStorage.getItem('token')
  //       );
  //   }
  // }, [])

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
    return (sessionToken === localStorage.getItem('token') ? <Home token={sessionToken}/>
    : <Auth updateToken={updateToken}/>)
  }

  return (
    <div>
      <Header clickLogout={clearToken}/>
      {protectedViews()}
    </div>
  );
}

export default App;
