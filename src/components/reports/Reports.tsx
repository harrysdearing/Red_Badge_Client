import React, {useState, useEffect} from 'react';
import FlatTable from './FlatTable';
import APIURL from '../../helpers/Environment';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

interface ReportProps {
    sessionToken: any,
    token: string
}

const Reports: React.FC<ReportProps> = (props: ReportProps) =>{
    const [dbData, setDBData] = useState([]);

    const Customer = () => {
        fetch(`${APIURL}/customer/getcustomer`, {
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
