import React,{useState, useEffect} from 'react';
import Company from './Company';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';

interface SignupProps {
    updateToken: any,
    sessionToken: any
}

const Signup: React.FC<SignupProps> = (props: SignupProps): any=>{
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [role,setRole]=useState('Sales Representative');
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [companyOptions, setCompanyOptions] = useState<any[]>([]);
    const [userCompany, setUserCompany] = useState(1);
    console.log('Can I get the company?', props);

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
                companyId: Number(userCompany)
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

    useEffect(() => {
        fetch(`http://localhost:3000/company/getcompanies`, {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                "Accept": "application/json"
            }),
        })
        .then((res) => res.json())
        .then((json) => {
            setCompanyOptions(json)
        })
    }, [])

    return(
        <div style={{margin:'auto'}}>
            <h2 className="siglog">SIGN UP</h2>
            <Company fN={firstName} lN={lastName} role={role} username={username} password={password} updateToken={props.updateToken} authenticated={authenticated} sessionToken={props.sessionToken}/>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label id="suLabel" htmlFor="firstName">First Name</label>
                    <input id="textBox" onChange={(e)=>setFirstName(e.target.value)} name = "firstName" value={firstName}/>
                </div>
                <div>
                    <label id="suLabel" htmlFor="lastName">Last Name</label>
                    <input id="textBox" onChange={(e)=>setLastName(e.target.value)} name = "lastName" value={lastName}/>
                </div>
                <div>
                    <select onChange={(e) => setRole(e.target.value)} name="role" value={role}>
                        <option>Sales Representative</option>
                        <option>Manager</option>
                        <option>Administrator</option>
                    </select>
                </div>
                <div>
                    <label>
                        Select Your Current Company
                        <select onChange={(e: any) => setUserCompany(e.target.value)} value={userCompany}>
                        {companyOptions.map((company) => {
                            console.log('is the event working', typeof userCompany);
                            console.log('what is the event', userCompany);
                            return (
                                <option key={company.id}>
                                    {console.log(userCompany)}
                                    {company.companyName}
                                </option>
                            )
                        })}
                        </select>
                    </label>
                </div>
                <div>
                    <label id="suLabel" htmlFor="username">Username</label>
                    <input id="textBox" onChange={(e)=>setUsername(e.target.value)} name = "username" value={username}/>
                </div>
                <div>
                    <label id="suLabel" htmlFor="password">Password</label>
                    <input type='password' id="textBox" onChange={(e)=>setPassword(e.target.value)} name = "password" value={password}/>
                </div>

                {authenticated ? 
                    <Modal isOpen={true}>
                        <ModalHeader closeButton id="modalHeader">User Already Exists</ModalHeader>
                        <ModalBody id="modalBody">This User Already Exists.  Please Create A New User Or "CLICK HERE" Below To Login With An Existing User.</ModalBody>
                        <Button variant="secondary" onClick={() => setAuthenticated(false)} id="modalButton">Close</Button>
                    </Modal> : <br/> }
                <button id="suBtn" type="submit">Sign up</button>
            </form>
        </div>
    )
}

export default Signup;