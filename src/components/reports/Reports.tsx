import React, {useState, useEffect} from 'react';
import FlatTable from './FlatTable';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Menu from '@material-ui/core/Menu';

interface ReportProps {
    sessionToken: any,
    token: string
}

const Reports: React.FC<ReportProps> = (props: ReportProps) =>{
    const [dbData, setDBData] = useState([]);
    const [period, setPeriod] = useState('');

    const Customer = () => {
        fetch(`http://localhost:3000/customer/getcustomer`, {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": props.sessionToken
            }),
        })
        .then((res) => res.json())
        .then((json) => {
            setDBData(json.data);
        })
    }

    useEffect(() => {
        Customer()
    }, [])
    



    return(
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl">
                <h2 className="siglog">Reports</h2> 
                <FlatTable sessionToken={props.sessionToken} token={props.token} customers={dbData} getCustomers={Customer}/> 
            </Container>
        </React.Fragment>
    )
}

export default Reports;
