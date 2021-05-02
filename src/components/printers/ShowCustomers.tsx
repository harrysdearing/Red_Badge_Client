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
    printerArray: any[]

}

class ShowCustomers extends React.Component <ShowCustomersProps, ShowCustomersState>{
  constructor(props: ShowCustomersProps){
    super(props)
    this.state = {
        customer: [],
        getCustomerId: '',
        getCustomer: '',
        initialId: '',
        printerArray: []
    }
    this.getCustomer = this.getCustomer.bind(this);
  }
  getCustomer () {
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
        this.setState({initialId: 'Customer Selected', printerArray: json})
    })
    .catch((error) => {
        this.setState({initialId: 'Please select a customer above!'})
    });
}

renderPrinters = (names: any) => {
    this.setState({getCustomerId: names.customerId})
    this.PrinterFetch();
}

  componentWillMount(){
      this.getCustomer();
    //   this.PrinterFetch();
  }

  componentWillUnmount(){
      this.getCustomer();
    //   this.PrinterFetch();
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
                <PrinterTable sessionToken={this.props.sessionToken} token={this.props.token} customerDB={this.state.customer} printerFetch={this.state.printerArray} getCustomer={this.getCustomer} getFetch={this.PrinterFetch}/>
                }
            </div>
        </div>
    )
  }
}

export default ShowCustomers;