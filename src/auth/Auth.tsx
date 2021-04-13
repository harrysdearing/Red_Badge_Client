import React from 'react';

import Signup from './Signup';
import Login from './Login';

interface AuthProps {
    updateToken: any,
    sessionToken: any
}

interface AuthState {
    toggle: boolean
}

class Auth extends React.Component <AuthProps, AuthState>{
constructor(props: AuthProps){
    super(props)
    this.state = {
        toggle: false
    }
}
render(){

    console.log('Auth', this);
    return(
        <div>
            <div>
                <h1>Welcome to E-Z Billing!</h1>
            </div>
            <div>   
                 {this.state.toggle ? <Signup updateToken={this.props.updateToken} sessionToken={this.props.sessionToken}/> : <Login updateToken={this.props.updateToken}/>}
            </div>
            <div style={{margin:'auto'}}>
                {this.state.toggle ? <p>RETURNING USER?</p> : <p>FIRST TIME USER?</p>}
            </div>
            <button id="clickHere" onClick={() => this.setState({toggle: !this.state.toggle})}>CLICK HERE</button> 
            <br/>    
            <br/>
            <br/>
            <br/>     
        </div>
        
    )
}
}


export default Auth;