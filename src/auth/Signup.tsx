import React,{useState, useEffect} from 'react';
import Company from './Company';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import './auth.css';

interface SignupProps {
    updateToken: any,
    sessionToken: any
}

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
        width: 1200,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    }),
  );

const Signup: React.FC<SignupProps> = (props: SignupProps): any=>{
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [role,setRole]=useState('Sales Representative');
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [authenticated, setAuthenticated] = React.useState(false);
    const [companyOptions, setCompanyOptions] = useState<any[]>([]);
    const [userCompany, setUserCompany] = useState(1);

    const handleSubmit = (event: any) => {
        event.preventDefault()
        fetch(`http://localhost:3000/user/register`,{
            method:'POST',
            body:JSON.stringify({user:{
                firstName: firstName,
                lastName: lastName,
                role: role,
                username: username,
                password: password,
                companyId: userCompany
            }}),
            headers: new Headers({
                'Content-Type':'application/json'
            })
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log('Get my token', data);
            props.updateToken(data.sessionToken);
            if (props.sessionToken == undefined) {
                setAuthenticated(true);
            }
        })
    }

    const getCompany = () => {
        fetch(`http://localhost:3000/company/getcompanies`, {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                "Accept": "application/json"
            }),
        })
        .then((res) => res.json())
        .then((json) => {
            console.log('Am I getting the companies', json)
            setCompanyOptions(json)
        })
        .catch((error) => {
            console.log('Where are the companies', error)
        })
    }

    const handleCompany = (e: any) => {
        let data;
        console.log('What are you', companyOptions)
        for (data of companyOptions){
            if (data.companyName == e.target.value){
                setUserCompany(data.id)
            } else {
                'What did you select?'
            }
        }
    }

    const handleClose = () => {
        setAuthenticated(!authenticated);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Please Try Again With Valid Email address and Password</h2>
          <Button variant="contained" color="secondary" onClick={handleClose}>Close</Button>
        </div>
    );

    useEffect(() => {
        getCompany()
    }, [])


    return(
        <React.Fragment>
            <CssBaseline />
            <div>
                <h3 className="siglog">SIGN UP</h3>
                <Company fN={firstName} lN={lastName} role={role} username={username} password={password} updateToken={props.updateToken} authenticated={authenticated} sessionToken={props.sessionToken} showCompany={getCompany}/>
                <br/>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <InputLabel id="suLabel" htmlFor="firstName">First Name</InputLabel>
                        <Input onChange={(e)=>setFirstName(e.target.value)} name = "firstName" value={firstName} id="signup"/>
                    </div>
                    <div>
                        <InputLabel id="suLabel" htmlFor="lastName">Last Name</InputLabel>
                        <Input onChange={(e)=>setLastName(e.target.value)} name = "lastName" value={lastName} id="signup"/>
                    </div>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="role">Select Your Role</InputLabel>
                        <Select 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)} 
                        displayEmpty
                        className={classes.selectEmpty}
                        name="role"
                        id="signup"
                        >
                            <MenuItem value={'Sales Representative'}>Sales Representative</MenuItem>
                            <MenuItem value={'Manager'}>Manager</MenuItem>
                            <MenuItem value={'Administrator'}>Administrator</MenuItem>
                        </Select>
                    </FormControl>
                    <div>
                        <label htmlFor="company" id="selectCompanyLabel">Select Your Company</label>
                        <select 
                            onChange={handleCompany} 
                            name="company"
                            id="selectCompany"
                        >
                        {companyOptions.map((company) => {
                            return (
                                <option key={company.id} id="selectOption">
                                    {company.companyName}
                                </option>
                            )
                        })}
                        </select>
                    </div>
                    <div>
                        <InputLabel id="suLabel" htmlFor="username">Username</InputLabel>
                        <Input onChange={(e)=>setUsername(e.target.value)} name = "username" value={username} id="signup"/>
                    </div>
                    <div>
                        <InputLabel id="suLabel" htmlFor="password">Password</InputLabel>
                        <Input type='password' onChange={(e)=>setPassword(e.target.value)} name = "password" value={password} id="signup"/>
                    </div>
                    <br/>
                    <Modal
                        open={authenticated}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        {body}
                    </Modal>
                    <Button id="suBtn" type="submit" variant="contained" color="primary">Sign up</Button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default Signup;