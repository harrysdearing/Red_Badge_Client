// import React from 'react';
// import {Collapse, Navbar,NavbarBrand,Nav,NavItem,Button, NavbarToggler} from 'reactstrap';

// interface NavbarProps {
//         clickLogout: any,
//         sessionToken: any
// }

// interface NavbarState {
//     isOpen: boolean
// }

// class Header extends React.Component <NavbarProps, NavbarState>{
//     constructor(props: NavbarProps){
//         super(props)
//         this.state = {
//             isOpen: false
//         }
//     }
//     render(){
//         console.log(this.state.isOpen);
//         console.log('Navbar', this);
//         return(
//             <Navbar color= "faded">
//                 <NavbarBrand>E-Z BILLING APP 
//                 {this.props.sessionToken===localStorage.getItem('token')}</NavbarBrand>
//                 <NavbarToggler onClick={()=>this.setState({isOpen: !this.state.isOpen})}/>
//                 <Collapse isOpen={this.state.isOpen} navbar>
//                     <Nav className="ml-auto" navbar>
//                         <NavItem>
//                         {this.props.sessionToken===localStorage.getItem('token')?<Button onClick={this.props.clickLogout}>Logout</Button>:<></>}
//                         </NavItem>
//                     </Nav>
//                 </Collapse>
//             </Navbar>
//         )
//     }
//     }

// export default Header;

import React, {useState} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Button
} from 'reactstrap';

const Header = (props: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        let newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
    }
    return (
        <Navbar color="faded" light expand="md">
            <NavbarBrand href="/">Workout Log</NavbarBrand>
            <NavbarToggler onClick={toggle}/>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Button onClick={props.clickLogout}>Logout</Button>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default Header;