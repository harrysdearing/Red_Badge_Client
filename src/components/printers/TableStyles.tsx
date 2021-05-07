import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
  
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      header: {
        backgroundColor: 'rgb(204, 81, 23)',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
      cell: {
          color: 'white'
      }
    }),
  );


const Header = () => {
    const classes = useStyles();

    return (
        <TableHead className={classes.header} >
            <TableRow>
                <TableCell className={classes.cell}>Printer Model</TableCell>
                <TableCell className={classes.cell}>Asset Number</TableCell>
                <TableCell className={classes.cell}>Serial Number</TableCell>
                <TableCell className={classes.cell}>Billable?</TableCell>
                <TableCell className={classes.cell}>Base Volume Mono</TableCell>
                <TableCell className={classes.cell}>Base Volume Color</TableCell>
                <TableCell className={classes.cell}>Base Rate</TableCell>
                <TableCell className={classes.cell}>Mono CPP</TableCell>
                <TableCell className={classes.cell}>Color CPP</TableCell>
                <TableCell className={classes.cell}>Flat Rate</TableCell>
                <TableCell className={classes.cell}>Update</TableCell>
                <TableCell className={classes.cell}>Delete</TableCell>
            </TableRow>
        </TableHead> 
      )
    }
    
export default Header;
