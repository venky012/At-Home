import { allServices, addService } from '../../actions/adminActions'
import React, { Component } from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { connect } from 'react-redux'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from 'reactstrap'
import AppNavbar from '../AppNavbar'
import Footer from '../Footer'
import { getSlots } from '../../actions/slotActions'
import { addSlot } from '../../actions/adminActions'
import { Container, Row, Col, Table, TabContent, TabPane } from 'reactstrap'
import '../../index.css'
import {
  Redirect
} from "react-router-dom";


import PropTypes from 'prop-types'



class AdminSlots extends Component {

  state = {
    flag: null,
    flag2: null,
    modal: false,
    start: null,
    end: null,
    msg: null,
  }

  componentDidMount() {
    this.props.getSlots()
  }

  toggle = () => {

    this.setState({
      modal: !this.state.modal,
      msg: null,

    })
  }
  goBack = () => {
    this.setState({ flag2: true })
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    var k = null;
    var all_slots = this.props.slots
    if (e.target.name === 'start') {

      for (k in all_slots) {
        if (all_slots[k]["start_time"] === e.target.value) {
          if (all_slots[k]["end_time"] === this.state.end) {

            this.setState({ msg: 'slot already exists' })
            break;
          }
        }
        else {
          this.setState({ msg: null })
        }
      }

    }
    if (e.target.name === 'end') {
      for (k in all_slots) {
        if (all_slots[k]["start_time"] === this.state.start) {
          if (all_slots[k]["end_time"] === e.target.value) {

            this.setState({ msg: 'slot already exists' })
            break;
          }
        }
        else {
          this.setState({ msg: null })
        }
      }

    }


  }

  onSubmit = async (e) => {
    // e.preventDefault()

    const { start, end } = this.state
    const service_added = { start, end }
    if (service_added != null) {
      const value = await this.props.addSlot(service_added)
      this.setState({ flag: 1 })
    }
  }


  render() {
    const slots = this.props.slots ? this.props.slots : null;
    if (this.state.flag2) {
      return <Redirect to='/admin' />
    }
    return (
      <div>
        <AppNavbar />
        <br />
        <div className="container">
        <Button onClick={this.toggle}>Add Slot</Button>
        <Button style={{ float:'right' }} onClick={this.goBack}><FaArrowCircleLeft /></Button>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Enter the slot details</ModalHeader>
          <ModalBody>
            {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}

            <Form onSubmit={this.onSubmit}>
              <FormGroup>

                <Label for="Slot">Start Time</Label>
                <Input
                  type="string"
                  name="start"
                  id="start"
                  placeholder="start time"
                  onChange={this.onChange}
                />
                <br />
                <Label for="Slot">End Time</Label>
                <Input
                  type="string"
                  name="end"
                  id="end"
                  placeholder="end time"
                  onChange={this.onChange}
                />

                {(this.state.msg) ? ' ' :
                  <Button color="dark" block>
                    Add Slot
            </Button>
                }
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>

        <Container>
          <br /><br />
          <Row>
            <Col md="12">
              <h1>Available Slots</h1>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md="12">
              <Col md="8">

                <Container>
                  <Row>

                    {
                      slots ?

                        slots.map((item) => (
                          <Col md={{ size: 3, offset: 1 }} className="slot_select" >

                            {item.start_time} -  {item.end_time}


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
        </div>
        <Footer>
          <Footer />
        </Footer>
      </div>
    )
  }

}

AdminSlots.propTypes = {
  slots: PropTypes.object.isRequired,
  getSlots: PropTypes.func.isRequired,
  addSlot: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  slots: state.slots.all_slots
})


export default connect(mapStateToProps, { getSlots, addSlot })(AdminSlots)
