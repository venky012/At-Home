import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, ListGroup, ListGroupItem, Button, Row, Col, Table, TabContent, TabPane } from 'reactstrap'
import { getSlots, bookSlot } from '../actions/slotActions'
import AppNavbar from './AppNavbar';
import Footer from './Footer'
import Container1 from './Container1'
import {
  Redirect
} from "react-router-dom";


import PropTypes from 'prop-types'
const baseUrl = process.env.REACT_APP_BASE_URL;


class Slot extends Component {

  state = {
    flag: null,
    all_dates: [],
    select_date: 0,
    date_border: ['3px solid black', '2px solid gray', '2px solid gray'],
    date_back: ['#dbdbdb', '', '']
  }


  componentDidMount() {
    this.props.getSlots()
    this.getDates();
  }

  getDates() {
    fetch(`${baseUrl}/api/slot/dates`)
      .then(response => response.json())
      .then(data => this.setState({ all_dates: data }))
  }

  setDate = (value) => {
    //console.log('selected date')
    this.setState({ select_date: value })
    var temp_array = ['2px solid gray', '2px solid gray', '2px solid gray']
    var temp_back = ['', '', '']
    temp_array[value] = '3px solid black'
    temp_back[value] = '#dbdbdb'
    this.setState({ date_border: temp_array })
    this.setState({ date_back: temp_back })
  }

  bookslot = async (e) => {
    console.log('in booking slot...........')
    const { select_date } = this.state
    console.log(e, this.props.order)
    const slottter = await this.props.bookSlot(e, this.props.order, select_date);
    this.setState({ flag: true })
  }

  render() {
    const slots_available = this.props.Slots.all_slots ? this.props.Slots.all_slots : null;
    if (!this.props.token) {
      return <Redirect to="/" />;
    }

    if (this.state.flag) {
      return <Redirect to="/location" />;
    }

    // if(this.props.Slots.isLoading){
    //   return <Container1/>
    // }
    // else{
    return (

      <div >
        <AppNavbar />
        <Container>
          <br /><br />
          <Row>
            <Col md="12">
              <h1>Choose a Date</h1>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Col md="8" style={{ marginLeft: '20%' }}>
                <Container>
                  <Row>
                    <Col md="3" style={{ border: this.state.date_border[0], backgroundColor: this.state.date_back[0] }} onClick={() => { this.setDate(0) }} className="date_select">
                      Today
    </Col>
                    <Col md="3" style={{ border: this.state.date_border[1], backgroundColor: this.state.date_back[1] }} onClick={() => { this.setDate(1) }} className="date_select">
                      {this.state.all_dates[1]}
                    </Col>
                    <Col md="3" style={{ border: this.state.date_border[2], backgroundColor: this.state.date_back[2] }} onClick={() => { this.setDate(2) }} className="date_select">
                      {this.state.all_dates[2]}
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Col>
          </Row>
          <br /><br />
          <Row>
            <Col md="12">
              <h1>Choose a Slot</h1>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md="12">
              <Col md="8" style={{ marginLeft: '20%' }}>

                <Container>
                  <Row>

                    {
                      slots_available ?

                        slots_available.map((item) => (
                          <Col md="3" className="slot_select1" onClick={() => { this.bookslot(item._id) }}>

                            <span>{item.start_time}:00 - </span>
                            <span>{item.end_time}:00</span>

                          </Col>

                        ))

                        : null
                    }

                  </Row>
                </Container>

              </Col>
            </Col>
          </Row>
        </Container>
        <Footer>
          <Footer />
        </Footer>
      </div>
    )
  }
  //}
}

Slot.propTypes = {
  token: PropTypes.string,
  getSlots: PropTypes.func.isRequired,
  Slots: PropTypes.object.isRequired,
  bookSlot: PropTypes.func.isRequired,
  order: PropTypes.string
}

const mapStateToProps = state => ({
  Slots: state.slots,
  token: state.auth.token,
  order: state.order.order_id
})
export default connect(mapStateToProps, { getSlots, bookSlot })(Slot)
