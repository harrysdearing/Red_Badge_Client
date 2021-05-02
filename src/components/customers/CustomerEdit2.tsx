// import React from "react";
// import Button from '@material-ui/core/Button';
// import Modal from '@material-ui/core/Modal';
// import Backdrop from '@material-ui/core/Backdrop';
// import Fade from '@material-ui/core/Fade';

// interface CustomerUpdateProps {
//     sessionToken: any,
//     open: boolean,
//     close(): any,
//     propsCustomerId: string,
//     propsCustomerName: string,
//     propsCustomerStartDate: string,
//     propsCustomerExpDate: string,
//     propsBillingCycle: string,
//     propsId: number
// }

// interface CustomerUpdateState {
//     toggle: boolean,
//     UpdateStartDate: string,
//     UpdateExpDate: string,
//     BillingCycle: string
// }

// class CustomerUpdate2 extends React.Component <CustomerUpdateProps, CustomerUpdateState>{
//   constructor(props: CustomerUpdateProps){
//     super(props)
//     this.state = {
//         toggle: this.props.open,
//         UpdateStartDate: this.props.propsCustomerStartDate,
//         UpdateExpDate: this.props.propsCustomerExpDate,
//         BillingCycle: this.props.propsBillingCycle
//     }
//   }
//   handleUpdateCustomer = (event: React.MouseEvent<HTMLButtonElement>): void => {
//     event.preventDefault();
//     fetch(`http://localhost:3000/customer/updatecustomer/${this.props.propsId}`, {
//         method: 'PUT',
//         body: JSON.stringify({
//             customer: {
//                 startDate: this.state.UpdateStartDate,
//                 expDate: this.state.UpdateExpDate,
//                 billingCycle: this.state.BillingCycle
//             }
//         }),
//         headers: new Headers ({
//             "Content-Type": "application/json",
//             "Authorization": this.props.sessionToken
//         })
//     })
//     .then((res) => res.json())
//     .then((json) => {
//         this.props.close()
//         console.log('Successfully updated', json)
//     })
//   }

//   handleClose = () => {
//       this.props.close()
//   }

//   render(){

//     return (
//         <>

//             <Modal
//             aria-labelledby="transition-modal-title"
//             aria-describedby="transition-modal-description"
//             open={this.props.open}
//             onClose={this.handleClose}
//             closeAfterTransition
//             BackdropComponent={Backdrop}
//             BackdropProps={{
//             timeout: 500,
//             }}
//             >
//                 <Fade in={this.props.open}>
//                 <form style={{backgroundColor: 'white', justifyContent: 'center'}}>
//                      <h1>Update Customer</h1>
//                      <div>
//                          <p>{this.props.propsCustomerId}</p>
//                      </div>
//                      <div>
//                          <p>{this.props.propsCustomerName}</p>
//                      </div>
//                      <div>
//                          <label id="suLabel" htmlFor="UpdateStartDate">Update Start Date</label>
//                          <input id="textBox" onChange={(e)=>this.setState({UpdateStartDate: e.target.value})} name = "UpdateStartDate" />
//                      </div>
//                      <div>
//                          <label id="suLabel" htmlFor="UpdateExpDate">Update DCA Company Name</label>
//                          <input id="textBox" onChange={(e)=>this.setState({UpdateExpDate: e.target.value})} name = "UpdateExpDate"/>
//                      </div>
//                      <div>
//                          <label id="suLabel" htmlFor="UpdateBillingCycle">Update DCA Company Name</label>
//                          <input id="textBox" onChange={(e)=>this.setState({BillingCycle: e.target.value})} name = "UpdateBillingCycle"/>
//                      </div>
//                      <br/>
//                      <Button onClick={this.handleUpdateCustomer} variant="contained" color="primary">Update Info</Button>
//                      <Button onClick={this.handleClose} variant="contained" color="secondary">Close</Button>
//                 </form>
//                 </Fade>
//             </Modal>
//             {/* :
//             <></>
//             } */}
//         </>
//     )
//   }
// }

// export default CustomerUpdate2;