import React from 'react';


interface PrinterProps {
    // customerArray: any[],
    // token: string
}


interface PrinterState {
    customerData: any,
    finalArray: any,
    customers: string[],
    customerId: number[],
    startDate: any
}

class PrinterFetch extends React.Component <PrinterProps, PrinterState>{
    constructor(props: PrinterProps){
        super(props)
        this.state = {
            customerData: [],
            finalArray: [],
            customers: [],
            customerId: [],
            startDate: ''
        }
    }

    PrinterFetch = () => {
        // const api_key = '37d117c72d554794beb590ba4a34022f';
        // const secret = 'ExbuFt8l40yCfz2A4HKz3ShUK7Ksvo6uEQGMq2EpxV7aVQ5hnVmVkKYEgZ6ceRN1';
        // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzN2QxMTdjNzJkNTU0Nzk0YmViNTkwYmE0YTM0MDIyZiIsImV4cCI6MTYxNzY3NDU5NX0.RC0dULGO1Oq230RsgfAAEETlLBxyvSmzLNsIodJgd11L05UacFF2oguEYpP8g2nXSRkFd5hBck5RJoiyTxgR7w';
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        // myHeaders.append("Authorization", `Bearer ${this.props.token}`);
        myHeaders.append("Authorization", `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzN2QxMTdjNzJkNTU0Nzk0YmViNTkwYmE0YTM0MDIyZiIsImV4cCI6MTYxODUyNTUxMH0.3vOyH2vzG2Vl6a12XzpitH5426xyDuQI1dkVA0j3j3Cb7cBLqvQaD1IYzSyD2HT0WEvkpiITuxYElBABk2snEA`);
        myHeaders.append("Cookie", "JSESSIONID=8BD372F56EA832409B38F5DFA008757B");

        var requestOptions: any = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        // fetch("https://insight.axessmps.com/PortalAPI/api/devices?customerId=2&includeExtendedFields=true", requestOptions)  this is the fetch for the devices
        fetch("https://insight.axessmps.com/PortalAPI/api/devices/meters/2?billingDate=2021-03-13", requestOptions)
        .then(response => response.json())
        .then(result => {
                console.log('Printer Data', result);
        })
        .catch(error => console.log('error', error));
    }
    

    componentDidMount(){
        this.PrinterFetch()
    }

    render(){
        return (
            <div>
                <h1>Printer Fetch</h1>
            </div>
        );
    }

}

        
export default PrinterFetch;