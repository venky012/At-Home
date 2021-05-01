import React,{Component} from 'react'
import {connect} from 'react-redux'

import {Container, ListGroup, ListGroupItem, Button, Row, Col,
  Table, TabContent, TabPane, Modal, ModalHeader,  ModalBody, Form,
  FormGroup, Label, Input} from 'reactstrap'
  import AppNavbar from'./AppNavbar';
  import Footer from './Footer'

import {loadUser,mybookings} from '../actions/authActions'
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
import Container1 from './Container1'

class Mybookings extends Component{

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

  toggle=(key)=>{
    var temp = this.state.modal_toggle
    temp[key] = !temp[key]
    this.setState({
      modal_toggle: temp
    })
    console.log(this.state.modal)
  }

  myBookings=() =>{

    if(this.props.user){
      var url = 'http://localhost:3000/api/users/mybookings/';
      const ser = url.concat(this.props.user._id)
      fetch(ser)
       .then(response => response.json())
       .then(data => this.setState({ order_list: data }))

    }
  }

  modalToggle = (order_list) =>{
    // console.log(this.props.user._id)
    // console.log(this.props.orderList)
    console.log(this.state.order_list)
    const temp_dict = {}
    for (var i in order_list){
      temp_dict[order_list[i].order_id] = false
    }

    const temp_dict1 = {}
    for (var i in order_list){
      temp_dict1[order_list[i].order_id] = false
    }
    console.log('temp dict')
    console.log(temp_dict)
    this.setState({ modal_toggle: temp_dict })
    this.setState({ check_reviews_bool: temp_dict1 })


  }

  check_review = () =>{
    console.log('in check review')
    // console.log(this.props.user._id)
    var url = 'http://localhost:3000/api/reviews/user/reviews/';
    const ser = url.concat(this.props.user._id)
    fetch(ser)
     .then(response => response.json())
     .then(data => this.setState({ check_reviews: data }))
  }

  review_bool = (cr, ol) => {
    var temp = ol;
    for (var i in cr){
      temp[cr[i].order_id] = true
    }
    this.setState({ check_reviews_bool: temp })
  }

  async componentDidMount(){
    await this.props.loadUser()
    this.props.setTimeout(this.myBookings, 200);
    this.props.setTimeout(() => {this.modalToggle(this.state.order_list)}, 250);
    //if(this.props.user)
    this.props.setTimeout(this.check_review, 500);
    this.props.setTimeout(() => {this.review_bool(this.state.check_reviews, this.state.check_reviews_bool)}, 700);
      this.props.setTimeout(() => {this.setState({isLoading:false})}, 400);
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
  return <Container1 />
}

else{
return(
<div>
<AppNavbar />
<div style={{alignContent:'center',marginTop:'20px'}}>
<center>
<br/>
  <h1>My Bookings</h1>
  <br/><br/>

  <Container>
    <Row style={{borderTop: '1px solid #EDE8FF', borderBottom: '1px solid #EDE8FF', padding: '10px 10px'}}>
      <Col md="1"><b>Date</b></Col>
      <Col md="2"><b>Services Chosen</b></Col>
      <Col md="3"><b>Address</b></Col>
      <Col md="3"><b>Professional Details</b></Col>
      <Col md="1"><b>Slot Booked</b></Col>
      <Col md="1"><b>Total Cost</b></Col>
      <Col md="1"><b>Review</b></Col>

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
    {(this.state.check_reviews_bool[item.order_id])?
   <span style={{color:'white', border:'1px solid green', padding:'5px 5px', backgroundColor:'green'}}>Reviewed</span>

      :
      <Button onClick={() => {this.toggle(item.order_id)}}  color="warning">
      Review
    </Button>}
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




{
  user_orders?
  user_orders.map((item) => (
    item?


<Modal isOpen={this.state.modal_toggle[item.order_id]} toggle={() => {this.toggle(item.order_id)}}>
      <ModalHeader toggle={this.toggle}>Login</ModalHeader>
      <ModalBody>
      <Form onSubmit={() =>{this.onSubmit(item.order_id, item.professional_id, item.user_id)}}>
        <FormGroup>
        <Label for="exampleText">Rating</Label>
          <Input type="number" name="rating" onChange={this.onChange}></Input>
          <Label for="exampleText">Review</Label>
          <Input type="textarea" name="review" id="exampleText" onChange={this.onChange} placeholder="Give your valuable review..."/>
          <br/>
          <Button color="dark" block>
          Submit
          </Button>
        </FormGroup>
      </Form>
      </ModalBody>
      </Modal>
      :
      null
      ))
      :
    null

  }
  <Footer>
  <Footer/>
  </Footer>
</div>
)
}
}
}

Mybookings.propTypes={
  token:PropTypes.string,
  mybookings:PropTypes.func.isRequired,
  orderList:PropTypes.object.isRequired,
  loadUser:PropTypes.func.isRequired,
  user:PropTypes.object.isRequired,
  addReview:PropTypes.func.isRequired,
  is_reviewed:PropTypes.object
}

const mapStateToProps=state=>({
token:state.auth.token,
orderList:state.auth.mybookings,
user:state.auth.user,
is_reviewed:state.review.isReviewed
})

export default ReactTimeout(connect(mapStateToProps,{addReview,loadUser,mybookings})(Mybookings));
