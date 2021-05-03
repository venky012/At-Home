import React,{Component} from 'react'
import {connect} from 'react-redux'

import {Container, ListGroup, ListGroupItem, Button, Row, Col,
  Table, TabContent, TabPane, Modal, ModalHeader,  ModalBody, Form,
  FormGroup, Label, Input} from 'reactstrap'
import {loadUser,mybookings, payment} from '../actions/authActions'
import {addReview} from '../actions/reviewActions'
import ReactTimeout from "react-timeout";
import Card from 'react-bootstrap/Card'
import {
  Redirect
} from "react-router-dom";

import FavoriteIcon from '@material-ui/icons/Favorite';
import Fab from '@material-ui/core/Fab';
import PropTypes from 'prop-types';
import { FaUserAlt } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import AppNavbar from './AppNavbar'
import Footer from './Footer'
import Container1 from './Container1'

const baseUrl = process.env.REACT_APP_BASE_URL;

class pendingOrders extends Component{

  constructor(props)
  {
    super(props)
    this.state={
      flag:null,
      review:'',
      rating:1,
      modal:false,
      to_review:null,
      modal_toggle:{},
      order_list:[],
      check_reviews:[],
      check_reviews_bool:{},
      isLoading:true
      }

  }


  myBookings=() =>{

    if(this.props.user){
      var url = `${baseUrl}/api/users/mypendingpayments/`;
      const ser = url.concat(this.props.user._id)
      fetch(ser)
       .then(response => response.json())
       .then(data => this.setState({ order_list: data }))
    }
  }





  async componentDidMount(){
    await this.props.loadUser()
    this.props.setTimeout(this.myBookings, 200);
    this.props.setTimeout(()=>{this.setState({isLoading:false})},400)
  }

  onChange=(e)=>{
    this.setState({[e.target.name]:e.target.value})
    console.log(this.state.review)
    // console

  }

  onSubmit= async(order_id, professional_id, user_id1)=>{
     const {review,rating} = this.state
     const user_id = this.props.user._id
     const service_added = {review, rating, order_id, professional_id, user_id}
     console.log(service_added)
     if (service_added!=null){
       const value = await this.props.addReview(service_added)
      }
  }

  paying123(order_id, user_id, total_cost){
    console.log('helllooooo badu')
    console.log(order_id, user_id, total_cost)
    this.props.payment(order_id, user_id, total_cost)
  }

render(){

//  const user_orders = this.props.orderList?this.props.orderList:null;
const user_orders = this.state.order_list
console.log('review bool')
console.log(this.state.check_reviews_bool)
console.log(this.state)
if (!this.props.token) {
      return <Redirect to="/" />;
    }

if (this.state.flag){
  return <Redirect to="/location" />;
}
// console.log('hlooooooooooooo')
if(this.state.isLoading){
  return <Container1/>
}

return(
<div>
<AppNavbar/>
<div style={{alignContent:'center',marginTop:'20px'}}>
<center>
<br/>
  <h1>Pending Payments</h1>
  <br/><br/>

  <Container>
    <Row style={{borderTop: '1px solid #EDE8FF', borderBottom: '1px solid #EDE8FF', padding: '10px 10px'}}>
      <Col md="1"><b>Date</b></Col>
      <Col md="2"><b>Services Chosen</b></Col>
      <Col md="3"><b>Address</b></Col>
      <Col md="3"><b>Professional Details</b></Col>
      <Col md="1"><b>Slot Booked</b></Col>
      <Col md="1"><b>Total Cost</b></Col>
      <Col md="1"><b>Pay</b></Col>

    </Row>
{
    user_orders?
    user_orders.map((item) => (
      item?

<Row className="mybooks_row" style={{borderTop: '1px solid #EDE8FF', borderBottom: '1px solid #EDE8FF', padding: '10px 10px'}}>
    <Col md="1">{item.date}</Col>
    <Col md="2">
      <ul>
      {item.services_chosen.map((ser) =>(
        <li> {ser} </li>
      ))}
      </ul>
    </Col>

     <Col md="3">
      {item.address}
      <br/>
      <b>City : </b> {item.city}
     </Col>

     <Col md="3">
      <b>Name : </b> {item.prof_name}
      <br/>
      <b>Phone Number : </b>{item.prof_phone}
     </Col>

     <Col md="1">{item.slot}</Col>

     <Col md="1">Rs. {item.total_cost}</Col>

    <Col md="1">
      <a>
      <Button href={`${baseUrl}/api/payments/`.concat(item.order_id).concat('/').concat(this.props.user._id).concat('/').concat(item.total_cost.toString())} onClick={() => {this.paying123(item.order_id, this.props.user._id, item.total_cost)}}  color="warning">
        Pay
      </Button>
    </a>
    </Col>

     <br/>


<br/>

</Row>
  :
    null
    ))
    :
  null

}
</Container>

</center>
<br/><br/><br/><br/>
<center>

</center>

</div>


<Footer>
<Footer/>
</Footer>

</div>
)
}
}

pendingOrders.propTypes={
  token:PropTypes.string,
  mybookings:PropTypes.func.isRequired,
  orderList:PropTypes.object.isRequired,
  loadUser:PropTypes.func.isRequired,
  user:PropTypes.object.isRequired,
  addReview:PropTypes.func.isRequired,
  is_reviewed:PropTypes.object,
  payment:PropTypes.func.isRequired
}

const mapStateToProps=state=>({
token:state.auth.token,
orderList:state.auth.mybookings,
user:state.auth.user,
is_reviewed:state.review.isReviewed
})

export default ReactTimeout(connect(mapStateToProps,{addReview,loadUser,mybookings,payment})(pendingOrders));
