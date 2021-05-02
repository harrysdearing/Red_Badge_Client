import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';

interface DCAProps {
    updateToken: any,
    sessionToken: any,
    fetchDCA(): any,
    token: string
}

const DCACreate: React.FC<DCAProps> = (props: DCAProps) => {
  const [open, setOpen] = useState(false);
  const [dcaCompany, setDCACompany] = useState('');
  const [dcaUsername, setDCAUsername] = useState('');
  const [dcaPassword, setDCAPassword] = useState('');
  const [dcaUrl, setDCAUrl] = useState('');
  const [dcaKey, setDCAKey] = useState('');
  const [dcaSecret, setDCASecret] = useState('');
  const [apikey, setApikey] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleDCA = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fetch(`http://localhost:3000/dca/adddca`, {
        method: 'POST',
        body: JSON.stringify({
            dca: {
                dca_company: dcaCompany,
                dca_username: dcaUsername,
                dca_password: dcaPassword,
                dca_url: dcaUrl,
                dca_key: dcaKey,
                dca_secret: dcaSecret,
                api_key: props.token
            }
        }),
        headers: new Headers ({
            "Content-Type": "application/json",
            "Authorization": props.sessionToken

        })
    })
    .then((res) => res.json())
    .then((json) => {
        props.fetchDCA();
        setOpen(false);
    })
    .catch((err) => console.log('DCA Not Added', err))
}

  const body = (
    <div style={{backgroundColor: 'white', margin: 'auto', justifyContent: 'center'}}>
        <h1 id="simple-modal-title">Add New DCA Connection</h1>
        <p id="simple-modal-description">
            Not All Fields Are Required.  They differ depending on your DCA provider.
        </p>
        <div>
            <label id="suLabel" htmlFor="dcaCompanyName">DCA Company Name</label>
            <input id="textBox" onChange={(e)=>setDCACompany(e.target.value)} name = "dcaCompanyName" value={dcaCompany}/>
        </div>
        <div>
            <label id="suLabel" htmlFor="dcaUsername">Username</label>
            <input id="textBox" onChange={(e)=>setDCAUsername(e.target.value)} name = "dcaUsername" value={dcaUsername}/>
        </div>
        <div>
            <label id="suLabel" htmlFor="dcaPassword">Password</label>
            <input id="textBox" onChange={(e)=>setDCAPassword(e.target.value)} name = "dcaPassword" value={dcaPassword}/>
        </div>
        <div>
            <label id="suLabel" htmlFor="dcaUrl">DCA URL</label>
            <input id="textBox" onChange={(e)=>setDCAUrl(e.target.value)} name = "dcaUrl" value={dcaUrl}/>
        </div>
        <div>
            <label id="suLabel" htmlFor="dcaKey">Key</label>
            <input id="textBox" onChange={(e)=>setDCAKey(e.target.value)} name = "dcaKey" value={dcaKey}/>
        </div>
        <div>
            <label id="suLabel" htmlFor="dcaSecret">Secret</label>
            <input id="textBox" onChange={(e)=>setDCASecret(e.target.value)} name = "dcaSecret" value={dcaSecret}/>
        </div>
        <div>
            <label id="suLabel" htmlFor="apikey">API Key</label>
            <input id="textBox" name = "apikey" value={props.token}/>
        </div>
        <br/>
        <Button onClick={handleDCA} variant="contained" color="primary">Save Info</Button>
        <Button onClick={() => setOpen(false)} variant="contained" color="secondary">Close</Button>
    </div>
  );

  return (
    <div>
        <br/>
        <Button variant="contained" color="primary" type="button" onClick={handleOpen}>Add New DCA Connection</Button>
        {open ?
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            {body}
        </Modal>
        :
        <br/>
        }
    </div>
  );
}

export default DCACreate;