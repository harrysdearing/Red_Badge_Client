import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Modal from '@material-ui/core/Modal';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

interface DCAEditProps {
    sessionToken: any,
    DCAToUpdate: any,
    updateOn: any,
    updateOff: any,
    fetchDCA: any
}

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      paper: {
        position: 'absolute',
        width: 1200,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    }),
  );

const DCAEdit: React.FC<DCAEditProps> = (props: DCAEditProps) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [dcaUpdateCompany, setDCAUpdateCompany] = useState(props.DCAToUpdate.dca_company);
  const [dcaUpdateUsername, setDCAUpdateUsername] = useState(props.DCAToUpdate.dca_username);
  const [dcaUpdatePassword, setDCAUpdatePassword] = useState(props.DCAToUpdate.dca_password);
  const [dcaUpdateUrl, setDCAUpdateUrl] = useState(props.DCAToUpdate.dca_url);
  const [dcaUpdateKey, setDCAUpdateKey] = useState(props.DCAToUpdate.dca_key);
  const [dcaUpdateSecret, setDCAUpdateSecret] = useState(props.DCAToUpdate.dca_secret);
  const [apiUpdatekey, setApiUpdatekey] = useState(props.DCAToUpdate.api_key);

const handleUpdateDCA = (event: React.MouseEvent<HTMLButtonElement>): void => {
  event.preventDefault();
  fetch(`http://localhost:3000/dca/updateDCA/${props.DCAToUpdate.id}`, {
      method: 'PUT',
      body: JSON.stringify({
          dca: {
              dca_company: dcaUpdateCompany,
              dca_username: dcaUpdateUsername,
              dca_password: dcaUpdatePassword,
              dca_url: dcaUpdateUrl,
              dca_key: dcaUpdateKey,
              dca_secret: dcaUpdateSecret,
              api_key: apiUpdatekey
          }
      }),
      headers: new Headers ({
          "Content-Type": "application/json",
          "Authorization": props.sessionToken
      })
  }).then((res) => {
        props.fetchDCA();
        props.updateOff();
        res.json()
  }).then((json) => console.log('did you update?', json))
  .catch((error) => console.log('why no update', error))
}

const handleClose = () => {
    props.updateOff();
};

const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Update DCA Connection</h2>
      <form>
            <FormGroup>
                <InputLabel id="suLabel" htmlFor="dcaUpdateCompanyName">DCA Company Name</InputLabel>
                <Input id="textBox" onChange={(e)=>setDCAUpdateCompany(e.target.value)} name = "dcaUpdateCompanyName" value={dcaUpdateCompany}/>
            </FormGroup>
            <FormGroup>
                <InputLabel id="suLabel" htmlFor="dcaUpdateUsername">Username</InputLabel>
                <Input id="textBox" onChange={(e)=>setDCAUpdateUsername(e.target.value)} name = "dcaUpdateUsername" value={dcaUpdateUsername}/>
            </FormGroup>
            <FormGroup>
                <InputLabel id="suLabel" htmlFor="dcaUpdatePassword">Password</InputLabel>
                <Input id="textBox" onChange={(e)=>setDCAUpdatePassword(e.target.value)} name = "dcaUpdatePassword" value={dcaUpdatePassword}/>
            </FormGroup>
            <FormGroup>
                <InputLabel id="suLabel" htmlFor="dcaUpdateUrl">DCA URL</InputLabel>
                <Input id="textBox" onChange={(e)=>setDCAUpdateUrl(e.target.value)} name = "dcaUpdateUrl" value={dcaUpdateUrl}/>
            </FormGroup>
            <FormGroup>
                <InputLabel id="suLabel" htmlFor="dcaUpdateKey">Key</InputLabel>
                <Input id="textBox" onChange={(e)=>setDCAUpdateKey(e.target.value)} name = "dcaUpdateKey" value={dcaUpdateKey}/>
            </FormGroup>
            <FormGroup>
                <InputLabel id="suLabel" htmlFor="dcaUpdateSecret">Secret</InputLabel>
                <Input id="textBox" onChange={(e)=>setDCAUpdateSecret(e.target.value)} name = "dcaUpdateSecret" value={dcaUpdateSecret}/>
            </FormGroup>
            <FormGroup>
                <InputLabel id="suLabel" htmlFor="apiUpdatekey">API Key / Token</InputLabel>
                <Input id="textBox" onChange={(e)=>setApiUpdatekey(e.target.value)} name = "apiUpdatekey" value={apiUpdatekey}/>
            </FormGroup>
            <Button type="submit" variant="contained" color="primary" onClick={handleUpdateDCA}>Save Info</Button>
            <Button variant="contained" color="secondary" onClick={props.updateOff}>Close</Button>
        </form>
    </div>
);

  return (

        <Modal
            open={props.updateOn}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
  );
}

export default DCAEdit;