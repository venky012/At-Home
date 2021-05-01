import React,{Component} from 'react';
import ShowProfile from './components/ShowProfile';
import ShowProfessional from './components/ShowProfessional';
import Service from './components/Service';
import ServiceTypes from './components/serviceTypes';
import admin from './components/admin';
import ItemModal from './components/ItemModal'
import {Provider} from 'react-redux'
import store from './store'
import {loadUser} from './actions/authActions'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import AppNavbar from'./components/AppNavbar';
import Footer from './components/Footer'
import Dashboard from './Dashboard';
import HomePage from  './components/HomePage'
import HomePageContent from './components/HomePageContent'
import ServicesDisplay from './components/ServicesDisplay'
import ContactUS from './components/ContactUS'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Currentloco from './components/Currentloco'
import Getmarker from './components/Getmarker'
import Slot from './components/Slot'
import Location from './components/Location'
import States from './components/States'
import ProfLocation from './components/profLocation/Location'
import ProfStates from './components/profLocation/States'
import ProfCurrentloco from './components/profLocation/Currentloco'
import ProfGetmarker from './components/profLocation/Getmarker'
import DisplayBooking from './components/Displaybooking'
import Dummy from './components/Dummy'
import Mybookings from './components/Mybookings'
import Myorders from './components/Myorders'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import ChatPage from './components/ChatPage'
import Notifications from './components/Notifications'

import Services from './components/admin/Services'
import AdminSlots from './components/admin/AdminSlots'
import Admincity from './components/admin/Admincity'
import Adminservicetype from './components/admin/Adminservicetype'
import Displayorder from './components/Displayorder'
import pendingOrders from './components/pendingOrders'
class App extends Component{

  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };

    // store.subscribe(() => {
    //   this.setState({
    //     user: store.getState().auth.user
    //   });
    // });
  }
  componentDidMount(){
    store.dispatch(loadUser())
  }

  render(){
    return (
      <Provider store={store}>
          <Router>
        <div className="App">


          <Switch>
        <Route exact path='/' component={HomePageContent}/>
        <Route exact path='/servicesdisplay' component={ServicesDisplay}/>
        <Route exact path='/contact' component={ContactUS}/>
        <Route exact path='/admin' component={admin}/>
		    <Route exact path='/service/:name' component={Service}/>
        <Route exact path='/service/:name/services' component={ServiceTypes}/>
				<Route exact path='/profile' component={ShowProfile}/>
        <Route exact path='/showprofessional' component={ShowProfessional}/>
        <Route exact path='/currentloco' component={Currentloco}/>
        <Route exact path='/marker' component={Getmarker}/>
        <Route exact path='/slots' component={Slot}/>
        <Route exact path='/location' component={Location}/>
        <Route exact path='/states' component={States}/>
        <Route exact path='/professional/location' component={ProfLocation}/>
        <Route exact path='/professional/states' component={ProfStates}/>
        <Route exact path='/professional/currentloco' component={ProfCurrentloco}/>
        <Route exact path='/professional/marker' component={ProfGetmarker}/>
        <Route exact path='/displaybooking' component={DisplayBooking}/>
        <Route exact path='/mybookings'  component={Mybookings}/>
        <Route exact path='/mypendingorders'  component={pendingOrders}/>
        <Route exact path='/myorders'  component={Myorders}/>
        <Route exact path='/chatpage' component={ChatPage}/>
        <Route exact path='/notifications' component={Notifications}/>
        <Route exact path='/dummy' component={Dummy}/>
        <Route exact path='/displayorder' component={Displayorder}/>
        
          </Switch>

        </div>

              <div className='Admin'>
              <Switch>
            <Route exact path='/admin/services' component={Services} />
            <Route exact path='/admin/slots' component={AdminSlots} />
            <Route exact path='/admin/cities' component={Admincity} />
            <Route exact path='/admin/servicetypes/:name' component={Adminservicetype} />
            </Switch>
              </div>
              </Router>
          <div className='App'>
            </div>
      </Provider>
    )
}
}

export default App;
