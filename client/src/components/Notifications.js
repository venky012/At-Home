import React,{Component,Fragment} from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,Button
} from 'reactstrap'
import '../styles/homepage.css'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import RegisterModal from './auth/RegisterModal'
import Logout from './auth/Logout'
import LoginModal from './auth/LoginModal'
import {Redirect,Link} from 'react-router-dom'
import CreateProfessional from './CreateProfessional'
import {isProf} from '../actions/profActions'
import {loadUser} from '../actions/authActions'
import {getNotification,clearnewNotifications} from '../actions/notificationActions'
import ReactTimeout from 'react-timeout'
import {sendMessage} from '../actions/mainchatActions'
import '../styles/serviceDisplay.css'
import AppNavbar from'./AppNavbar';
import Footer from './Footer'
import Container1 from './Container1'
class Notifications extends Component{
// componentDidUpdate(){
//   this.props.isProf()
// }
constructor(props){
  super(props)
  this.state={
    isOpen:false,
    isLoading:true
  }
  // this.toggle=this.toggle.bind(this)
}

async componentDidMount()
{

  await this.props.loadUser();
  this.props.setTimeout(this.clearNotifi,10)
  this.props.setTimeout(this.getNotifi,10)
  this.props.setTimeout(()=>{this.setState({isLoading:false})},200)

}

componentDidUpdate(){
  this.getNotifi()
}

getNotifi=()=>{
  if(this.props.auth.user)
  {this.props.getNotification(this.props.auth.user._id)}
}

clearNotifi=()=>{
  if(this.props.auth.user){
  this.props.clearnewNotifications(this.props.auth.user._id)}
}


sendhello=(user_id,professional_id)=>{
  const message="hello"
  this.props.sendMessage(professional_id,user_id,message)
}

static propTypes ={
  auth: PropTypes.object.isRequired,
  isProfessional:PropTypes.bool,
  isProf:PropTypes.func.isRequired,
  loadUser:PropTypes.func.isRequired,
  getNotification:PropTypes.func.isRequired,
  notifications:PropTypes.array.isRequired,
  sendMessage:PropTypes.func.isRequired,
  clearnewNotifications:PropTypes.func.isRequired,
  isLoading:PropTypes.bool.isRequired
  // isProf:PropTypes.func.isRequired
}

toggle=()=>{
  this.setState({
    isOpen: !this.state.isOpen
  });
}

getNoti=(id)=>{
  this.props.getNotification(id)
}
  render(){
    const{isAuthenticated,user}= this.props.auth
    if(!this.props.auth.token){
      return <Redirect to="/"/>
    }
  //   <Link to={{
  //     pathname: notification.url?notification.url:"/",
  //     state: { order_id: notification.order_id?notification.order_id:null }
  // }} onClick={notification.url?()=>this.sendhello(notification.from,this.props.auth.user._id):null}><div>{notification.notification?notification.notification:null}</div></Link>

    if(this.state.isLoading){
      return <Container1/>
    }
    else{
    return(<div>
      <AppNavbar />
      <Row style={{textAlign:'center',marginTop:'2%'}}>
        <Col md="12">
        <h3>Notifications</h3>
        </Col>
      </Row><br/>
      <div style={{margin:'20%',marginTop:'0%'}}>
      {
        this.props.notifications?this.props.notifications.map(notification=><ListGroupItem className="listgrp_serdisp">
          <Link to={{
            pathname: notification.url?notification.url:"/",
            state: { order_id: notification.order_id?notification.order_id:null }
        }} onClick={notification.url?()=>this.sendhello(notification.from,this.props.auth.user._id):null} className="link_sd" style={{textDecoration:'none'}}>
            <div>{notification.notification?notification.notification:null}</div>
          </Link>
        </ListGroupItem>):null
      }
      <h4 style={{color:'#9a9da0',display:this.props.notifications.length==0?'block':'none'}}><i className="fas fa-sad-tear"></i><span>  No Notifications to display yet</span></h4>
      </div>
      <Footer>
      <Footer/>
      </Footer>
      </div>
    )
  }
  }
}
const mapStateToProps = state => ({
  auth:state.auth,
  isProfessional:state.prof.isProfessional,
  notifications:state.notification.notifications,
  isLoading:state.notification.isLoading
})


export default ReactTimeout(connect(mapStateToProps,{loadUser,getNotification,sendMessage,clearnewNotifications})(Notifications))
