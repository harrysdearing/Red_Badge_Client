import React, {useState, useEffect} from 'react';
import {Modal, ModalHeader, ModalBody, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const Login = (props: any)=>{
    const [username,setUser]=useState('');
    const [password,setPassword]=useState('');
    const [authenticated, setAuthenticated] = useState(false);
    
    const handleSubmit=(event: any)=>{
        event.preventDefault();
        fetch(`http://localhost:3000/user/login`,{
            method:'POST',
            body:JSON.stringify({user:{username:username,password:password}}),
            headers: new Headers({
                'Content-Type':'application/json'
            })
        })
        .then((res)=>res.json())
        .then((data)=>{
            props.updateToken(data.sessionToken);
            if (props.sessionToken == undefined) {
                setAuthenticated(true);
            }
        })
    }

    useEffect(() => {
        handleSubmit
    })
    return(
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <h2 className="siglog">LOG IN</h2>
                <Form onSubmit={(e)=>handleSubmit(e)}>
                    <FormGroup>
                        <Label id="suLabel" htmlFor="username">Username</Label>
                        <Input id="textBox" onChange={(e)=>setUser(e.target.value)} name = "username" value={username}/>
                    </FormGroup>
                    <FormGroup>
                        <Label id="suLabel" htmlFor="password">Password</Label>
                        <Input type='password' id="textBox" onChange={(e)=>setPassword(e.target.value)} name = "password" value={password}/>
                    </FormGroup>
                    {authenticated ? 
                        <Modal isOpen={true}>
                            <ModalHeader closeButton id="modalHeader">No User Exists</ModalHeader>
                            <ModalBody id="modalBody">Please Try Again With Valid Email address and Password</ModalBody>
                            <Button id="modalButton" variant="secondary" onClick={() => setAuthenticated(false)}>Close</Button>
                        </Modal> : <br/> }
                    <Button id="suBtn" type="submit">Login</Button>    
                </Form>
            </Container>
        </React.Fragment>
    )
}

export default Login;
