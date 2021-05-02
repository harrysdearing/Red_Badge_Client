import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import {Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap';

interface DCAEditProps {
    sessionToken: any,
    DCAToUpdate: any,
    updateOn: any,
    updateOff: any,
    fetchDCA: any
}

const DCAEdit: React.FC<DCAEditProps> = (props: DCAEditProps) => {
  const [dcaUpdateCompany, setDCAUpdateCompany] = useState(props.DCAToUpdate.dca_company);
  const [dcaUpdateUsername, setDCAUpdateUsername] = useState(props.DCAToUpdate.dca_username);
  const [dcaUpdatePassword, setDCAUpdatePassword] = useState(props.DCAToUpdate.dca_password);
  const [dcaUpdateUrl, setDCAUpdateUrl] = useState(props.DCAToUpdate.dca_url);
  const [dcaUpdateKey, setDCAUpdateKey] = useState(props.DCAToUpdate.dca_key);
  const [dcaUpdateSecret, setDCAUpdateSecret] = useState(props.DCAToUpdate.dca_secret);
  const [apiUpdatekey, setApiUpdatekey] = useState(props.DCAToUpdate.api_key);

//   console.log('DCA Edit Props', props);

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

  return (
    <Modal isOpen={true}>
        <ModalHeader>Update DCA Connection</ModalHeader>
        <ModalBody>
            <Form>
                <FormGroup>
                    <Label id="suLabel" htmlFor="dcaUpdateCompanyName">Update DCA Company Name</Label>
                    <Input id="textBox" onChange={(e)=>setDCAUpdateCompany(e.target.value)} name = "dcaUpdateCompanyName" value={dcaUpdateCompany}/>
                </FormGroup>
                <FormGroup>
                    <Label id="suLabel" htmlFor="dcaUpdateUsername">Update Username</Label>
                    <Input id="textBox" onChange={(e)=>setDCAUpdateUsername(e.target.value)} name = "dcaUpdateUsername" value={dcaUpdateUsername}/>
                </FormGroup>
                <FormGroup>
                    <Label id="suLabel" htmlFor="dcaUpdatePassword">Update Password</Label>
                    <Input id="textBox" onChange={(e)=>setDCAUpdatePassword(e.target.value)} name = "dcaUpdatePassword" value={dcaUpdatePassword}/>
                </FormGroup>
                <FormGroup>
                    <Label id="suLabel" htmlFor="dcaUpdateUrl">Update DCA URL</Label>
                    <Input id="textBox" onChange={(e)=>setDCAUpdateUrl(e.target.value)} name = "dcaUpdateUrl" value={dcaUpdateUrl}/>
                </FormGroup>
                <FormGroup>
                    <Label id="suLabel" htmlFor="dcaUpdateKey">Update Key</Label>
                    <Input id="textBox" onChange={(e)=>setDCAUpdateKey(e.target.value)} name = "dcaUpdateKey" value={dcaUpdateKey}/>
                </FormGroup>
                <FormGroup>
                    <Label id="suLabel" htmlFor="dcaUpdateSecret">Update Secret</Label>
                    <Input id="textBox" onChange={(e)=>setDCAUpdateSecret(e.target.value)} name = "dcaUpdateSecret" value={dcaUpdateSecret}/>
                </FormGroup>
                <FormGroup>
                    <Label id="suLabel" htmlFor="apiUpdatekey">Update API Key</Label>
                    <Input id="textBox" onChange={(e)=>setApiUpdatekey(e.target.value)} name = "apiUpdatekey" value={apiUpdatekey}/>
                </FormGroup>
                <Button type="submit" variant="contained" color="primary" onClick={handleUpdateDCA}>Save Info</Button>
                <Button variant="contained" color="secondary" onClick={props.updateOff}>Close</Button>
            </Form>
        </ModalBody>
    </Modal>
  );
}

export default DCAEdit;