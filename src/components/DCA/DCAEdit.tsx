import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { SettingsInputAntennaRounded, SettingsInputAntennaTwoTone } from '@material-ui/icons';

interface DCAEditProps {
    sessionToken: any,
    DCAToUpdate: any,
    updateOff: any,
    fetchDCA: any
}

const DCAEdit: React.FC<DCAEditProps> = (props: DCAEditProps) => {
  const [updateOpen, setUpdateOpen] = useState(true);
  const [dcaUpdateCompany, setDCAUpdateCompany] = useState(props.DCAToUpdate.dca_company);
  const [dcaUpdateUsername, setDCAUpdateUsername] = useState(props.DCAToUpdate.dca_username);
  const [dcaUpdatePassword, setDCAUpdatePassword] = useState(props.DCAToUpdate.dca_password);
  const [dcaUpdateUrl, setDCAUpdateUrl] = useState(props.DCAToUpdate.dca_url);
  const [dcaUpdateKey, setDCAUpdateKey] = useState(props.DCAToUpdate.dca_key);
  const [dcaUpdateSecret, setDCAUpdateSecret] = useState(props.DCAToUpdate.dca_secret);
  const [apiUpdatekey, setApiUpdatekey] = useState(props.DCAToUpdate.api_key);

  console.log('DCA Edit Props', props);

const handleUpdateDCA = (event: React.MouseEvent<HTMLFormElement>): void => {
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
        setUpdateOpen(false);
  })
}

  const updateBody = (
    <form style={{backgroundColor: 'white', margin: 'auto', justifyContent: 'center'}} onSubmit={handleUpdateDCA}>
        <h1 id="simple-modal-title">Update DCA Connection</h1>
        <p id="simple-modal-description">
            Please Edit Fields Below
        </p>
        <div>
            <label id="suLabel" htmlFor="dcaUpdateCompanyName">Update DCA Company Name</label>
            <input id="textBox" onChange={(e)=>setDCAUpdateCompany(e.target.value)} name = "dcaUpdateCompanyName" value={dcaUpdateCompany}/>
        </div>
        <div>
            <label id="suLabel" htmlFor="dcaUpdateUsername">Update Username</label>
            <input id="textBox" onChange={(e)=>setDCAUpdateUsername(e.target.value)} name = "dcaUpdateUsername" value={dcaUpdateUsername}/>
        </div>
        <div>
            <label id="suLabel" htmlFor="dcaUpdatePassword">Update Password</label>
            <input id="textBox" onChange={(e)=>setDCAUpdatePassword(e.target.value)} name = "dcaUpdatePassword" value={dcaUpdatePassword}/>
        </div>
        <div>
            <label id="suLabel" htmlFor="dcaUpdateUrl">Update DCA URL</label>
            <input id="textBox" onChange={(e)=>setDCAUpdateUrl(e.target.value)} name = "dcaUpdateUrl" value={dcaUpdateUrl}/>
        </div>
        <div>
            <label id="suLabel" htmlFor="dcaUpdateKey">Update Key</label>
            <input id="textBox" onChange={(e)=>setDCAUpdateKey(e.target.value)} name = "dcaUpdateKey" value={dcaUpdateKey}/>
        </div>
        <div>
            <label id="suLabel" htmlFor="dcaUpdateSecret">Update Secret</label>
            <input id="textBox" onChange={(e)=>setDCAUpdateSecret(e.target.value)} name = "dcaUpdateSecret" value={dcaUpdateSecret}/>
        </div>
        <div>
            <label id="suLabel" htmlFor="apiUpdatekey">Update API Key</label>
            <input id="textBox" onChange={(e)=>setApiUpdatekey(e.target.value)} name = "apiUpdatekey" value={apiUpdatekey}/>
        </div>
        <br/>
        <Button type="submit" variant="contained" color="primary">Save Info</Button>
        <Button onClick={() => setUpdateOpen(false)} variant="contained" color="secondary">Close</Button>
    </form>
  );


  return (
    <div>
        {updateOpen ?
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={updateOpen}
            onClose={() => setUpdateOpen(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            {updateBody}
        </Modal>
        :
        <></>
        }
    </div>
  );
}

export default DCAEdit;