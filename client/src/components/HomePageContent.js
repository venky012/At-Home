import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import {
	Card, CardImg, CardText, CardBody,
	CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import '../index.css';
import img1 from '../assets/img1_forHome.jpg';
import img_row2_col1 from '../assets/service.png';
import about_img from '../assets/about-img-4.jpg';
import carpenter from '../assets/carpenter.jpg';
import plumber from '../assets/plumber.jpg';
import electrician from '../assets/electrician.jpg';
import hair_stylist from '../assets/hair_stylist.jpg';
import { Redirect, Link } from "react-router-dom"
import { FaTools, FaWallet, FaClock, FaMapMarkedAlt } from 'react-icons/fa';
import AppNavbar from './AppNavbar';
import Footer from './Footer'
import ReactTimeout from "react-timeout";
import Container1 from './Container1'

class HomePageContent extends Component {
	state = { isLoading: true }
	componentDidMount() {
		this.props.setTimeout(() => { this.setState({ isLoading: false }) }, 200)
	}

	render() {
		if (this.state.isLoading) {
			return <Container1 />
		}
		else {
			return (
				<div className="hpc">
					<AppNavbar />
					<Jumbotron className="mainSlide">
						<h1 className="display-3 display-31">At-Home</h1>
						<p className="lead lead1">Home Repair Service</p>
						<br />
						<br />
					</Jumbotron>
					<br /><br />
						<section className="about-section-three">
							<div className="auto-container">
								<div className="row">
									<div className="content-column col-lg-5 col-md-12 col-sm-12"  style={{margin:'auto'}}>
										<div className="inner-column">
											<div className="sec-title clearfix">
												<span className="title">At-Home</span>
												<h2>We provide</h2>
											</div>
											<ul className="list-style-one">
												<li>Dedicated and knowledgeable professionals</li>
												<li>Offering all jobs guranteed & neatly done</li>
												<li>We provide 24/7 on time services</li>
												<li>30 day post-service guarantee</li>
												<li>Protection Against Damage Upto INR 10,000</li>
											</ul>
										</div>
									</div>

									<div className="image-column col-lg-7 col-md-12 col-sm-12">
										<div className="inner-column" style={{maxWidth:'100%'}}>
											<figure className="image wow fadeIn"><img src={about_img} alt=""/></figure>
										</div>
									</div>
								</div>
							</div>
						</section>
						<br /><br /><br /><br />
						<Container>
						<Row>
							<Col md="12">
								<h4>Our Services</h4>
								<hr className="summary_stype_underline1" />
							</Col>
						</Row>
						<br /><br />
						<Row>

							<Col md="3" className="hpc_row2">
								<Link className="hpc_row2_link" to="/service/carpenter">
									<br />
									<img src={carpenter} className="img2" />	<br /><br />
								</Link>
								<span className="hpc_img_name">Carpenter</span>

							</Col>


							<Col md="3" className="hpc_row2">
								<Link className="hpc_row2_link" to="/service/plumber">
									<br />
									<img src={plumber} className="img2" />	<br /><br />
								</Link>
								<span className="hpc_img_name">Plumber</span>

							</Col>


							<Col md="3" className="hpc_row2">
								<Link className="hpc_row2_link" to="/service/electrician">
									<br />
									<img src={electrician} className="img2" />	<br /><br />
								</Link>
								<span className="hpc_img_name">Electrician</span>

							</Col>


							<Col md="3" className="hpc_row2">
								<Link className="hpc_row2_link" to="/service/hair stylist">
									<br />
									<img src={hair_stylist} className="img2" />	<br /><br />
								</Link>
								<span className="hpc_img_name">Hair Stylist</span>

							</Col>

						</Row>
						<br /><br /><br /><br /><br />
						<div class="row">
							<div class="col-lg-12">
								<div class="card">
									<div class="card-body">
										<h4 class="card-title mb-5">How to Book a Service?</h4>

										<div class="hori-timeline" dir="ltr">
											<ul class="list-inline events">
												<li class="list-inline-item event-list">
													<div class="px-4">
														<div class="event-date bg-soft-primary text-primary">Step 1</div>
														<h5 class="font-size-16">Select Service</h5>
														<p class="text-muted">Select your desired service and then check the reviews select type of services that you want to book.</p>
													</div>
												</li>
												<li class="list-inline-item event-list">
													<div class="px-4">
														<div class="event-date bg-soft-success text-success">Step 2</div>
														<h5 class="font-size-16">Select City</h5>
														<p class="text-muted">Select the city you live in and provide the address details or use the map to get the location to avail our services.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
													</div>
												</li>
												<li class="list-inline-item event-list">
													<div class="px-4">
														<div class="event-date bg-soft-danger text-danger">Step 3</div>
														<h5 class="font-size-16">Choose a Slot</h5>
														<p class="text-muted">Go through the payment process and wait for your assigned professional to arrive at your doorbell.</p>
													</div>
												</li>
												<li class="list-inline-item event-list">
													<div class="px-4">
														<div class="event-date bg-soft-warning text-warning">Step 4</div>
														<h5 class="font-size-16">Make Payment</h5>
														<p class="text-muted">Go through the payment process and wait for your assigned professional to arrive at your doorbell.</p>
													</div>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
						<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
						<Row>
							<Col md="12">
								<h4>Our Customer Reviews</h4>
								<hr className="summary_stype_underline1" />
							</Col>
						</Row>
						<br />
						<Row>
							<Col>
								<ListGroup>
									<ListGroupItem>
										<ListGroupItemText>
											<i>" Great service. Fixed the problems with ease."</i>
										</ListGroupItemText>
						- <b>John Doe</b>
									</ListGroupItem>
									<ListGroupItem>
										<ListGroupItemText>
											<i>" With the help of At-Home I started getting many opportunities and earn more."</i>
										</ListGroupItemText>
						- <b>Epsum</b>
									</ListGroupItem>
									<ListGroupItem>
										<ListGroupItemText>
											<i>" Made my job easier to make a slot at my convenient time to avail the service "</i>
										</ListGroupItemText>
						- <b>Lorem</b>
									</ListGroupItem>
								</ListGroup>
							</Col>
						</Row>
					</Container>
					<Footer>
						<Footer />
					</Footer>
				</div>
			)
		}
	}

}

export default ReactTimeout(HomePageContent)
