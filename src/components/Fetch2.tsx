import React from 'react';

interface FetchProps {
}

interface FetchState {

}

class MPSMonitor_Fetch extends React.Component <FetchProps, FetchState>{
    constructor(props: FetchProps){
        super(props)

    }

    createRecord = () => {

        var myHeaders = new Headers();
        myHeaders.append("Cache-Control", "no-cache");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();

        fetch(`https://api.abassetmanagement.com/tR09HyYPPxiuWcD0jaMI/token?client_id=tR09HyYPPxiuWcD0jaMI&client_secret=ExcNXf2nzYNX2wuLOxNm&grant_type=password&username=tdcruz@footprintmps.com&password=Baseball2022!&scope=DPU`, {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        })
        .then(response => response.json())
        .then(result => {

            console.log('MPS Monitor', result);
        })
    }    


    render(){
        return (
            <div>
                <button onClick={this.createRecord}>Are you working</button>
            </div>
        );
    }

}
        
export default MPSMonitor_Fetch;