// import { Buffer } from 'buffer';
import React from 'react';
import Button from '@material-ui/core/Button';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import '../style.css';

interface PrinterTableProps {
    sessionToken: any,
    token: string,
    customerDB: any[],
    printerFetch: any[]
}


interface PrinterTableState {
    printerFetch: any[]

}

class PrinterTable extends React.Component <PrinterTableProps, PrinterTableState>{
    constructor(props: PrinterTableProps){
        super(props)
        this.state = {
            printerFetch: this.props.printerFetch
        }
    }

    render(){
        return (
            <div>
                <h2>Printers To Add</h2>
                <Table>
                    <TableHead color="inherit" >
                        <TableRow>
                            <TableCell>Printer Model</TableCell>
                            <TableCell>Asset Number</TableCell>
                            <TableCell>Serial Number</TableCell>
                            <TableCell>Is Printer Billable?</TableCell>
                            <TableCell>Base Volume Mono</TableCell>
                            <TableCell>Base Volume Color</TableCell>
                            <TableCell>Base Rate</TableCell>
                            <TableCell>Mono CPP</TableCell>
                            <TableCell>Color CPP</TableCell>
                            <TableCell>Flat Rate</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { this.props.printerFetch.map((printers) => {
                            return (
                            <TableRow>
                                <TableCell>{printers.extendedFields.mibDescription}</TableCell>
                                <TableCell>{printers.assetNumber}</TableCell>
                                <TableCell>{printers.serialNumber}</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default PrinterTable;