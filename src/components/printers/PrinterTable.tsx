// // import { Buffer } from 'buffer';
// import React from 'react';
// import FetchHeader from './FetchStyle';
// import Button from '@material-ui/core/Button';
// import Table from "@material-ui/core/Table";
// import TableRow from "@material-ui/core/TableRow";
// import TableCell from "@material-ui/core/TableCell";
// import TableBody from "@material-ui/core/TableBody";
// import './printers.css';

// interface PrinterTableProps {
//     sessionToken: any,
//     token: string,
//     customerId: number,
//     customerDB: any[],
//     printerFetch: any[],
//     printerTable: any[],
//     getCustomer(): any
// }


// interface PrinterTableState {
//     printerFetch: any[],
//     customerId: number,
//     model: string,
//     assetNumber: string,
//     serialNumber: string,
//     ipAddress: string,
//     status: string,
//     billable: boolean,
//     baseMono: number,
//     baseColor: number,
//     baseRate: any,
//     monoCPP: any,
//     colorCPP: any,
//     flatRate: any

// }

// class PrinterTable extends React.Component <PrinterTableProps, PrinterTableState>{
//     constructor(props: PrinterTableProps){
//         super(props)
//         this.state = {
//             printerFetch: this.props.printerFetch,
//             customerId: 0,
//             model: '',
//             assetNumber: '',
//             serialNumber: '',
//             ipAddress: '',
//             status: '',
//             billable: false,
//             baseMono: 0,
//             baseColor: 0,
//             baseRate: 0.00,
//             monoCPP: 0.0000,
//             colorCPP: 0.0000,
//             flatRate: 0.00
//         }
//     }

//     postPrinters = (event: React.MouseEvent<HTMLButtonElement>) => {
//         event.preventDefault()
//         fetch(`http://localhost:3000/printer/registerprinter`, {
//             method: 'POST',
//             body: JSON.stringify({
//                 printer: {
//                     printerModel: this.state.model,
//                     assetId: this.state.assetNumber,
//                     serialNumber: this.state.serialNumber,
//                     ipAddress: this.state.ipAddress,
//                     status: this.state.status,
//                     billable: this.state.billable,
//                     base_mono_volume: this.state.baseMono,
//                     base_color_volume: this.state.baseColor,
//                     base_rate: this.state.baseRate,
//                     monoPrice: this.state.monoCPP,
//                     colorPrice: this.state.colorCPP,
//                     flat_rate: this.state.flatRate,
//                     customerId: this.state.customerId
//                 }
//             }),
//             headers: new Headers ({
//                 "Content-Type": "application/json",
//                 "Authorization": this.props.sessionToken
//             })
//         })
//         .then((res) => res.json())
//         .then((json) => {
//             console.log('Printers posted', json)
//         })
//         .catch((error) => {
//             console.log('Why did the printers not post', error)
//         })
//     }

//     render(){
//         return (
//             <div>
//                 {/* <BillingTable sessionToken={this.props.sessionToken} customerId={this.props.customerId} printerTable={this.props.printerTable}/> */}
//                 <h2>Printers To Add</h2>
//                 <Table>
//                     <FetchHeader />
//                     <TableBody>
//                         { this.props.printerFetch.map((printers) => {
//                             return (
//                             <TableRow key={printers.deviceId}>
//                                 <TableCell>{printers.extendedFields.mibDescription}</TableCell>
//                                 <TableCell>{printers.assetNumber}</TableCell>
//                                 <TableCell>{printers.serialNumber}</TableCell>
//                                 <TableCell>
//                                     <input name="isBillable" type="checkbox" onChange={() => this.setState({billable: !this.state.billable, model: printers.extendedFields.mibDescription, assetNumber: printers.assetNumber, serialNumber: printers.serialNumber, ipAddress: printers.ipAddress, status: printers.monitorStatus, customerId: printers.customerId})}/>
//                                 </TableCell>
//                                 <TableCell>
//                                     <input type="number" placeholder="Enter Base Volume Mono" name="baseMono" onChange={(e) => this.setState({baseMono: Number(e.target.value)})}/>
//                                 </TableCell>
//                                 <TableCell>
//                                     <input type="number" placeholder="Enter Base Volume Color" name="baseColor" onChange={(e) => this.setState({baseColor: Number(e.target.value)})}/>
//                                 </TableCell>
//                                 <TableCell>
//                                     <input type="number" placeholder="Enter Base Rate" name="baseRate" onChange={(e) => this.setState({baseRate: parseFloat(e.target.value).toFixed(2)})}/>
//                                 </TableCell>
//                                 <TableCell>
//                                     <input type="number" placeholder="Enter Mono CPP" name="monoCPP" onChange={(e) => this.setState({monoCPP: parseFloat(e.target.value).toFixed(4)})}/>
//                                 </TableCell>
//                                 <TableCell>
//                                     <input type="number" placeholder="Enter Color CPP" name="colorCPP" onChange={(e) => this.setState({colorCPP: parseFloat(e.target.value).toFixed(4)})}/>
//                                 </TableCell>
//                                 <TableCell>
//                                     <input type="number" placeholder="Enter Flat Rate" name="flatRate" onChange={(e) => this.setState({flatRate: parseFloat(e.target.value).toFixed(2)})}/>
//                                 </TableCell>
//                                 <TableCell>
//                                     <Button onClick={this.postPrinters} variant="contained" color="primary">Save Data</Button>
//                                 </TableCell>
//                             </TableRow>
//                             )
//                         })}
//                     </TableBody>
//                 </Table>
//             </div>
//         )
//     }
// }

// export default PrinterTable;