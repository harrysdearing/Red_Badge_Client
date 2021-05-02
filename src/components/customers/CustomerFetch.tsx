// import { Buffer } from 'buffer';
import React from 'react';
import Button from '@material-ui/core/Button';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import '../style.css';

interface FetchProps {
    sessionToken: any,
    customer(): any,
    token: string
}


interface FetchState {
    token: string,
    customerData: any[],
    customers: string[],
    customerId: number[],
    finalArray: any[],
    startDate: string,
    expDate: string,
    customerName: string,
    customerIdRow: number,
    cycle: string
}

class CustomerFetch extends React.Component <FetchProps, FetchState>{
    constructor(props: FetchProps){
        super(props)
        this.state = {
            token: '',
            customerData: [],
            customers: [],
            customerId: [],
            finalArray: [],
            startDate: '',
            expDate: '',
            customerName: '',
            customerIdRow: 0,
            cycle: 'Monthly'
        }
    }
    

    Fetch = () => {
            let myHeadersCustomers = new Headers();
            myHeadersCustomers.append("Accept", "application/json");
            myHeadersCustomers.append("Authorization", `Bearer ${this.props.token}`);
            myHeadersCustomers.append("Cookie", "JSESSIONID=8BD372F56EA832409B38F5DFA008757B");

            let requestOptions: any = {
            method: 'GET',
            headers: myHeadersCustomers,
            redirect: 'follow'
            };

            fetch("https://insight.axessmps.com/PortalAPI/api/customers", requestOptions)
            .then(response => response.json())
            .then(result => 
                {
                    this.props.customer()
                    result.map((info: any) => {
                    this.state.customerData.push({customers: info.name, customerId: info.customerId, groupId: info.groupId, address: info.address, city: info.city, country: info.country, zip: info.zip, startDate: '', expDate: '', billingCycle: 'Monthly'});
                    this.setState({
                         customers: info.customers,
                         customerId: info.customerId
                    })
                 })
                })
            .catch(error => console.log('error', error));
    }

    handleSave = ( event: React.MouseEvent<HTMLButtonElement> ) => {
        event.preventDefault();
        fetch(`http://localhost:3000/customer/registercustomer`, {
            method: 'POST',
            body: JSON.stringify({
                customer: {
                    startDate: this.state.startDate,
                    expDate: this.state.expDate,
                    billingCycle: this.state.cycle,
                    customerName: this.state.customerName,
                    customerId: this.state.customerIdRow
                }
            }),
            headers: new Headers ({
                "Content-Type": "application/json",
                "Authorization": this.props.sessionToken
            })
        })
        .then((res) => res.json())
        .then((json) => {
            this.props.customer()
            console.log('Customer Info Posted', json);
        })
        this.state.finalArray.push({
            startDate: this.state.startDate,
            expDate: this.state.expDate,
            cycle: this.state.cycle,
            customerName: this.state.customerName,
            customerIdRow: this.state.customerIdRow
        })
    }

    componentDidMount(){
        this.Fetch();
    }

    componentWillUnmount(){
        this.Fetch();
    }

    render(){
        return (
            <div>
                <h1>Customers To Add</h1>
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
                            {this.state.customerData.map((groups: any) => {
                                return (
                                    <TableRow key={groups.customerId}>
                                        <TableCell>
                                            <p>{groups.customerId}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p>{groups.customers}</p>
                                        </TableCell>
                                        <TableCell>
                                            <input type="date" placeholder="Enter Start Date" name="startDate" onChange={(e) => this.setState({startDate: e.target.value, customerName: groups.customers, customerIdRow: groups.customerId})}/>
                                        </TableCell>
                                        <TableCell>
                                            <input type="date" placeholder="Enter End Date" name="endDate" onChange={(e) => this.setState({expDate: e.target.value})}/> 
                                        </TableCell>
                                        <TableCell>
                                            <select onChange={(e) => this.setState({cycle: e.target.value})}>
                                                <option>Monthly</option>
                                                <option>Quarterly</option>
                                            </select>
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={this.handleSave} variant="contained" color="primary">Save Data</Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
            </div> 
        );
    }

}

        
export default CustomerFetch;
