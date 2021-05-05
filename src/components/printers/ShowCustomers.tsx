import React from "react";
import PrinterTable from './PrinterTable';
import Button from '@material-ui/core/Button';

interface ShowCustomersProps {
    sessionToken: any,
    token: any
}

interface ShowCustomersState {
    customer: any[],
    getCustomerId: any,
    getCustomer: any,
    initialId: string,
    printerArray: any[],
    printerTable: any[]

}

class ShowCustomers extends React.Component <ShowCustomersProps, ShowCustomersState>{
  constructor(props: ShowCustomersProps){
    super(props)
    this.state = {
        customer: [],
        getCustomerId: '',
        getCustomer: '',
        initialId: '',
        printerArray: [],
        printerTable: []
    }
  }
  getCustomer = () => {
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
        this.setState({customer: json.data});
    })
}

PrinterFetch = () => {

    if (this.state.getCustomerId !== ''){
        fetch(`http://localhost:3000/printer/getallprinters/${this.state.getCustomerId}`, {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": this.props.sessionToken
            }),
        })
        .then((res) => res.json())
        .then((json) => {
            this.setState({printerTable: json})
            this.PrinterFetch();
        })
        .catch((error) => {
            console.log('Why are there no printers', error);
        })

    let myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${this.props.token}`);
    myHeaders.append("Cookie", "JSESSIONID=8BD372F56EA832409B38F5DFA008757B");

    var requestOptions: any = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    // fetch("https://insight.axessmps.com/PortalAPI/api/devices/meters/2?billingDate=2021-03-13", requestOptions)  this is the fetch for the meters
    fetch(`https://insight.axessmps.com/PortalAPI/api/devices?customerId=${this.state.getCustomerId}&includeExtendedFields=true`, requestOptions)
    .then(response => response.json())
    .then(json => {
        
        this.state.printerTable.filter((word) => !json.customerId.includes(word))
        this.setState({initialId: 'Customer Selected', printerArray: json})
    })
    .catch((error) => {
        this.setState({initialId: 'Please select a customer above!'})
    });
}
}

Printers = () => {
    if (this.state.getCustomerId !== ''){
    fetch(`http://localhost:3000/printer/getallprinters/${this.state.getCustomerId}`, {
        method: 'GET',
        headers: new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": this.props.sessionToken
        }),
    })
    .then((res) => res.json())
    .then((json) => {
        this.setState({printerTable: json})
    })
    .catch((error) => {
        console.log('Why are there no printers', error);
    })
    }
}



renderPrinters = (names: any) => {
    this.setState({getCustomerId: names.customerId})
    this.PrinterFetch();
}

  componentWillMount(){
      this.getCustomer();
  }

  componentWillUnmount(){
      this.getCustomer();
  }

  render(){
    return (
        <div>
            <h1>Add Pricing For Printers</h1>
            {this.state.customer.map((names: any) => {
                return (
                    <div key={names.id}>
                        <Button variant="contained" color="default" onClick={() => {this.renderPrinters(names)}}>{names.customerName}</Button>
                    </div>
                )
            })
            }
            <div>
                {this.state.initialId == 'Please select a customer above!' ?
                <h2>Please double click on a customer from the list above.  If there are no customers, please add them from the customers tab.</h2>
                :
                <div>
                    <PrinterTable sessionToken={this.props.sessionToken} token={this.props.token} customerDB={this.state.customer} printerFetch={this.state.printerArray} getCustomer={this.getCustomer} getFetch={this.PrinterFetch} customerId={this.state.getCustomerId} printerTable={this.state.printerTable} renderPrinters={this.Printers}/>
                </div>
                }
            </div>
        </div>
    )
  }
}

export default ShowCustomers;