import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Container, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button, Jumbotron} from 'reactstrap';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import { Table, TabContent, TabPane} from 'reactstrap';
import classnames from 'classnames';
import store from '../store'
import {loadUser} from '../actions/authActions'
import {loadProf} from '../actions/showprofActions'
import {get_service} from '../actions/serviceActions'
import {Redirect, Link} from "react-router-dom"
import PropTypes from 'prop-types'
import '../index.css'
import {FaUserAlt, FaStar, FaRegStar} from "react-icons/fa";
//import Example from '../components/minNav.js'
import AppNavbar from'./AppNavbar';
import Footer from './Footer'
import Container1 from './Container1'
import '../styles/chatpage.css'

const baseUrl = process.env.REACT_APP_BASE_URL;

class Service extends React.Component{


	state = {
		service:[],
		services: [],
		activeTab: '1',
		serviceWorkers:[],
		reviews:[],
		prof_names:{},
		user_names:{}
	}

	componentDidMount(){
		this.props.loadUser();
		const {name} = this.props.match.params;
		console.log(this.props)
		console.log(name)
		this.props.get_service(name);
		this.getServices(name);
		this.getServiceWorkers(name);
		this.getReviews(name);
		this.getNames(name)
	}

	getServiceWorkers = (temp) => {
		var service_clicked = temp;
		var url = `${baseUrl}/api/professional/`;
		const ser = url.concat(service_clicked)
		fetch(ser)
		 .then(response => response.json())
		 .then(data => this.setState({ serviceWorkers: data }))
	}



	getService = (temp) => {
		var service_clicked = temp;
		var url = `${baseUrl}/api/service/`;
		const ser = url.concat(service_clicked)
		fetch(ser)
		 .then(response => response.json())
		 .then(data => this.setState({ service: data }))
	}

	getServices = (temp) => {
		var service_clicked = temp;
		var url = `${baseUrl}/api/serviceType/`;
		const ser = url.concat(service_clicked)
		fetch(ser)
		 .then(response => response.json())
		 .then(data => this.setState({ services: data }))
	}

	getReviews = (temp) => {
		var service_clicked = temp;
		var url = `${baseUrl}/api/reviews/`;
		const ser = url.concat(service_clicked)
		fetch(ser)
		 .then(response => response.json())
		 .then(data => this.setState({ reviews: data }))
	}

	getNames = (temp) => {

		var service_clicked = temp;
		var url = `${baseUrl}/api/reviews/user_names/`;
		const ser = url.concat(service_clicked)
		fetch(ser)
		 .then(response => response.json())
		 .then(data => this.setState({ user_names: data }))

		var url1 = `${baseUrl}/api/reviews/prof_names/`;
		const ser1 = url1.concat(service_clicked)
		fetch(ser1)
		.then(response => response.json())
		.then(data => this.setState({ prof_names: data }))

	}

	 toggle = tab => {
		if(this.state.activeTab !== tab) this.setState({activeTab:tab});
		console.log(this.state.prof_names)
		console.log(this.state.reviews)
		}


	onClickbutton = () => {
		const { name } = this.props.match.params;
		const url1 = '/service/';
		const url2 = name;
		const url3 = '/services';
		const ser = url1.concat(url2).concat(url3)
			window.location.href=ser;
	}

	onClickProf = (id) => {
		// console.log(`wassup ${id}`)
		this.props.loadProf(id);
	}

	render(){
		const service=this.props.service.ser?this.props.service.ser.name:null;
		const use_service=this.props.service.ser;
		const {services} = this.state;
		const br = '\n'
		const worker=this.props.service.ser?this.props.service.ser.service_worker:null;
		console.log(this.state.prof_names)
		if (!this.props.token) {
			// Logout
			return <Redirect to="/" />;
		}
		const Style = {
			textAlign:'left',
		};
		if(this.props.service.isLoading){
			return <Container1/>
		}
		else{
		return(
			<div>
			<AppNavbar />
			<div className='jumb'>
				<Jumbotron fluid className="jumb2 serviceMainSlide">
					<Container fluid>
						<Row>
							<Col md="7">
								<span className="serviceJumb1">
									<h1 className="display-3 display-32">{service?service:null}</h1>
									<span style={{color:'white',fontSize:'20px'}}>At Your Doorstep</span>
								</span>
							</Col>
							<Col md="5" style={{textAlign:'left',color:'white'}}>
								<span>
									<ul style={{lineHeight:'300%'}}>
										<li><b>Doorstep repair within 90 mins</b></li>
										<li><b>Protection Against Damage Upto INR 10,000</b></li>
										<li><b>30 day post-service guarantee</b></li>
									</ul>
								</span>
							</Col>
						</Row>
					</Container>
				</Jumbotron>

				<Row>
					<Col sm="1"></Col>
					<Col sm="6">
      <Nav tabs>
        <NavItem className="forPointer">
          <NavLink
            className={classnames({ active: this.state.activeTab === '1' })}
            onClick={() => { this.toggle('1'); }}
          >
            About
          </NavLink>
        </NavItem>

        <NavItem className="forPointer">
          <NavLink
            className={classnames({ active: this.state.activeTab === '2'})}
            onClick={() => { this.toggle('2') }}
          >
          {worker?worker:null}s
          </NavLink>


        </NavItem>

        <NavItem className="forPointer">
          <NavLink
            className={classnames({ active: this.state.activeTab === '3' })}
            onClick={() => { this.toggle('3'); }}
          >
            Reviews
          </NavLink>


        </NavItem>

        <NavItem className="forPointer">
          <NavLink
            className={classnames({ active: this.state.activeTab === '4'})}
            onClick={() => { this.toggle('4') }}
          >
            Serivces
          </NavLink>


        </NavItem>



      </Nav>
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="1">

		<br/>
          <Row>
            <Col sm="6" style={Style}>
              <h2>About {use_service?use_service.service_worker:null}</h2>
            </Col>

            <Col sm="11" style={Style}>
             {use_service?use_service.about:null}
            </Col>
		  </Row>
        </TabPane>
        <TabPane tabId="2">
		<br />
          <Row>

				{this.state.serviceWorkers.map((item, index) => (
					<Col sm="6">
	              <Card body className='card_service'>
	                <CardTitle>
	                	{item.user.name[0].toUpperCase() +  item.user.name.slice(1)}
	                </CardTitle>
	                <CardText>A hardworking and efficient {service?service:null}</CardText>
	                <Link to='/showprofessional'><Button onClick={()=>this.onClickProf(item.user._id)}>View Profile</Button></Link>
	              </Card>
	              <br/>
	              </Col>

				))}



          </Row>
        </TabPane>
        <TabPane tabId="3">
		<br/>
		<Row>

            <Col sm="6" style={Style} className="head_ser_rev">
              <h2>Customer Reviews</h2>
            </Col>


			<br/>


			</Row>

				<div className="scrollbar" id="style-1" style={{maxHeight: 300,width:'100%'}}>
            {this.state.reviews.map((item, index) => (
				<div>
              <Row className="colgrp_reviews" style={{marginRight:'5%', border:'1px solid #e0d8d7'}}>
				  <Col md="2" style={{textAlign:'center',marginTop:'1%'}}>
						<FaUserAlt style={{fontSize:'30px'}}/>
					<br/>
					<div className='forstyle_username'>
						{this.state.user_names[item.user_id]}
					</div>
				  </Col>
				  <Col md="7" style={{textAlign:'left'}}>
				  <h5>
				  {this.state.prof_names[item.professional_id]}
				  </h5>

						{item.review}
				  </Col>
				  <Col md="3">
					<span style={{fontSize:'25px'}}>{item.rating}</span>
					<span style={{fontSize:'15px'}}>/5</span><br/>

					{(item.rating===1)?
						<span>
							<span style={{color:'#ffe100'}}><FaStar/></span>
							<span style={{}}><FaRegStar/><FaRegStar/><FaRegStar/><FaRegStar/></span>
						</span>
					:''}

					{(item.rating===2)?
						<span>
							<span style={{color:'#ffe100'}}><FaStar/><FaStar/></span>
							<span style={{}}><FaRegStar/><FaRegStar/><FaRegStar/></span>
						</span>
					:''}

					{(item.rating===3)?
						<span>
							<span style={{color:'#ffe100'}}><FaStar/><FaStar/><FaStar/></span>
							<span style={{}}><FaRegStar/><FaRegStar/></span>
						</span>
					:''}

					{(item.rating===4)?
						<span>
							<span style={{color:'#ffe100'}}><FaStar/><FaStar/><FaStar/><FaStar/></span>
							<span style={{}}><FaRegStar/></span>
						</span>
					:''}

					{(item.rating===5)?
						<span>
							<span style={{color:'#ffe100'}}><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></span>
						</span>
					:''}


				  </Col>

			  </Row>
			  <br/>
			  </div>
            ))}
				</div>





        </TabPane>

        <TabPane tabId="4">

          <Row>
            <Col sm="12">

	<Table>
      <thead>
        <tr>
          <th>Service Type</th>
          <th>Price (INR)</th>
        </tr>
      </thead>
      <tbody>


	  {this.state.services.map((item) => (
		<tr>
			<td>{item.service_type}</td>
			<td>{item.cost}</td>
		</tr>
		))}





      </tbody>
    </Table>

            </Col>

          </Row>
        </TabPane>
      </TabContent>
					</Col>
					<Col sm="3">
						<Card body>
							<CardTitle>Need {worker?worker:null} for	</CardTitle>
								<Button onClick={() => {this.onClickbutton()}}>Choose Services</Button>
						</Card>
					</Col>
				</Row>

			</div>
			<br/><br/><br/>
			<Footer>
			<Footer/>
			</Footer>
			</div>
		)
	}
	}
}

Service.propTypes={
	loadUser:PropTypes.func.isRequired,
	token:PropTypes.string.isRequired,
	get_service:PropTypes.func.isRequired,
	service:PropTypes.object.isRequired,
	loadProf:PropTypes.func.isRequired
}



const mapStateToProps=state=>({
token:state.auth.token,
service:state.service,
})
export default connect(mapStateToProps,{loadUser, loadProf, get_service})(Service)
