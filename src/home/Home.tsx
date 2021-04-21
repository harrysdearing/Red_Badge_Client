import React from "react";
import EKM_Fetch from '../components/Fetch3';
import PrinterFetch from '../components/PrintersFetch';
// import DCA_Add from '../components/DCA';
import DCAIndex from '../components/DCA/DCAIndex';
import Reports from '../components/Reports';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import './home.css';

interface HomeProps {
    updateToken: any,
    sessionToken: any
}

interface HomeState {
}

class Home extends React.Component <HomeProps, HomeState>{
  constructor(props: HomeProps){
    super(props)
  }

  render(){
    return (
      <Router>
      <div id="cssmenu">
        <ul>
          <li>
            <Button variant="contained" color="default" id="Tab1">
              <Link to="/dca">DCA</Link>
            </Button>
          </li>
          <li>
            <Button variant="contained" color="default" id="Tab2">
              <Link to="/customers">Customers</Link>
            </Button>
          </li>
          <li>
            <Button variant="contained" color="default" id="Tab3">
              <Link to="/printers">Printers</Link>
            </Button>
          </li>
          <li>
            <Button variant="contained" color="default" id="Tab4">
              <Link to="/reports">Reports</Link>
            </Button>
          </li>
        </ul>

        <Switch>
        <Route path="/dca">
            <DCAIndex updateToken={this.props.updateToken} sessionToken={this.props.sessionToken}/>
          </Route>
          <Route path="/customers">
            <EKM_Fetch />
          </Route>
          <Route path="/printers">
            <PrinterFetch/>
          </Route>
          <Route path="/reports">
            <Reports />
          </Route>
        </Switch>
      </div>
    </Router>
    );
  };
}

export default Home;