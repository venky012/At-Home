import React,{Component} from 'react'
import {connect} from 'react-redux'
import AppNavbar from'./AppNavbar';
import Footer from './Footer'
import { Card, CardTitle, CardText} from 'reactstrap';
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
import Container1 from './Container1'

const baseUrl = process.env.REACT_APP_BASE_URL;

class DisplayBooking extends Component{
  state = {
    flag:null,
    modal:true,
    isLoading:true,
  }


  myBookings = () =>{
    console.log('in my bookings')
    this.props.getOrder(this.props.location.state.order_id)
 }

 async componentDidMount(){
  this.props.setTimeout(this.myBookings, 200);
  this.props.setTimeout(()=>{this.setState({isLoading:false})},200)
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
    this.props.messageNotification(professional_id,user_id,"/chatpage",this.props.location.state.order_id)
  }

  onClickbutton = (order_id, user_id, total_cost) => {
		const url = `${baseUrl}/api/payments/`;
		const ser = url.concat(order_id).concat('/').concat(user_id).concat('/').concat(total_cost.toString())
			window.location.href=ser;
	}

render(){


const name=this.props.order?this.props.order.name:null;
const order_id=this.props.order?this.props.order.order_id:null;
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
const prof_pic = this.props.order ? baseUrl + '/' + this.props.order.prof_image:null
const user_pic = this.props.order?this.props.order.user_image:null
var ser_cho = []
for(var i in services_chosen){
  const temp = [i, services_chosen[i]]
  ser_cho.push(temp)
}
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

if(this.state.isLoading){
    return <Container1/>
  }
else{
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
<AppNavbar />
<br/>
<div style={{fontSize:'200%'}}>
  Your Booking<br/><br/>
</div>
<Container>
    <Row>
      <Col md="8" >
<Container style={{backgroundColor: '#EDE8FF',padding: '10px 10px', overflow:'hidden'}} className="dispbook_cont">
  <Row>
    <Col md="5" style={{textAlign:'center'}}>
      <div style={{marginTop:'13%',marginLeft:'14%',overflow:'hidden'}}>
        {/* <FaUserAlt style={{fontSize:'30px'}} /> */}
        <img src={prof_pic} style={{width:'200px',height:'200px',overflow:'hidden',boxShadow:'5px 5px 7px #888888'}}/>
      </div>
    </Col>
    <Col md="6" style={{marginTop:'5%'}}>
      <h3>Professional</h3>
      <hr/>
      <Table borderless style={{marginLeft:'5%'}}>
        <tr>
          <th>Name</th>
          <th>:</th>
          <td>{professional?professional:null}</td>
        </tr>
        <tr>
          <th>Number</th>
          <th>:</th>
          <td>{professional_number?professional_number:null}</td>
        </tr>
        <tr>
          <th>Email</th>
          <th>:</th>
            <td>{this.props.order?this.props.order.prof_email:null}</td>
        </tr>
      </Table>
    </Col>
  </Row>
  <br/>
  <Row>
    <Col md="10" style={{marginLeft:'5%'}}>
      <Table style={{border:'1px solid black'}}>
        <thead>
          <tr style={{border:'1px solid black'}}>
            <th style={{border:'1px solid black'}}>Service Chosen</th>
            <th style={{border:'1px solid black'}}>Quantity</th>
          </tr>
        </thead>
        <tbody style={{border:'1px solid black'}}>

        {
              ser_cho?
              ser_cho.map((item) => (

                <tr style={{border:'1px solid black'}}>
                <td style={{border:'1px solid black'}}>{item[0]}</td>
                <td style={{border:'1px solid black'}}>{item[1]}</td>
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
          <td>{slot?slot:null} : 00</td>
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
  <Row>
      <Col md="10" style={{textAlign:'center'}}>
        <span style={{fontSize:'23px', marginLeft:'5%'}}><b>Your Address :</b> {address?address:null}, {city?city:null}.</span>
      </Col>
  </Row>
  <br/>
  <Row>
      <Col sm={{ size: '3', offset: 2 }} style={{textAlign:'center', marginLeft:'20%'}}>
        
<Button style={{width:'100%'}} onClick={()=>this.closebutton()} className="but_disp">Ok</Button>
</Col>
<Col md="3">
<Link to={{
          pathname: "/chatpage",
          state: { order_id: this.props.location.state.order_id }
      }}
><Button style={{marginLeft:"5%", width:'100%'}} onClick={()=>this.sendhello(user_id,professional_id)} className="but_disp">SEND HELLO</Button></Link>
</Col>
  </Row>
  <br/>
  <br/><br/>
</Container>
</Col>
<Col md={{size:'3', offset:1}}>

        <Card body>
          <CardTitle><h4>Pay</h4></CardTitle>
          <CardText>Total Cost : <b>Rs. {total_cost?total_cost:null} /-</b></CardText>
          <Button onClick={() => {this.onClickbutton(order_id, user_id, total_cost)}}>Proceed to Payment</Button>
        </Card>

</Col>
</Row>
</Container>

<Footer>
<Footer/>
</Footer>
</div>
)
}
}
}

DisplayBooking.propTypes={
  getOrder:PropTypes.func.isRequired,
  order:PropTypes.object.isRequired,
  token:PropTypes.string,
  sendMessage:PropTypes.func.isRequired,
  messageNotification:PropTypes.func.isRequired,
  isLoading:PropTypes.bool.isRequired
}

const mapStateToProps=state=>({
order:state.booking.order_details,
token:state.auth.token,
isLoading:state.booking.isLoading
})
export default ReactTimeout(connect(mapStateToProps,{getOrder,sendMessage,messageNotification})(DisplayBooking))
