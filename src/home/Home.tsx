import React from "react";
import EKM_Fetch from '../components/Fetch3';

interface HomeProps {
  token: string
}

interface HomeState {
  parents: any,
  children: any,
  group: any
}

class Home extends React.Component <HomeProps, HomeState>{
  constructor(props: HomeProps){
    super(props)
  }

  render(){
    return (
      <div>
        <EKM_Fetch />
        {/* <TripIndex setDisplayedNum={setDisplayedNum} token={props.token} api_key={props.api_key} tripForDestinations={tripForDestinations} setTripForDestinations={setTripForDestinations}/>
        <div style={{height:"40px"}}></div>
        {tripForDestinations?<DestinationIndex displayedNum={displayedNum} setDisplayedNum={setDisplayedNum} token={props.token} api_key={props.api_key} tripForDestinations={tripForDestinations} setTripForDestinations={setTripForDestinations}/>:null}
        </div> */}
      </div>
    );
  };
}

export default Home;