import React from 'react';
import Signup from './Signup';
import Login from './Login';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import './auth.css';

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
    return(
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <h4>Welcome to E-Z Billing!</h4>
                {this.state.toggle ? <Signup updateToken={this.props.updateToken} sessionToken={this.props.sessionToken}/> : <Login updateToken={this.props.updateToken}/>}
                {this.state.toggle ? <p>RETURNING USER?</p> : <p>FIRST TIME USER?</p>}
                <Button id="clickHere" variant="contained" color="primary" onClick={() => this.setState({toggle: !this.state.toggle})}>CLICK HERE</Button> 
            </Container>
        </React.Fragment>        
    )
}
}


export default Auth;