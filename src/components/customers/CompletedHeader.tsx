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


const CompletedHeader = () => {
    const classes = useStyles();

    return (
        <TableHead className={classes.header} >
            <TableRow>
                <TableCell className={classes.cell}>Customer ID</TableCell>
                <TableCell className={classes.cell}>Customer Name</TableCell>
                <TableCell className={classes.cell}>Contract Start Date</TableCell>
                <TableCell className={classes.cell}>Contract End Date</TableCell>
                <TableCell className={classes.cell}>Billing Cycle</TableCell>
                <TableCell className={classes.cell}>Update</TableCell>
                <TableCell className={classes.cell}>Delete</TableCell>
            </TableRow>
        </TableHead> 
      )
    }
    
export default CompletedHeader;