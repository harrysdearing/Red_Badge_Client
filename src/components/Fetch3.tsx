// import { Buffer } from 'buffer';
import React from 'react';
import PrinterFetch from './PrintersFetch';


interface FetchProps {
}


interface FetchState {
    customerData: any,
    finalArray: any,
    customers: string[],
    customerId: number[],
    startDate: any,
    endDate: any,
    cycle: string,
    token: string,
    testData: any
}

class EKM_Fetch extends React.Component <FetchProps, FetchState>{
    constructor(props: FetchProps){
        super(props)
        this.state = {
            customerData: [],
            finalArray: [],
            customers: [],
            customerId: [],
            startDate: '',
            endDate: '',
            cycle: '',
            token: '',
            testData: ''
        }
        // this.handleStartDate = this.handleStartDate.bind(this);
        // this.handleEndDate = this.handleEndDate.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    EKMFetch = () => {

        const base64ToStringNew = 'Basic MzdkMTE3YzcyZDU1NDc5NGJlYjU5MGJhNGEzNDAyMmY6RXhidUZ0OGw0MHlDZnoyQTRIS3ozU2hVSzdLc3ZvNnVFUUdNcTJFcHhWN2FWUTVoblZtVmtLWUVnWjZjZVJOMQ=='
        // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzN2QxMTdjNzJkNTU0Nzk0YmViNTkwYmE0YTM0MDIyZiIsImV4cCI6MTYxNzY3NDU5NX0.RC0dULGO1Oq230RsgfAAEETlLBxyvSmzLNsIodJgd11L05UacFF2oguEYpP8g2nXSRkFd5hBck5RJoiyTxgR7w';
        // const token = base64ToStringNew;
        let myHeadersLogin = new Headers();
        myHeadersLogin.append("Accept", "application/json");
        myHeadersLogin.append("Authorization", base64ToStringNew);

        let requestOptionsLogin: any = {
            method: 'POST',
            headers: myHeadersLogin,
            redirect: 'follow'

        };
        fetch('https://insight.axessmps.com/PortalAPI/login', requestOptionsLogin)
        .then(responses => responses.json())
        .then(results => {
            this.setState({token: results.access_token})
            let myHeadersCustomers = new Headers();
            myHeadersCustomers.append("Accept", "application/json");
            myHeadersCustomers.append("Authorization", `Bearer ${this.state.token}`);
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
                    result.map((info: any) => {
                    this.state.customerData.push({customers: info.name, customerId: info.customerId, groupId: info.groupId, address: info.address, city: info.city, country: info.country, zip: info.zip, startDate: '', expDate: '', billingCycle: 'Monthly'});
                    this.setState({
                         customers: info.customers,
                         customerId: info.customerId
                    })
                 })
                })
            .catch(error => console.log('error', error));
        })
    }


    // handleStartDate = ( event: React.ChangeEvent<HTMLInputElement>): void => {
    //     this.setState({startDate: event.currentTarget.value})
    //     console.log('state', this.state.startDate);
    //     this.state.startDate.push(event.currentTarget.value)
    //     console.log('What is the new start date array', this.state.startDate)
    // }

    // handleEndDate = ( event: React.ChangeEvent<HTMLInputElement>): void => {
    //     this.state.endDate.push(event.currentTarget.value)
    // }

    handleSave = ( event: React.MouseEvent<HTMLButtonElement> ): void => {
        event.preventDefault();
        this.state.finalArray.push({
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            cycle: this.state.cycle
        })
        console.log('Save button', this.state.finalArray);
    }
    

    componentDidMount(){
        this.EKMFetch();
        // this.handleStartDate;
        // this.handleEndDate;
        this.handleSave;
    }

    render(){
        console.log('state', this.state.startDate)
        return (
            <div>
                <h1>Fetching EKM API</h1>
                {this.state.customerData.map((groups: any, index: any) => {
                    return (
                        <form key={index}>
                            <p>{groups.customers}</p>
                            <label>Enter Contract Start Date</label>
                            <input type="text" placeholder="Contract Start Date" name="startDate" onChange={(e) => this.setState({startDate: e.target.value})}
                            />
                            <input type="text" placeholder="Contract End Date" name="endDate" onChange={(e) => this.setState({endDate: e.target.value})}/> 
                            <select onChange={(e) => this.setState({cycle: e.target.value})}>
                                <option value="Monthly">Monthly</option>
                                <option value="Quarterly">Quarterly</option>
                            </select>
                            <button onClick={this.handleSave}>Save Data</button>
                        </form>
                    )
                })}
                <PrinterFetch customerArray={this.state.customerData} token={this.state.token}/>
            </div>
        );
    }

}

        
export default EKM_Fetch;