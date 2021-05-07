import React from "react";
// import PrinterTable from './PrinterTable';
import FetchHeader from './FetchStyle';
import Header from './TableStyles';
import Button from '@material-ui/core/Button';
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './printers.css';


interface ShowCustomersProps {
    sessionToken: any,
    token: any
}

interface ShowCustomersState {
    customer: any[],
    getCustomerId: any,
    getCustomer: any,
    initialId: string,
    printerArray: any[],
    printerTable: any[],
    postCustomerId: string,
    model: string,
    assetNumber: string,
    serialNumber: string,
    ipAddress: string,
    status: string,
    billable: boolean,
    baseMono: number,
    baseColor: number,
    baseRate: any,
    monoCPP: any,
    colorCPP: any,
    flatRate: any,
    toggle: boolean,
    UpdatePrinterModel: string,
    UpdateAssetNumber: string,
    UpdateSerialNumber: string,
    UpdateBillable: string,
    UpdateBaseMono: number,
    UpdateBaseColor: number,
    UpdateBaseRate: number,
    UpdateMonoCPP: number,
    UpdateColorCPP: number,
    UpdateFlatRate: number,
    printerId: string

}

class ShowCustomers extends React.Component <ShowCustomersProps, ShowCustomersState>{
  constructor(props: ShowCustomersProps){
    super(props)
    this.state = {
        customer: [],
        getCustomerId: '',
        getCustomer: '',
        initialId: '',
        printerArray: [],
        printerTable: [],
        postCustomerId: '',
        model: '',
        assetNumber: '',
        serialNumber: '',
        ipAddress: '',
        status: '',
        billable: false,
        baseMono: 0,
        baseColor: 0,
        baseRate: 0.00,
        monoCPP: 0.0000,
        colorCPP: 0.0000,
        flatRate: 0.00,
        toggle: false,
        UpdatePrinterModel: '',
        UpdateAssetNumber: '',
        UpdateSerialNumber: '',
        UpdateBillable: '',
        UpdateBaseMono: 0,
        UpdateBaseColor: 0,
        UpdateBaseRate: 0.00,
        UpdateMonoCPP: 0.0000,
        UpdateColorCPP: 0.0000,
        UpdateFlatRate: 0.00,
        printerId: ''
    }
  }
  getCustomer = () => {
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

PrinterFetch = (customerId: string) => {

    if (customerId !== '' ){
        fetch(`http://localhost:3000/printer/getallprinters/${customerId}`, {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": this.props.sessionToken
            }),
        })
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                printerTable: json,
                getCustomerId: customerId
            })
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
                
                // this.state.printerTable.filter((word) => !json.customerId.includes(word))
                this.setState({initialId: 'Customer Selected', printerArray: json})
            })
            .catch((error) => {
                this.setState({initialId: 'Please select a customer above!'})
            });
        })
        .catch((error) => {
            console.log('Why are there no printers', error);
        })
    }
}

renderPrinters = (names: any) => {
    console.log('what are the names', names);
    this.PrinterFetch(names.customerId);
}

handleClose = () => {
    this.setState({toggle: !this.state.toggle})
}

postPrinters = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    fetch(`http://localhost:3000/printer/registerprinter`, {
        method: 'POST',
        body: JSON.stringify({
            printer: {
                printerModel: this.state.model,
                assetId: this.state.assetNumber,
                serialNumber: this.state.serialNumber,
                ipAddress: this.state.ipAddress,
                status: this.state.status,
                billable: this.state.billable,
                base_mono_volume: this.state.baseMono,
                base_color_volume: this.state.baseColor,
                base_rate: this.state.baseRate,
                monoPrice: this.state.monoCPP,
                colorPrice: this.state.colorCPP,
                flat_rate: this.state.flatRate,
                customerId: this.state.postCustomerId
            }
        }),
        headers: new Headers ({
            "Content-Type": "application/json",
            "Authorization": this.props.sessionToken
        })
    })
    .then((res) => res.json())
    .then((json) => {
        this.PrinterFetch(this.state.postCustomerId);
    })
    .catch((error) => {
        console.log('Why did the printers not post', error)
    })
}

handleUpdatePrinters = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    fetch(`http://localhost:3000/printer/updateprinter/${this.state.printerId}`, {
        method: 'PUT',
        body: JSON.stringify({
            printer: {
                printerModel: this.state.UpdatePrinterModel,
                assetId: this.state.UpdateAssetNumber,
                serialNumber: this.state.UpdateSerialNumber,
                billable: this.state.UpdateBillable,
                base_mono_volume: this.state.UpdateBaseMono,
                base_color_volume: this.state.UpdateBaseColor,
                base_rate: this.state.UpdateBaseRate,
                monoPrice: this.state.UpdateMonoCPP,
                colorPrice: this.state.UpdateColorCPP,
                flat_rate: this.state.UpdateFlatRate
            }
        }),
        headers: new Headers ({
            "Content-Type": "application/json",
            "Authorization": this.props.sessionToken
        })
    })
    .then((res) => res.json())
    .then((json) => {
        this.handleClose();
        this.PrinterFetch(this.state.getCustomerId);
    })
  }


handleDelete = (data: any) => {
  fetch(`http://localhost:3000/printer/deleteprinter/${data.id}`, {
      method: 'DELETE',
      headers: new Headers ({
          "Content-Type": "application/json",
          "Authorization": this.props.sessionToken
      })
    })
    .then((json) => {
        this.PrinterFetch(this.state.getCustomerId);
        console.log('Deleted printers', json)
    })
    .catch((error) => console.log('Why are you not deleting?', error))
}



  componentWillMount(){
      this.getCustomer();
  }

  componentWillUnmount(){
      this.getCustomer();
  }

  render(){
    return (
        <div>
            <h3>Select One Of Your Customers</h3>
            {this.state.customer.map((names: any) => {
                return (
                    <div key={names.id}>
                        <Button variant="contained" color="primary" style={{justifyContent: 'center', margin: 'auto', fontWeight: 'bold', fontSize: '24px'}} onClick={() => {this.renderPrinters(names)}}>{names.customerName}</Button>
                    </div>
                )
            })
            }
            <div>
                {this.state.initialId == 'Please select a customer above!' ?
                <h2>Please click on a customer from the list above.  If there are no customers, please add them from the customers tab.</h2>
                :                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                <div>
                    <div>
                        <h1 id="headerFix">Printers Ready For Billing</h1>
                        <Table>
                            <Header />
                            <TableBody>
                                {this.state.printerTable.map((data: any) => {
                                    if (data.customerId == this.state.getCustomerId){
                                    return (
                                        <TableRow key={data.id}>
                                            <TableCell>
                                                <p>{data.printerModel}</p>
                                            </TableCell>
                                            <TableCell>
                                                <p>{data.assetId}</p>
                                            </TableCell>
                                            <TableCell>
                                                <p>{data.serialNumber}</p>
                                            </TableCell>
                                            <TableCell>
                                                <p>{data.billable}</p>
                                            </TableCell>
                                            <TableCell>
                                                <p>{data.base_mono_volume}</p>
                                            </TableCell>
                                            <TableCell>
                                                <p>{data.base_color_volume}</p>
                                            </TableCell>
                                            <TableCell>
                                                <p>{data.base_rate}</p>
                                            </TableCell>
                                            <TableCell>
                                                <p>{data.monoPrice}</p>
                                            </TableCell>
                                            <TableCell>
                                                <p>{data.colorPrice}</p>
                                            </TableCell>
                                            <TableCell>
                                                <p>{data.flat_rate}</p>
                                            </TableCell>
                                            <TableCell>
                                                <Button onClick={() => this.setState({
                                                    toggle: true,
                                                    UpdatePrinterModel: data.printerModel,
                                                    UpdateAssetNumber: data.assetId,
                                                    UpdateSerialNumber: data.serialNumber,
                                                    UpdateBillable: data.billable,
                                                    UpdateBaseMono: data.base_mono_volume,
                                                    UpdateBaseColor: data.base_color_volume,
                                                    UpdateBaseRate: data.base_rate,
                                                    UpdateMonoCPP: data.monoPrice,
                                                    UpdateColorCPP: data.colorPrice,
                                                    UpdateFlatRate: data.flat_rate,
                                                    printerId: data.id
                                                })
                                                }
                                                variant="contained" color="primary">Update</Button>
                                                <Modal
                                                aria-labelledby="transition-modal-title"
                                                aria-describedby="transition-modal-description"
                                                open={this.state.toggle}
                                                onClose={this.handleClose}
                                                closeAfterTransition
                                                BackdropComponent={Backdrop}
                                                BackdropProps={{
                                                timeout: 500,
                                                }}
                                                >
                                                    <Fade in={this.state.toggle}>
                                                    <form style={{backgroundColor: 'white', justifyContent: 'center'}}>
                                                        <h1>Update Printers</h1>
                                                        <div>
                                                            <label id="suLabel" htmlFor="UpdatePrinterModel">Update Printer Model</label>
                                                            <input name="UpdatePrinterModel" onChange={(e)=>this.setState({UpdatePrinterModel: e.target.value})} value={this.state.UpdatePrinterModel}/>
                                                        </div>
                                                        <div>
                                                            <label id="suLabel" htmlFor="AssetNumber">Update Asset Number</label>
                                                            <input id="TextBox" name="UpdateAssetNumber" onChange={(e)=>this.setState({UpdateAssetNumber: e.target.value})} value={this.state.UpdateAssetNumber}/>
                                                        </div>
                                                        <div>
                                                            <label id="suLabel" htmlFor="UpdateSerialNumber">Update Serial Number</label>
                                                            <input id="textBox" name = "UpdateSerialNumber" onChange={(e)=>this.setState({UpdateSerialNumber: e.target.value})} value={this.state.UpdateSerialNumber}/>
                                                        </div>
                                                        <div>
                                                            <label id="suLabel" htmlFor="UpdateBillable">Update Billable</label>
                                                            <input id="textBox" name = "UpdateBillable" onChange={(e)=>this.setState({UpdateBillable: e.target.value})} value={this.state.UpdateBillable}/>
                                                        </div>
                                                        <div>
                                                            <label id="suLabel" htmlFor="UpdateBaseMono">Update Base Mono Volume</label>
                                                            <input id="textBox" name = "UpdateBaseMono" onChange={(e)=>this.setState({UpdateBaseMono: e.target.value})} value={this.state.UpdateBaseMono}/>
                                                        </div>
                                                        <div>
                                                            <label id="suLabel" htmlFor="UpdateBaseColor">Update Base Color Volume</label>
                                                            <input id="textBox" name = "UpdateBaseColor" onChange={(e)=>this.setState({UpdateBaseColor: e.target.value})} value={this.state.UpdateBaseColor}/>
                                                        </div>
                                                        <div>
                                                            <label id="suLabel" htmlFor="UpdateBaseRate">Update Base Rate</label>
                                                            <input id="textBox" name = "UpdateBaseRate" onChange={(e)=>this.setState({UpdateBaseRate: e.target.value})} value={this.state.UpdateBaseRate}/>
                                                        </div>
                                                        <div>
                                                            <label id="suLabel" htmlFor="UpdateMonoCPP">Update Mono CPP</label>
                                                            <input id="textBox" name = "UpdateMonoCPP" onChange={(e)=>this.setState({UpdateMonoCPP: e.target.value})} value={this.state.UpdateMonoCPP}/>
                                                        </div>
                                                        <div>
                                                            <label id="suLabel" htmlFor="UpdateColorCPP">Update Color CPP</label>
                                                            <input id="textBox" name = "UpdateColorCPP" onChange={(e)=>this.setState({UpdateColorCPP: e.target.value})} value={this.state.UpdateColorCPP}/>
                                                        </div>
                                                        <div>
                                                            <label id="suLabel" htmlFor="UpdateFlatRate">Update Flat Rate</label>
                                                            <input id="textBox" name = "UpdateFlatRate" onChange={(e)=>this.setState({UpdateFlatRate: e.target.value})} value={this.state.UpdateFlatRate}/>
                                                        </div>
                                                        <br/>
                                                        <Button onClick={this.handleUpdatePrinters} variant="contained" color="primary">Update Info</Button>
                                                        <Button onClick={this.handleClose} variant="contained" color="secondary">Close</Button>
                                                    </form>
                                                    </Fade>
                                                </Modal>
                                            </TableCell>
                                            <TableCell>
                                                <Button onClick={() => this.handleDelete(data)}
                                                    variant="contained" color="secondary">DELETE
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                    } else {
                                        <></>
                                    }

                                })}
                            </TableBody>
                        </Table>
                    </div>
                    <div>
                {/* <BillingTable sessionToken={this.props.sessionToken} customerId={this.props.customerId} printerTable={this.props.printerTable}/> */}
                <h2>Printers To Add</h2>
                <Table>
                    <FetchHeader />
                    <TableBody>
                        { this.state.printerArray.map((printers) => {
                            return (
                            <TableRow key={printers.deviceId}>
                                <TableCell>{printers.extendedFields.mibDescription}</TableCell>
                                <TableCell>{printers.assetNumber}</TableCell>
                                <TableCell>{printers.serialNumber}</TableCell>
                                <TableCell>
                                    <input name="isBillable" type="checkbox" onChange={() => this.setState({billable: !this.state.billable, model: printers.extendedFields.mibDescription, assetNumber: printers.assetNumber, serialNumber: printers.serialNumber, ipAddress: printers.ipAddress, status: printers.monitorStatus, postCustomerId: printers.customerId})}/>
                                </TableCell>
                                <TableCell>
                                    <input type="number" placeholder="Enter Base Volume Mono" name="baseMono" onChange={(e) => this.setState({baseMono: Number(e.target.value)})}/>
                                </TableCell>
                                <TableCell>
                                    <input type="number" placeholder="Enter Base Volume Color" name="baseColor" onChange={(e) => this.setState({baseColor: Number(e.target.value)})}/>
                                </TableCell>
                                <TableCell>
                                    <input type="number" placeholder="Enter Base Rate" name="baseRate" onChange={(e) => this.setState({baseRate: parseFloat(e.target.value).toFixed(2)})}/>
                                </TableCell>
                                <TableCell>
                                    <input type="number" placeholder="Enter Mono CPP" name="monoCPP" onChange={(e) => this.setState({monoCPP: parseFloat(e.target.value).toFixed(4)})}/>
                                </TableCell>
                                <TableCell>
                                    <input type="number" placeholder="Enter Color CPP" name="colorCPP" onChange={(e) => this.setState({colorCPP: parseFloat(e.target.value).toFixed(4)})}/>
                                </TableCell>
                                <TableCell>
                                    <input type="number" placeholder="Enter Flat Rate" name="flatRate" onChange={(e) => this.setState({flatRate: parseFloat(e.target.value).toFixed(2)})}/>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={this.postPrinters} variant="contained" color="primary">Save Data</Button>
                                </TableCell>
                            </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
                </div>
                }
            </div>
        </div>
    )
  }
}

export default ShowCustomers;