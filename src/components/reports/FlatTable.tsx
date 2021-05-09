import React, {useState, useEffect} from 'react';
import FlatHeader from './FlatHeader';
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import './reports.css';

interface FlatTableProps {
    sessionToken: any,
    token: string,
    customers: any[],
    getCustomers(): any
}

interface FlatTableState {
    array: any[],
    flatData: any[],
    test: any[],
    price: any[]
}


class FlatTable extends React.Component <FlatTableProps, FlatTableState>{
    constructor(props: FlatTableProps){
      super(props)
      this.state = {
          array: [],
          flatData: [],
          test: [],
          price: []

      }
    }
    PrinterFetch = () => {

        fetch(`http://localhost:3000/printer/getprinters`, {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": this.props.sessionToken
            }),
        })
        .then((res) => res.json())
        .then((json: any) => {

            json.data.map((flatPrice: any, index: any) => {
                this.props.customers.map((customername) => {

                if (index > -1 && flatPrice.customerId > 0){
                    if (flatPrice.customerId == customername.customerId){
                    this.state.array.push({customerId: flatPrice.customerId, flatRate: flatPrice.flat_rate, id: flatPrice.id, customerName: customername.customerName});
                    let uniqueArr = this.state.array;
                        result = Object.values(uniqueArr.reduce((r,o) => {
                            r[o.id] = o;
                            return r;
                        },{}));
                    this.setState({flatData: result})
               

                var helper: any = {};
                var result: any = this.state.flatData.reduce(function(r, o) {
                var key: any = o.customerId;
                
                if(!helper[key]) {
                    helper[key] = Object.assign({}, o); // create a copy of o
                    r.push(helper[key]);
                } else {
                    if (o.flatRate > 0){
                        helper[key].flatRate += o.flatRate;
                    } else {
                        helper[key].flatRate += 0;
                    }
                }
                return r;
                }, []);

                this.setState({price: result})
            }
            }
            })
            })

        })
        .catch((error) => {
            console.log('Why are there no printers', error);
        })
    }

    componentWillMount(){
        this.props.getCustomers();
        this.PrinterFetch();
    }
    componentWillUnmount(){
        this.props.getCustomers();
        this.PrinterFetch();
    }
  
    render(){

    return(
        <div>
            <h1 className="siglog">Flat Rate Billing Table</h1>  
            <Table>
                <FlatHeader />
                <TableBody>
                {this.state.price.map((name: any) => {
                    return (
                        <TableRow key={name.id}>
                            <TableCell>{name.customerId}</TableCell>
                            <TableCell>{name.customerName}</TableCell>
                            <TableCell>{name.flatRate}</TableCell>
                        </TableRow>
                    )
                })}
                </TableBody>
            </Table>
        </div>
    )
}
}

export default FlatTable;