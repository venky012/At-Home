import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonToolbar, Container, ListGroup, ListGroupItem, Button, Row, Col, Table, TabContent, TabPane } from 'reactstrap'
import { loadUser } from '../actions/authActions'
import { myorders } from '../actions/profActions'
import ReactTimeout from "react-timeout";

import Card from 'react-bootstrap/Card'
import {
  Redirect
} from "react-router-dom";

import PropTypes from 'prop-types'
import AppNavbar from './AppNavbar';
import Footer from './Footer'


class Myorders extends Component {

  constructor(props) {
    super(props)
    this.state = {
      flag: null,
      from_ctrlf: true,
      from_amazon: false,
      from_other: false

    }

  }

  myBookings = () => {
    this.props.myorders(this.props.user._id)
  }

  setPage = (value) => {
    if (value === 'ctrlf') {
      this.setState({
        from_ctrlf: true,
        from_amazon: false,
        from_other: false
      })
    }
    else if (value === 'amazon') {
      this.setState({
        from_ctrlf: false,
        from_amazon: true,
        from_other: false
      })
    }
    else if (value === 'other') {
      this.setState({
        from_ctrlf: false,
        from_amazon: false,
        from_other: true
      })
    }
  }

  async componentDidMount() {
    await this.props.loadUser()
    this.props.setTimeout(this.myBookings, 100);
  }

  render() {
    const user_orders = this.props.orderList ? this.props.orderList : null;
    if (!this.props.token) {
      return <Redirect to="/" />;
    }

    if (this.state.flag) {
      return <Redirect to="/location" />;
    }
    return (
      <div>
        <AppNavbar />
        <h1>My Orders</h1>
        <div style={{ marginLeft: '35%' }}>
          <ButtonToolbar> <Button variant="outline-dark" onClick={() => { this.setPage('ctrlf') }}>From AtHome</Button></ButtonToolbar>
        </div>
        {
          this.state.from_ctrlf ?
            <div style={{ alignContent: 'center', marginTop: '20px' }}>
              <h3>From CtrlF</h3>
              <Container style={{backgroundColor:"grey",borderColor:"blanchedalmond",borderStyle:"inset outset"}}>
                <Row style={{color:"lightgoldenrodyellow", borderTop: '1px solid #EDE8FF', borderBottom: '1px solid #EDE8FF', padding: '10px 10px'}}>
                  <Col md="1"><b>Date</b></Col>
                  <Col md="2"><b>Services Chosen</b></Col>
                  <Col md="3"><b>Address</b></Col>
                  <Col md="3"><b>Professional Details</b></Col>
                  <Col md="1"><b>Slot Booked</b></Col>
                  <Col md="1"><b>Total Cost</b></Col>

                </Row>


                {
                  user_orders ?
                    user_orders.map((item) =>
                      item.is_organisation === 0 ?
                        <Row className="mybooks_row" style={{ borderTop: '1px solid #EDE8FF', borderBottom: '1px solid #EDE8FF', padding: '10px 10px' }}>
                          <Col md="1">{item.date}</Col>
                          <Col md="2">
                            <ul>
                              {item.services_chosen.map((ser) => (
                                <li> {ser} </li>
                              ))}
                            </ul>
                          </Col>
                          <Col md="3">
                            {item.address}
                            <br />
                            <b>City : </b> {item.city}
                          </Col>

                          <Col md="3">
                            <b>Name : </b> {item.user_name}
                            <br />
                            <b>Email : </b>{item.user_email}
                          </Col>

                          <Col md="1">{item.slot}</Col>

                          <Col md="1">Rs. {item.total_cost}</Col>
                          <br />


                          <br />

                        </Row>
                        : null
                    )
                    : null

                }
              </Container>
            </div>
            : null
        }
        {
          this.state.from_amazon ?
            <div style={{ alignContent: 'center', marginTop: '20px' }}>
              <h3>From Amazon</h3>
              <Container>
                <Row style={{ borderTop: '1px solid #EDE8FF', borderBottom: '1px solid #EDE8FF', padding: '10px 10px' }}>
                  <Col md="1"><b>Date</b></Col>
                  <Col md="2"><b>Services Chosen</b></Col>
                  <Col md="3"><b>Address</b></Col>
                  <Col md="3"><b>Professional Details</b></Col>
                  <Col md="1"><b>Slot Booked</b></Col>
                  <Col md="1"><b>Total Cost</b></Col>

                </Row>


                {
                  user_orders ?
                    user_orders.map((item) =>
                      item.is_organisation === 1 ?
                        <Row className="mybooks_row" style={{ borderTop: '1px solid #EDE8FF', borderBottom: '1px solid #EDE8FF', padding: '10px 10px' }}>
                          <Col md="1">{item.date}</Col>
                          <Col md="2">
                            <ul>
                              {item.services_chosen.map((ser) => (
                                <li> {ser} </li>
                              ))}
                            </ul>
                          </Col>
                          <Col md="3">
                            {item.address}
                            <br />
                            <b>City : </b> {item.city}
                          </Col>

                          <Col md="3">
                            <b>Name : </b> {item.user_name}
                            <br />
                            <b>Phone : </b>{item.user_phone}
                          </Col>

                          <Col md="1">{item.slot}</Col>

                          <Col md="1">Rs. {item.total_cost}</Col>
                          <br />


                          <br />

                        </Row>
                        : null
                    )
                    : null

                }
              </Container>
            </div>
            : null
        }
        {
          this.state.from_other ?
            <div style={{ alignContent: 'center', marginTop: '20px' }}>
              <h3>From Other</h3>
              <Container>
                <Row style={{ borderTop: '1px solid #EDE8FF', borderBottom: '1px solid #EDE8FF', padding: '10px 10px' }}>
                  <Col md="1"><b>Date</b></Col>
                  <Col md="2"><b>Services Chosen</b></Col>
                  <Col md="3"><b>Address</b></Col>
                  <Col md="3"><b>Professional Details</b></Col>
                  <Col md="1"><b>Total Cost</b></Col>

                </Row>


                {
                  user_orders ?
                    user_orders.map((item) =>
                      item.is_organisation === 2 ?
                        <Row className="mybooks_row" style={{ borderTop: '1px solid #EDE8FF', borderBottom: '1px solid #EDE8FF', padding: '10px 10px' }}>
                          <Col md="1">{item.date}</Col>
                          <Col md="2">
                            <ul>
                              {item.services_chosen.map((ser) => (
                                <li> {ser} </li>
                              ))}
                            </ul>
                          </Col>
                          <Col md="3">
                            {item.address}
                            <br />
                            <b>City : </b> {item.city}
                          </Col>

                          <Col md="3">
                            <b>Name : </b> {item.user_name}
                            <br />
                            <b>Phone : </b>{item.user_phone}
                          </Col>

                          <Col md="1">Rs. {item.total_cost}</Col>
                          <br />


                          <br />

                        </Row>
                        : null
                    )
                    : null

                }
              </Container>
            </div>
            : null
        }

        <Footer>
          <Footer />
        </Footer>
      </div>
    )
  }
}

Myorders.propTypes = {
  token: PropTypes.string,
  myorders: PropTypes.func.isRequired,
  orderList: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  token: state.auth.token,
  orderList: state.prof.my_orders,
  user: state.auth.user
})

export default ReactTimeout(connect(mapStateToProps, { loadUser, myorders })(Myorders));
