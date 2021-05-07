import React, {useState, useEffect} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import './auth.css';

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    }),
  );

const Login = (props: any)=>{
    const classes = useStyles();
    const [username,setUser]=useState('');
    const [password,setPassword]=useState('');
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    
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
                setOpen(true);
            }
        })
        .catch((error) => {
            console.log('Login error', error)
        })
    }
    
    const handleClose = () => {
        setOpen(!open);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Please Try Again With Valid Email address and Password</h2>
          <Button variant="contained" color="secondary" onClick={handleClose}>Close</Button>
        </div>
    );

    useEffect(() => {
        handleSubmit
    }, [])
    return(
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <h3 className="siglog">LOG IN</h3>
                <form onSubmit={(event)=>handleSubmit(event)}>
                    <FormGroup>
                        <InputLabel htmlFor="component-simple">Username</InputLabel>
                        <Input id="component-simple" onChange={(e)=>setUser(e.target.value)} name = "username" value={username}/>
                    </FormGroup>
                    <FormGroup>
                        <InputLabel htmlFor="component-simple">Password</InputLabel>
                        <Input type="password" id="component-simple" onChange={(e)=>setPassword(e.target.value)} name = "password" value={password}/>
                    </FormGroup>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        {body}
                    </Modal>
                    <br/>
                    <Button id="suBtn" type="submit" variant="contained" color="primary">Login</Button>    
                </form>
            </Container>
        </React.Fragment>
    )
}

export default Login;