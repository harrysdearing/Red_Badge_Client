import React, {useState} from 'react';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import { ToggleButton } from '@material-ui/lab';
// import { Collapse } from '@material-ui/core';
// import {Nav, NavItem} from 'reactstrap';

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  }),
);

interface Navbar2Props {
    // isOpen: boolean,
    clickLogout: any
}

const Header: React.FC<Navbar2Props> = (props: Navbar2Props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        let newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
    }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            E-Z Billing
          </Typography>
          <Button onClick={props.clickLogout}>Logout</Button>
          {/* <ToggleButton onClick={toggle}>
            <Button onClick={props.clickLogout}>Logout</Button> */}
              {/* <Collapse unmountOnExit>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button onClick={props.clickLogout}>Logout</Button>
                        </NavItem>
                    </Nav>
              </Collapse> */}
          {/* </ToggleButton> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;