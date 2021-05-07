// import { Buffer } from 'buffer';
import React from 'react';
// import ToggleButton from '@material-ui/lab/ToggleButton';
import Button from '@material-ui/core/Button';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import '../style.css';

interface BillingTableProps {
    sessionToken: any,
    customerId: any,
    printerTable: any
}


interface BillingTableState {
    toggle: boolean,
    printerTable: any[],
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
    printerId: number

}

class BillingTable extends React.Component <BillingTableProps, BillingTableState>{
    constructor(props: BillingTableProps){
        super(props)
        this.state = {
            toggle: false,
            printerTable: [],
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
            printerId: 0
   
        }
    }


    handleClose = () => {
        this.setState({toggle: !this.state.toggle})
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
            console.log('Deleted printers', json)
        })
        .catch((error) => console.log('Why are you not deleting?', error))
    }

    componentWillMount(){
        this.handleUpdatePrinters;
    }

    componentWillUnmount(){
        this.handleUpdatePrinters;
    }


    render(){
        return (
            <div>
                <h1>Completed Printers</h1>
                    <Table>
                        <TableHead color="inherit" >
                            <TableRow>
                                <TableCell>Printer Model</TableCell>
                                <TableCell>Asset Number</TableCell>
                                <TableCell>Serial Number</TableCell>
                                <TableCell>Billable?</TableCell>
                                <TableCell>Base Volume Mono</TableCell>
                                <TableCell>Base Volume Color</TableCell>
                                <TableCell>Base Rate</TableCell>
                                <TableCell>Mono CPP</TableCell>
                                <TableCell>Color CPP</TableCell>
                                <TableCell>Flat Rate</TableCell>
                                <TableCell>Update</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.printerTable.map((data: any) => {
                                if (data.customerId == this.props.customerId){
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
        )
    }
  }

  export default BillingTable;