import React, {useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

interface ReportProps {
    sessionToken: any,
    token: string
}

const Reports: React.FC<ReportProps> = (props: ReportProps) =>{

    const PrinterFetch = () => {

            fetch(`http://localhost:3000/printer/getprinters`, {
                method: 'GET',
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": props.sessionToken
                }),
            })
            .then((res) => res.json())
            .then((json) => {
                console.log('What am i getting back', json)
            })
            .catch((error) => {
                console.log('Why are there no printers', error);
            })
    }

    useEffect(() => {
        PrinterFetch()
    }, [])
    



    return(
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl">
                <h2 className="siglog">Reports</h2>  
            </Container>
        </React.Fragment>
    )
}

export default Reports;
