import React,{Component} from 'react'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { Table, UncontrolledTooltip } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import '../index.css';
import { FaRegCopyright, FaFacebookSquare, FaTwitterSquare, FaInstagram, FaYoutube, FaLinkedin, FaPinterest, FaEnvelope	 } from 'react-icons/fa';
import { MdPhone } from "react-icons/md";
import {Redirect, Link} from "react-router-dom";

const tooltipStyle = {
	color: "blue",
	backgroundColor:"white"
}

export default class Footer extends Component{

  render(){
    return(
			<div>
			<br/>
			<br/><br/>
      <div style={{backgroundColor:'#262626',color:'white'}}><br/><br/>
	  <Container>
		  <Row className="test" style={{textAlign:"left"}}>
			  <Col md="6">
				<Row>
					<Col md="8">
						 <h3 style={{textAlign:"center"}}>We serve in</h3><br/>
					</Col>
				</Row>
				<Row style={{textAlign:"left"}}>
					<Col md="2"><span className="td_tab">Pune</span></Col>
					<Col md="2"><span className="td_tab">Delhi</span></Col>
					<Col md="2"><span className="td_tab">Mumbai</span></Col>
					<Col md="2"><span className="td_tab">Sricity</span></Col>
				</Row><br/><br/>
				<Row style={{textAlign:"left"}}>
					<Col md="2"><span className="td_tab">Hyderabad</span></Col>
					<Col md="2"><span className="td_tab">Nagpur</span></Col>
					<Col md="2"><span className="td_tab">Bhopal</span></Col>
					<Col md="2"><span className="td_tab">Kochi</span></Col>
				</Row><br/><br/>
				<Row style={{textAlign:"left"}}>
					<Col md="2"><span className="td_tab">Vijayawada</span></Col>
					<Col md="2"><span className="td_tab">Chennai</span></Col>
					<Col md="2"><span className="td_tab">Bangalore</span></Col>
					<Col md="2"><span className="td_tab">Kolkata</span></Col>
				</Row><br/><br/>

			  </Col>
			  <Col md="6"  className="foot_con">
				<Row>
					<Col md="12">
						 <h3 style={{textAlign:"center"}}>Contact Us</h3><br/>
					</Col>
				</Row>
				<Row>
					<Col md="12" style={{textAlign:"center"}}>
						<FaFacebookSquare className="foot_icon" id="facebook"/> <FaTwitterSquare className="foot_icon" id="twitter" /> <FaInstagram className="foot_icon" id="instagram" /> <FaYoutube className="foot_icon" id="youtube" /> <FaLinkedin className="foot_icon" id="linkedin" /> <FaPinterest className="foot_icon" id="pinterest" /> <FaEnvelope className="foot_icon" id="envelope" />
						<UncontrolledTooltip placement="bottom" target="facebook" style={tooltipStyle}>
							facebook.com/At-Home
						</UncontrolledTooltip>
						<UncontrolledTooltip placement="bottom" target="twitter" style={tooltipStyle}>
							twitter.com/@At-Home
						</UncontrolledTooltip>
						<UncontrolledTooltip placement="bottom" target="instagram" style={tooltipStyle}>
							instagram.com/At-Home
						</UncontrolledTooltip>
						<UncontrolledTooltip placement="bottom" target="youtube" style={tooltipStyle}>
							youtube.com/At-Home
						</UncontrolledTooltip>
						<UncontrolledTooltip placement="bottom" target="linkedin" style={tooltipStyle}>
							linkedin.com/At-Home
						</UncontrolledTooltip>
						<UncontrolledTooltip placement="bottom" target="pinterest" style={tooltipStyle}>
							pinterest.com/At-Home
						</UncontrolledTooltip>
						<UncontrolledTooltip placement="bottom" target="envelope" style={tooltipStyle}>
							customer.care@At-Home.in
						</UncontrolledTooltip>
						<br/>
						<br/><br/><br/>
						customer.care@At-Home.com
						<br/>
					<MdPhone/> 040 - 6666 8888
					<br/>
					<MdPhone/> 040 - 6868 4000

					</Col>
				</Row>
			  </Col>
		  </Row>
	  </Container>
	  <br/><br/>


      <div width="100%" style={{backgroundColor:'black'}}>
	  <span className="foot_hpc">At-Home</span> <FaRegCopyright style={{marginLeft:"3%"}}/> 2021 At-Home Technologies India Pvt. Ltd.
	  <br/><br/></div>
      </div>
			</div>
    )
  }

}
