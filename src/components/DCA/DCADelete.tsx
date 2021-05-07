import React, {useState, useEffect} from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: 'rgb(204, 81, 23)',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});


interface DCADeleteProps {
    sessionToken: any,
    DCA: any,
    editUpdateDCA: any,
    updateOn: any,
    fetchDCA: any
}

const DCADelete: React.FC<DCADeleteProps> = (props: DCADeleteProps) => {
  const classes = useStyles();

  const deleteDCA = (dca: any) => {
      fetch(`http://localhost:3000/dca/deleteDCA/${dca.id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": props.sessionToken,
        }),
      }).then(() => {
        props.fetchDCA()
      });
    };


  const DCAMapper = () => {
    return props.DCA.map((dca: any, index: any) => {
      return (
          <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                  {dca.dca_company}
              </StyledTableCell>
              <StyledTableCell align="center">{dca.dca_username}</StyledTableCell>
              <StyledTableCell align="center">{dca.dca_password}</StyledTableCell>
              <StyledTableCell align="center">{dca.dca_url}</StyledTableCell>
              <StyledTableCell align="center">{dca.dca_key}</StyledTableCell>
              <StyledTableCell align="center">{dca.dca_secret}</StyledTableCell>
              <StyledTableCell align="center">{dca.api_key}</StyledTableCell>
              <StyledTableCell align="center"><Button variant="contained" color="primary" onClick={() => {props.editUpdateDCA(dca); props.updateOn()}}>Update</Button></StyledTableCell>
              <StyledTableCell align="center"><Button variant="contained" color="secondary" onClick={() => {deleteDCA(dca)}}>Delete</Button></StyledTableCell>
          </StyledTableRow>
      )
    })
  }

  return (
    <>
        <h3>Add DCA Connection</h3>
        <hr/>
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>DCA Provider</StyledTableCell>
                <StyledTableCell align="center">Username</StyledTableCell>
                <StyledTableCell align="center">Password</StyledTableCell>
                <StyledTableCell align="center">DCA Url</StyledTableCell>
                <StyledTableCell align="center">Key</StyledTableCell>
                <StyledTableCell align="center">Secret</StyledTableCell>
                <StyledTableCell align="center">API Key / Token</StyledTableCell>
                <StyledTableCell align="center">Update DCA Connection</StyledTableCell>
                <StyledTableCell align="center">Delete DCA Connection</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
              {DCAMapper()}
            </TableBody>
        </Table>
        </TableContainer>
    </>
  )
}

export default DCADelete;