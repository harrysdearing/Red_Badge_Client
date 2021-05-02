// import { Buffer } from 'buffer';
import React from 'react';
// import ToggleButton from '@material-ui/lab/ToggleButton';
import Button from '@material-ui/core/Button';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CustomerFetch from './CustomerFetch';
import '../style.css';

interface CustomerDeleteProps {
    sessionToken: any,
    token: string
}


interface CustomerDeleteState {
    toggle: boolean,
    dbData: any[],
    propsId: number,
    deleteId: number,
    UpdateCustomerId: any,
    UpdateCustomerName: string,
    UpdateStartDate: string,
    UpdateExpDate: string,
    UpdateBillingCycle: string
}

class CustomerDelete2 extends React.Component <CustomerDeleteProps, CustomerDeleteState>{
    constructor(props: CustomerDeleteProps){
        super(props)
        this.state = {
            toggle: false,
            dbData: [],
            propsId: 0,
            deleteId: 0,
            UpdateCustomerId: 0,
            UpdateCustomerName: '',
            UpdateStartDate: '',
            UpdateExpDate: '',
            UpdateBillingCycle: ''    
        }
    }
    
    Customer = () => {
        fetch(`http://localhost:3000/customer/getcustomer`, {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": this.props.sessionToken
            }),
        })
        .then((res) => res.json())
        .then((json) => {
            this.setState({dbData: json.data});
        })
    }

    handleClose = () => {
        this.setState({toggle: !this.state.toggle})
    }

    handleUpdateCustomer = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        fetch(`http://localhost:3000/customer/updatecustomer/${this.state.propsId}`, {
            method: 'PUT',
            body: JSON.stringify({
                customer: {
                    customerId: this.state.UpdateCustomerId,
                    customerName: this.state.UpdateCustomerName,
                    startDate: this.state.UpdateStartDate,
                    expDate: this.state.UpdateExpDate,
                    billingCycle: this.state.UpdateBillingCycle
                }
            }),
            headers: new Headers ({
                "Content-Type": "application/json",
                "Authorization": this.props.sessionToken
            })
        })
        .then((res) => res.json())
        .then((json) => {
            this.handleClose();
            this.Customer();
            console.log('Successfully updated', json)
        })
      }
    

    handleDelete = (array: any) => {
      fetch(`http://localhost:3000/customer/deletecustomer/${array.id}`, {
          method: 'DELETE',
          headers: new Headers ({
              "Content-Type": "application/json",
              "Authorization": this.props.sessionToken
          })
        })
        .then(() => {

          this.Customer()
        })
        .catch((error) => console.log('Why are you not deleting?', error))
    }


    componentWillMount(){
        this.Customer();
        this.handleUpdateCustomer;
    }

    componentWillUnmount(){
        this.Customer();
        this.handleUpdateCustomer;
    }

    render(){
        return (
            <div>
                <h1>Completed Customers</h1>
                    <Table>
                        <TableHead color="inherit" >
                            <TableRow>
                                <TableCell>Customer ID</TableCell>
                                <TableCell>Customer Name</TableCell>
                                <TableCell>Contract Start Date</TableCell>
                                <TableCell>Contract End Date</TableCell>
                                <TableCell>Billing Cycle</TableCell>
                                <TableCell>Save Info</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.dbData.map((array: any, index: any) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <p>{array.customerId}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p>{array.customerName}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p>{array.startDate}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p>{array.expDate}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p>{array.billingCycle}</p>
                                        </TableCell>
                                        <TableCell>
                                            <Button 
                                            onClick={() => this.setState({
                                                toggle: true,
                                                UpdateCustomerId: array.customerId,
                                                UpdateCustomerName: array.customerName,
                                                UpdateStartDate: array.startDate,
                                                UpdateExpDate: array.expDate,
                                                UpdateBillingCycle: array.billingCycle,
                                                propsId: array.id
                                            })
                                            }
                                            variant="contained" color="primary">
                                            UPDATE DATA
                                            </Button>
                                            <Modal
                                            aria-labelledby="transition-modal-title"
                                            aria-describedby="transition-modal-description"
                                            open={this.state.toggle}
                                            onClose={this.handleClose}
                                            closeAfterTransition
                                            BackdropComponent={Backdrop}
                                            BackdropProps={{
                                            timeout: 500,
                                            }}
                                            >
                                                <Fade in={this.state.toggle}>
                                                <form style={{backgroundColor: 'white', justifyContent: 'center'}}>
                                                    <h1>Update Customer</h1>
                                                    <div>
                                                        <label id="suLabel" htmlFor="CustomerId">Update Customer Id</label>
                                                        <input name="UpdateCustomerId" onChange={(e)=>this.setState({UpdateCustomerId: e.target.value})} value={this.state.UpdateCustomerId}/>
                                                    </div>
                                                    <div>
                                                        <label id="suLabel" htmlFor="CustomerName">Update Customer Name</label>
                                                        <input id="TextBox" name="UpdateCustomerName" onChange={(e)=>this.setState({UpdateCustomerName: e.target.value})} value={this.state.UpdateCustomerName}/>
                                                    </div>
                                                    <div>
                                                        <label id="suLabel" htmlFor="UpdateStartDate">Update Start Date</label>
                                                        <input id="textBox" name = "UpdateStartDate" onChange={(e)=>this.setState({UpdateStartDate: e.target.value})} value={this.state.UpdateStartDate}/>
                                                    </div>
                                                    <div>
                                                        <label id="suLabel" htmlFor="UpdateExpDate">Update DCA Company Name</label>
                                                        <input id="textBox" name = "UpdateExpDate" onChange={(e)=>this.setState({UpdateExpDate: e.target.value})} value={this.state.UpdateExpDate}/>
                                                    </div>
                                                    <div>
                                                        <label id="suLabel" htmlFor="UpdateBillingCycle">Update DCA Company Name</label>
                                                        <input id="textBox" name = "UpdateBillingCycle" onChange={(e)=>this.setState({UpdateBillingCycle: e.target.value})} value={this.state.UpdateBillingCycle}/>
                                                    </div>
                                                    <br/>
                                                    <Button onClick={this.handleUpdateCustomer} variant="contained" color="primary">Update Info</Button>
                                                    <Button onClick={this.handleClose} variant="contained" color="secondary">Close</Button>
                                                </form>
                                                </Fade>
                                            </Modal>
                                            <Button onClick={() => this.handleDelete(array)}
                                            variant="contained" color="secondary">DELETE
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    <CustomerFetch sessionToken={this.props.sessionToken} customer={this.Customer} token={this.props.token}/>
              </div>
        )
    }
  }

  export default CustomerDelete2;