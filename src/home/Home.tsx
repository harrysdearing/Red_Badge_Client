import React from "react";
import CustomerDelete2 from '../components/customers/CustomerDelete2';
import ShowCustomers from '../components/printers/ShowCustomers';
import DCAIndex from '../components/DCA/DCAIndex';
import Reports from '../components/reports/Reports';
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
  token: string
}

class Home extends React.Component <HomeProps, HomeState>{
  constructor(props: HomeProps){
    super(props)
    this.state = {
      token: ''
    }
  }

  accessToken = () => {
    const base64ToStringNew = 'Basic MzdkMTE3YzcyZDU1NDc5NGJlYjU5MGJhNGEzNDAyMmY6RXhidUZ0OGw0MHlDZnoyQTRIS3ozU2hVSzdLc3ZvNnVFUUdNcTJFcHhWN2FWUTVoblZtVmtLWUVnWjZjZVJOMQ=='
        let myTokenHeaders = new Headers();
        myTokenHeaders.append("Accept", "application/json");
        myTokenHeaders.append("Authorization", base64ToStringNew);

        let requestToken: any = {
            method: 'POST',
            headers: myTokenHeaders,
            redirect: 'follow'

        };
        fetch('https://insight.axessmps.com/PortalAPI/login', requestToken)
        .then(responses => responses.json())
        .then(results => {
            this.setState({token: results.access_token})
        })
      }

      componentWillMount(){
        this.accessToken()
      }

      componentWillUnmount(){
        this.accessToken()
      }


  render(){
    return (
      <Router>
      <div id="cssmenu">
        <ul>
          <li>
            <Button variant="contained" color="default" id="Tab1">
              <Link to="/">DCA</Link>
            </Button>
          </li>
          <li>
            <Button variant="contained" color="default" id="Tab2">
              <Link to="/customer">Customers</Link>
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
        <Route exact path="/">
            <DCAIndex updateToken={this.props.updateToken} sessionToken={this.props.sessionToken} token={this.state.token}/>
          </Route>
          <Route path="/customer">
            <CustomerDelete2 sessionToken={this.props.sessionToken} token={this.state.token}/>
          </Route>
          <Route path="/printers">
            <ShowCustomers sessionToken={this.props.sessionToken} token={this.state.token}/>
          </Route>
          <Route path="/reports">
            <Reports sessionToken={this.props.sessionToken} token={this.state.token}/>
          </Route>
        </Switch>
      </div>
    </Router>
    );
  };
}

export default Home;