import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import store from '../store'
import { loadUser, editProfile } from '../actions/authActions'
import {
  Redirect
} from "react-router-dom";
import '../index.css';
import image from '../img.JPG';
import { Row, Col } from 'reactstrap';
import { Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import Footer from './Footer'

import { FaUserAlt, FaStar, FaRegStar } from "react-icons/fa";
import { ButtonToolbar } from 'react-bootstrap';
import PropTypes from 'prop-types'
import ReactTimeout from "react-timeout";

const baseUrl = process.env.REACT_APP_BASE_URL;

class ShowProfile extends Component {
  async componentDidMount() {
    await this.props.loadUser();
    this.props.setTimeout(() => { this.getReviews(this.props.user._id) }, 200)
    this.props.setTimeout(() => { this.getNames(this.props.user._id) }, 200)

  }





  constructor(props) {
    super(props);

    this.state = {
      editprofileshow: false,
      about: '',
      contact: '',
      email: '',
      address: '',
      profilepic: '',
      content1: true,
      content2: false,
      content3: false,
      content4: false,
      modal: false,
      prof_names: {},
      reviews: []
    }

    this.myfun1 = this.myfun1.bind(this);
    this.myfun2 = this.myfun2.bind(this);
    this.myfun3 = this.myfun3.bind(this);
    this.myfun4 = this.myfun4.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getReviews(id) {
    console.log(id)
    var url = `${baseUrl}/api/reviews/user/reviews/`;
    const ser = url.concat(id)
    fetch(ser)
      .then(response => response.json())
      .then(data => this.setState({ reviews: data }))
  }

  getNames(id) {

    var url1 = `${baseUrl}/api/reviews/user_names/profile/`;
    const ser1 = url1.concat(id)
    fetch(ser1)
      .then(response => response.json())
      .then(data => this.setState({ prof_names: data }))

  }


  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const id = this.props.user._id
    const { about, contact, email, address, profilepic } = this.state
    this.props.editProfile(id, about, contact, email, address)
    this.toggle()
  }

  myfun1() {
    this.setState(
      {
        content1: true,
        content2: false,
        content3: false,
        content4: false
      }

    );

  }


  myfun2() {
    this.setState(
      {
        content1: false,
        content2: true,
        content3: false,
        content4: false,
      });

  }


  myfun3() {
    this.setState({
      content1: false,
      content2: false,
      content3: true,
      content4: false
    });

  }


  myfun4() {
    this.setState({
      content1: false,
      content2: false,
      content3: false,
      content4: true
    });

  }

  toggle = () => {
    this.setState({ modal: !this.state.modal })
  }


  render() {

    const name = this.props.user ? this.props.user.name : null;
    const email = this.props.user ? this.props.user.email : null;
    const profilepic = this.props.user && this.props.user.profilepic ? this.props.user.profilepic : '';
    console.log(profilepic);
    let editprofileclose = () => this.setState({ editprofileshow: false });
    console.log(this.state.reviews)

    if (!this.props.token) {
      // Logout
      return <Redirect to="/" />;
    }

    // --------------------------------------------------------------------------------------------------------


    return (
      <div className="row_class">
        <AppNavbar />
        <br />

        <Container>
          <Row>
            <Col md="12">
              <h1>Your Profile</h1>
            </Col>
          </Row>

          <Row>
            <Col md="3" className="imag">
              <img src={profilepic} className="imag" />
            </Col>
            <Col md="6" className="name">

              <h1>
                <span className="profile1">  {name ? name : null}</span>



                <Button onClick={this.toggle} className="profile2">Edit Profile</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                  <ModalHeader toggle={this.toggle}>Update your profile</ModalHeader>
                  <ModalBody>
                    <div className="update_profile">
                      <Container>
                        <Row>
                          <Col sm="8">
                            <Form className="formclass">
                              <FormGroup>

                                <Label>About</Label>
                                <Input
                                  type="text"
                                  name="about"
                                  value={this.state.value}
                                  onChange={this.handleChange}

                                />
                              </FormGroup>

                              <FormGroup>

                                <Label>Contact</Label>
                                <Input
                                  type="tel"
                                  name="contact"
                                  value={this.state.value}
                                  onChange={this.handleChange}

                                />

                              </FormGroup>

                              <FormGroup>

                                <Label>E-mail</Label>
                                <Input
                                  type="email"
                                  name="email"
                                  value={this.state.value}
                                  onChange={this.handleChange}

                                />
                              </FormGroup>

                              <FormGroup>

                                <Label>Address</Label>
                                <Input
                                  type="text"
                                  name="address"
                                  value={this.state.value}
                                  onChange={this.handleChange}

                                />


                              </FormGroup>

                            </Form>
                            <div className="update_btn">
                              <span className="update_btn1">   
                              <Button onClick={this.handleSubmit}>Update</Button>
                              <Button style={{marginLeft:'10px'}} onClick={this.toggle}>Cancel</Button>
                              </span>
                            </div>
                          </Col>
                        </Row>
                      </Container>

                    </div>
                  </ModalBody>
                  <ModalFooter >
                  </ModalFooter>
                </Modal>


              </h1>


              {email ? email : null}
            </Col>
          </Row>

          <br /><br />

          <Row>
            <Col md="3">
              <div className="prof_btn">
                <Button className="button_prof" onClick={this.myfun1}>About</Button><br /><br />
                <Button className="button_prof" onClick={this.myfun2}>My Reviews</Button><br /><br />
                <Button className="button_prof" onClick={this.myfun3}>Bookings</Button><br /><br />
                <Button className="button_prof" onClick={this.myfun4}>Personal Information</Button>
              </div>
            </Col>
            <Col md="8" className="prof_data">

              <span>
                {this.state.content1 ? <div>

                  <h3>About</h3>

                  <p> {this.props.user ? this.props.user.about : null}</p>


                </div> : null}
              </span>


              <span>
                {this.state.content2 ? <div>
                  <h3>My Reviews:</h3>
                  {this.state.reviews.map((item, index) => (
                    <div>
                      <Row className="colgrp_reviews" style={{ marginRight: '5%', border: '1px solid #e0d8d7' }}>
                        <Col md="2" style={{ textAlign: 'center', marginTop: '1%' }}>
                          <FaUserAlt style={{ fontSize: '30px' }} />
                          <br />
                        </Col>
                        <Col md="7" style={{ textAlign: 'left' }}>
                          <h3>
                            {this.state.prof_names[item.professional_id]}
                          </h3>

                          {item.review}
                        </Col>
                        <Col md="3">
                          <span style={{ fontSize: '25px' }}>{item.rating}</span>
                          <span style={{ fontSize: '15px' }}>/5</span><br />

                          {(item.rating === 1) ?
                            <span>
                              <span style={{ color: '#ffe100' }}><FaStar /></span>
                              <span style={{}}><FaRegStar /><FaRegStar /><FaRegStar /><FaRegStar /></span>
                            </span>
                            : ''}

                          {(item.rating === 2) ?
                            <span>
                              <span style={{ color: '#ffe100' }}><FaStar /><FaStar /></span>
                              <span style={{}}><FaRegStar /><FaRegStar /><FaRegStar /></span>
                            </span>
                            : ''}

                          {(item.rating === 3) ?
                            <span>
                              <span style={{ color: '#ffe100' }}><FaStar /><FaStar /><FaStar /></span>
                              <span style={{}}><FaRegStar /><FaRegStar /></span>
                            </span>
                            : ''}

                          {(item.rating === 4) ?
                            <span>
                              <span style={{ color: '#ffe100' }}><FaStar /><FaStar /><FaStar /><FaStar /></span>
                              <span style={{}}><FaRegStar /></span>
                            </span>
                            : ''}

                          {(item.rating === 5) ?
                            <span>
                              <span style={{ color: '#ffe100' }}><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></span>
                            </span>
                            : ''}


                        </Col>

                      </Row>
                      <br />
                    </div>
                  ))}



                  <div className=''>
                  </div>
                  <br />
                  <div className=''>
                  </div>
                </div> : null}
              </span>


              <span>
                {this.state.content3 ? <div>
                  <h3>My Bookings:</h3>

                  <Table>
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Customer Name</th>
                        <th>Order-Id</th>
                        <th>Total Cost(INR)</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Venkatesh</td>
                        <td>CF14564</td>
                        <td>170</td>
                        <td style={{ color: 'green' }}>Done</td>
                        <td>5 Mar 2021</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Ranga</td>
                        <td>CF67804</td>
                        <td>567</td>
                        <td style={{ color: 'orange' }}>Not Done</td>
                        <td>8 Mar 2021</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Srinivasa</td>
                        <td>CF89456</td>
                        <td>400</td>
                        <td style={{ color: 'green' }}>Done</td>
                        <td>20 Mar 2021</td>
                      </tr>
                    </tbody>
                  </Table>

                </div> : null}
              </span>


              <span>
                {this.state.content4 ? <div>
                  <Table borderless>

                    <tbody>
                      <tr>

                        <td><b>Contact</b></td>
                        <td>{this.props.user ? this.props.user.contact : null}</td>

                      </tr>
                      <tr>

                        <td><b>Email</b></td>
                        <td>{this.props.user ? this.props.user.email : null}</td>

                      </tr>
                      <tr>

                        <td><b>Address</b></td>
                        <td>{this.props.user ? this.props.user.address : null}</td>

                      </tr>
                    </tbody>
                  </Table>
                </div> : null}
              </span>




            </Col>
          </Row>
        </Container>


        <Footer>
          <Footer />
        </Footer>
      </div>

    );
  }
}



ShowProfile.propTypes = {
  user: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  token: PropTypes.string,
  editProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user,
  token: state.auth.token
})
export default ReactTimeout(connect(mapStateToProps, { loadUser, editProfile })(ShowProfile))
