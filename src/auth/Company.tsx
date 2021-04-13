import React from 'react';
import Signup from './Signup';
import {Form, Button, Label, Input} from 'reactstrap';

interface CompanyProps {
    fN: string,
    lN: string,
    role: string,
    username: string,
    password: string,
    updateToken: any,
    sessionToken: any,
    authenticated: boolean
}

interface CompanyState {
    companyId: number,
    companyName: string,
    currency: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    toggle: boolean,
    userCompany: any,
    companyOptions: any[],
    fN: string,
    lN: string,
    role: string,
    username: string,
    password: string
}

class Company extends React.Component <CompanyProps, CompanyState> {
    constructor(props: CompanyProps){
        super(props)
        this.state = {
            companyId: 0,
            companyName: '',
            currency: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            toggle: false,
            userCompany: '',
            companyOptions: [],
            fN: '',
            lN: '',
            role: '',
            username: '',
            password: ''
        }
    }

    findCompany = (): void  => {
        fetch(`http://localhost:3000/company/getcompanies`, {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                "Accept": "application/json"
            }),
        })
        .then((res) => res.json())
        .then((json) => {
            this.setState({companyOptions: json})
        })
    }

    addCompany = (event: React.MouseEvent<HTMLButtonElement>) => {
        fetch(`http://localhost:3000/company/registercompany`, {
            method: 'POST',
            body: JSON.stringify({
                company: {
                    companyName: this.state.companyName,
                    currency: this.state.currency,
                    address: this.state.address,
                    city: this.state.city,
                    state: this.state.state,
                    zip: this.state.zip
                }
            }),
            headers: new Headers ({
                "Content-Type": "application/json"

            })
        })
        .then((res) => res.json())
        .then((json) => {
            console.log('New Company Set Up', json)
        })
        .catch((err) => console.log('Company Not Added', err))
    }

    handleToggle = (event: React.MouseEvent<HTMLButtonElement> ): void => {
        this.setState({toggle: !this.state.toggle})
        console.log(this.state.toggle);
    }

    handleCompany = () => {
        this.state.userCompany.split(' ');
        console.log('did you store the company?', this.state.userCompany);
    }

    componentDidMount(){
        this.addCompany
        this.findCompany()
        this.handleCompany()
    }

    componentWillUnmount(){
        this.findCompany
    }

    render(){
        console.log('Company Props', this)
        return (
            <div>
                <Form>
                    <Label>
                        Select Your Current Company
                        <select onChange={(e: any) => {this.setState({userCompany: e.target.value})}}>
                        {this.state.companyOptions.map((company) => {
                            return (
                                <option key={company.id}>
                                    {company.companyName}
                                </option>
                            )
                        })}
                        </select>
                    </Label>
                </Form>
                <Button onClick={(e: any) => this.handleToggle(e.currentTarget.value)}>Add New Company</Button>
                {this.state.toggle == true ?
                    <Form style={{float: 'right'}}>
                        <h1>Add A Brand New Company</h1>
                            <div>
                                <label id="suLabel" htmlFor="companyName">Company Name</label>
                                <input id="textBox" onChange={(e)=>this.setState({companyName: e.target.value})} name = "companyName" value={this.state.companyName}/>
                            </div>
                            <select onChange={(e)=>this.setState({currency: e.target.value})}>
                                <option value="USD">USD</option>
                            </select>
                            <div>
                                <label id="suLabel" htmlFor="address">Address</label>
                                <input id="textBox" onChange={(e)=>this.setState({address: e.target.value})} name = "address" value={this.state.address}/>
                            </div>
                            <div>
                                <label id="suLabel" htmlFor="city">City</label>
                                <input id="textBox" onChange={(e)=>this.setState({city: e.target.value})} name = "city" value={this.state.city}/>
                            </div>
                            <div>
                                <label id="suLabel" htmlFor="state">State</label>
                                <input id="textBox" onChange={(e)=>this.setState({state: e.target.value})} name = "state" value={this.state.state}/>
                            </div>
                            <div>
                                <label id="suLabel" htmlFor="zip">Postal Code</label>
                                <input id="textBox" onChange={(e)=>this.setState({zip: e.target.value})} name = "zip" value={this.state.zip}/>
                            </div>
                            <Button onClick={this.addCompany}>Save Info</Button>

                    </Form>
                :
                <p></p>
                }
            </div>
        )
    }
}

export default Company;