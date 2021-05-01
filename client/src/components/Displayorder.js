import React,{Component} from 'react'
import {connect} from 'react-redux'

import {Container, ListGroup, ListGroupItem, Button, Modal,
  ModalHeader, Row, Col, Table,
  ModalBody} from 'reactstrap'
import {sendMessage} from '../actions/mainchatActions'
import {messageNotification} from '../actions/notificationActions'
import { getOrder } from '../actions/locationAction'
import {
  Redirect,
  Link
} from "react-router-dom";
import PropTypes from 'prop-types'

import ReactTimeout from "react-timeout";
import {FaUserAlt} from "react-icons/fa"


class Displayorder extends Component{
  state = {
    flag:null,
    modal:true
  }


  myBookings = () =>{
    console.log('in my bookings')
    this.props.getOrder(this.props.location.state.order_id)
 }

 async componentDidMount(){
  this.props.setTimeout(this.myBookings, 200);
}


  toggle=()=>{
    this.setState({
      modal: !this.state.modal
    })
  }

  closebutton(){
    this.setState({flag:1})
  }

  setflag(){
    this.setState({flag:2})
  }
  closebutton=()=>{
    this.setState({flag:1})
  }

  sendhello=(user_id,professional_id)=>{
    const message="hello"
    this.props.sendMessage(user_id,professional_id,message)
    this.props.messageNotification(user_id,professional_id,"/chatpage",this.props.location.state.order_id)
  }

render(){


const name=this.props.order?this.props.order.name:null;
const services_chosen = this.props.order?this.props.order.services_chosen:null;
const total_cost=this.props.order?this.props.order.total_cost:null;
const professional = this.props.order?this.props.order.prof_name:null;
const date = this.props.order?this.props.order.date:null;
const professional_number = this.props.order?this.props.order.prof_phone:null;
const slot = this.props.order?this.props.order.slot:null;
const address = this.props.order?this.props.order.address:null;
const city = this.props.order?this.props.order.city:null;
const user_id = this.props.order?this.props.order.user_id:null;
const professional_id = this.props.order?this.props.order.professional_id:null;
const user_email = this.props.order?this.props.order.user_email:null
console.log(this.props.order)
console.log('services choosen')
if (!this.props.token) {
    // Logout
      return <Redirect to="/" />;
    }
if(this.state.flag===1){
      return <Redirect to="/" />;
    }

  if(this.state.flag===2){
    return <Redirect to="/slots" />;
  }

  var ser_cho = []
  for(var i in services_chosen){
    const temp = [i, services_chosen[i]]
    ser_cho.push(temp)
  }

if(professional===null)
{
  return (
    <Modal
      isOpen={this.state.modal}
      toggle={this.toggle}
      >
      <ModalBody>
          <p>Slot not available choose another one..!</p>
          <br/>
          <Button color="dark" onClick={()=>this.setflag()} block>
          Ok
          </Button>
      </ModalBody>
      </Modal>
  );
}

return(
<div>
<div style={{fontSize:'200%'}}>
  Your Booking<br/><br/>
</div>
<Container>
    <Row>
      <Col md="8">
<Container style={{border: '1px solid #EDE8FF', padding: '10px 10px'}}>
  <Row>
    <Col md="5" style={{textAlign:'center'}}>
      <div style={{padding:'100px 10px',border:'1px solid black',marginTop:'2%'}}>
        <FaUserAlt style={{fontSize:'30px'}} />
      </div>
    </Col>
    <Col md="7" style={{marginTop:'5%'}}>
      <h3>Professional</h3>
      <Table borderless style={{marginLeft:'5%'}}>
        <tr>
          <th>Name</th>
          <th>:</th>
          <td>{name?name:null}</td>
        </tr>
        <tr>
          <th>Email</th>
          <th>:</th>
          <td>{user_email?user_email:null}</td>
        </tr>
      </Table>
    </Col>
  </Row>
  <br/>
  <Row>
    <Col md="12">
      <Table bordered>
        <thead>
          <tr>
            <th>Service Chosen </th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>

        {
              ser_cho?

              ser_cho.map((item) => (

                <tr>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
              </tr>

          ))

        :null
      }


        </tbody>
      </Table>
    </Col>
  </Row>
  <br/>
  <Row>
    <Col  sm={{ size: '5'}} style={{border:'1px solid black', marginLeft:'5%'}}>
      <div style={{marginTop:'6%'}}>
      <h5>Slot Booked</h5>
      <Table borderless>
        <tr>
          <th>Date</th>
          <th>:</th>
          <td>{date?date:null}</td>
        </tr>
        <tr>
          <th>Slot</th>
          <th>:</th>
          <td>{slot?slot:null}</td>
        </tr>
      </Table>
      </div>
    </Col>
    <Col  sm={{ size: '5', offset: 1 }} style={{border:'1px solid black'}}>
      <div style={{marginTop:'10%'}}>
        <h5>Total Cost</h5>
        <span style={{color:'red', fontSize:'30px'}}>Rs. {total_cost?total_cost:null} /-</span>
      </div>
    </Col>
  </Row>
  <br/>
  <Row style={{textAlign:'center'}}>
    <Col md="5">
    <Button style={{align:"left"}} onClick={()=>this.closebutton()}>Ok</Button>
   
    </Col>
  </Row>
  <br/><br/>
</Container>
</Col>
</Row>
</Container>
<ListGroup>
  <ListGroupItem>
    Address:{address?address:null}
  </ListGroupItem>
  <ListGroupItem>
    City:{city?city:null}
  </ListGroupItem>
</ListGroup>
<Button style={{align:"left"}} onClick={()=>this.closebutton()}>Ok</Button>
<Link to={{
          pathname: "/chatpage",
          state: { order_id: this.props.location.state.order_id }
      }}
><Button style={{align:"right"}} onClick={()=>this.sendhello(user_id,professional_id)}>SEND HELLO</Button></Link>

</div>
)
}
}

Displayorder.propTypes={
  getOrder:PropTypes.func.isRequired,
  order:PropTypes.object.isRequired,
  token:PropTypes.string,
  sendMessage:PropTypes.func.isRequired,
  messageNotification:PropTypes.func.isRequired
}

const mapStateToProps=state=>({
order:state.booking.order_details,
token:state.auth.token,
})
export default ReactTimeout(connect(mapStateToProps,{getOrder,sendMessage,messageNotification})(Displayorder))
