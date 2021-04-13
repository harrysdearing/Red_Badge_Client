import React from 'react';

interface FetchProps {
   
}

interface FetchState {
    parents: any,
    children: any,
    group: any
}

class Clover_Fetch extends React.Component <FetchProps, FetchState>{
    constructor(props: FetchProps){
        super(props)
        this.state = {
            parents: [],
            children: [],
            group: []
        }
    }

    createRecord = () => {
        const api_key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJvZmYiOmZhbHNlLCJpc3MiOm51bGwsInN1YiI6IkRlcyBQbGFpbmVzIE9mZmljZSBFcXVpcG1lbnQiLCJhdWQiOiI5NDQ3ZjRjMi0yNmQwLTRhNWYtYjBiZS0xNjZiNTM2ZmJiMDIiLCJpYXQiOjE0NzU2Nzk0OTksIm5iZiI6bnVsbCwiZXhwIjpudWxsfQ.bkbCljMwMO7IfEa5sC0GOFHC249Y82oFUjmKE07O4dmC8qdjD6mSWqTsd6c3evpSac06fJbWg_FOdgjAwlAvHA';
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-api-key", api_key);
        myHeaders.append("Authorization", "Basic dGRjcnV6QGZvb3RwcmludG1wcy5jb206QmFzZWJhbGwyMDIw");
        myHeaders.append("Accept", "application/json");

        fetch(`https://cors-anywhere.herokuapp.com/https://axess.axessmps.com/restapi/3.13.0/groups`, {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        })
        .then(response => response.json())
        .then(result => {
            if (result.groupType == 'Customer') {
                this.state.children.push({id: result.id, name: result.name, parentId: result.parentId});
            } else {
                result.map((layer1: any) => {
                    layer1.children.map((layer2: any) => {
                        if (layer2.groupType == 'Customer') {
                            this.state.children.push({id: layer2.id, name: layer2.name, parentId: layer2.parentId});
                        } else {
                            layer2.children.map((layer3: any) => {
                                if (layer3.groupType == 'Customer'){
                                    this.state.children.push({id: layer3.id, name: layer3.name, parentId: layer3.parentId});
                                } else {
                                    layer3.children.map((layer4: any) => {
                                        if (layer4.groupType == 'Customer'){
                                            this.state.children.push({id: layer4.id, name: layer4.name, parentId: layer4.parentId});
                                        }
                                    })
                                }
                            })
                        }
                    })
                })
            }
            console.log('Fetch data', this.state.children);
            this.setState({
                parents: result
            });
            console.log('Result', this.state.parents)

        })
        .catch(error => console.log('error', error));
    }

    

    componentDidMount(){
        this.createRecord()
    }

    render(){
        return (
            <div>
                <h1>Fetching Clover API</h1>
                {this.state.children.sort((a: any, b:any) => a.name.localeCompare(b.name))
                .map((groups: any) => {
                    return (
                        <div key={groups.id}>
                            <p>{groups.name}</p>
                        </div>
                    )
                })}
                {/* <button>{this.mapping}</button> */}
            </div>
        );
    }

}
        
export default Clover_Fetch;