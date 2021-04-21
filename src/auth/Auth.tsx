import React from 'react';
import Signup from './Signup';
import Login from './Login';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

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
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <h1>Welcome to E-Z Billing!</h1>
                {this.state.toggle ? <Signup updateToken={this.props.updateToken} sessionToken={this.props.sessionToken}/> : <Login updateToken={this.props.updateToken}/>}
                {this.state.toggle ? <p>RETURNING USER?</p> : <p>FIRST TIME USER?</p>}
                <button id="clickHere" onClick={() => this.setState({toggle: !this.state.toggle})}>CLICK HERE</button> 
            </Container>
        </React.Fragment>        
    )
}
}


export default Auth;