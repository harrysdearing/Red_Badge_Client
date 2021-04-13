import React from 'react';


interface PrinterProps {
    customerArray: any[],
    token: string
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
        myHeaders.append("Authorization", `Bearer ${this.props.token}`);
        myHeaders.append("Cookie", "JSESSIONID=8BD372F56EA832409B38F5DFA008757B");

        var requestOptions: any = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("https://insight.axessmps.com/PortalAPI/api/devices/meters/8", requestOptions)
        .then(response => response.json())
        .then(result => {
                // console.log('Printer Data', result);
        })
        .catch(error => console.log('error', error));
    }
    

    componentDidMount(){
        this.PrinterFetch()
    }

    render(){
        // this.PrinterFetch()
        return (
            <div>
                <h1>Printer Fetch</h1>
            </div>
        );
    }

}

        
export default PrinterFetch;