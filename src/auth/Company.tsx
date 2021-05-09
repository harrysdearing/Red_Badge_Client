import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {Modal, Button} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import APIURL from '../helpers/Environment';

interface CompanyProps {
    fN: string,
    lN: string,
    role: string,
    username: string,
    password: string,
    updateToken: any,
    sessionToken: any,
    authenticated: boolean,
    showCompany(): any
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
    companyOptions: any[],
    fN: string,
    lN: string,
    role: string,
    username: string,
    password: string,
    open: boolean,
    close: boolean
}

class Company extends React.Component <CompanyProps, CompanyState> {
    constructor(props: CompanyProps){
        super(props)
        this.state = {
            companyId: 0,
            companyName: '',
            currency: 'USD',
            address: '',
            city: '',
            state: '',
            zip: '',
            toggle: false,
            companyOptions: [],
            fN: '',
            lN: '',
            role: '',
            username: '',
            password: '',
            open: false,
            close: true
        }
    }

    handleClose = () => {
        this.setState({
            open: !this.state.open
        })
      };

      addCompany = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        fetch(`${APIURL}/company/registercompany`, {
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
            this.handleClose();
            this.props.showCompany();
        })
        .catch((err) => console.log('Company Not Added', err))
    }

    render(){
        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="sm">
                <Button onClick={() => 

                    this.setState({open: true})
                }
                variant="contained" color="primary"
                >Add New Company</Button>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={this.state.open}
                        onClose={this.handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}
                    >
                        <Container maxWidth="sm" style={{backgroundColor: '#32a8a6', margin: 'auto', color: 'white', alignContent: 'center'}}>
                        <div>
                            <h1>Add A Brand New Company</h1>
                            <div>
                                <label id="suLabel" htmlFor="companyName">Company Name</label>
                                <input id="textBox" onChange={(e)=>this.setState({companyName: e.target.value})} name = "companyName" value={this.state.companyName}/>
                            </div>
                            <select onChange={(e)=>this.setState({currency: e.target.value})} name="currency" value={this.state.currency}>
                                <option>USD</option>
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
                            <br/>
                            <Button onClick={this.addCompany} variant="contained" color="primary">Save Info</Button>
                            <Button onClick={this.handleClose} variant="contained" color="secondary">Close</Button>
                        </div>
                        </Container>
                    </Modal>
                </Container>
            </React.Fragment>
        )
    }
}

export default Company;