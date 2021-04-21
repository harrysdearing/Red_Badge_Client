import React, {useState, useEffect} from 'react';
import DCACreate from './DCACreate';
import DCAEdit from './DCAEdit';
import DCADelete from './DCADelete';

interface DCAIndexProps {
    updateToken: any,
    sessionToken: any
}

const DCAIndex: React.FC<DCAIndexProps> = (props: DCAIndexProps) => {
    const [updateActive, setUpdateActive] = useState(false);
    const [DCA, setDCA] = useState<string[]>([]);
    const [DCAToUpdate, setDCAToUpdate] = useState({});

  const fetchDCA = () => {
    fetch(`http://localhost:3000/dca/getdca`, {
        method: 'GET',
        headers: new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": props.sessionToken
        }),
    })
    .then((res) => res.json())
    .then((json) => {
        setDCA(json.data);
        setDCAToUpdate(json.data);
        console.log('DCA Providers', json.data);
    })
  }

    useEffect(() => {
        fetchDCA();
    }, [])
    
    const editUpdateDCA = (dca: any) => {
        setDCAToUpdate(dca);
        console.log('can i edit', dca);
    }
    const updateOn = () => {
        setUpdateActive(true);
    }
    const updateOff = () => {
        setUpdateActive(false);
    }


  return (
    <div>
        <DCACreate fetchDCA={fetchDCA} updateToken={props.updateToken} sessionToken={props.sessionToken}/>
        <br/>
        <br/>
        <DCADelete DCA={DCA} editupdateDCA={editUpdateDCA} fetchDCA={fetchDCA} updateOn={updateOn} sessionToken={props.sessionToken}/>
        {updateActive ? <DCAEdit DCAToUpdate={DCAToUpdate} updateOff={updateOff} sessionToken={props.sessionToken} fetchDCA={fetchDCA}/>
        : <></>}
    </div>
  )
}

export default DCAIndex;