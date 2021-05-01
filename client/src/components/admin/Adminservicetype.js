import { getserviceType, addServiceType } from '../../actions/adminActions'
import React, { Component } from 'react'
import { Card, CardTitle, CardText } from 'reactstrap'
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

import { Container, Row, Col, Table, TabContent, TabPane } from 'reactstrap'
import '../../index.css'
import {
  Redirect
} from "react-router-dom";


import PropTypes from 'prop-types'



class Adminservicetype extends Component {

  state = {
    flag: null,
    flag2: null,
    modal: false,
    service_type: null,
    cost: null,
    msg: null,

  }

  componentDidMount() {
    const { name } = this.props.match.params;
    this.props.getserviceType(name)
  }

  toggle = () => {

    this.setState({
      modal: !this.state.modal,
      msg: null,
      msg2: null
    })
  }
  goBack = () => {
    this.setState({ flag2: true })
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    // console.log(e.target.value)
    if (e.target.name === 'service_type') {
      var k = null;
      var service_types = this.props.service_types
      for (k in service_types) {
        if (service_types[k]["service_type"] === e.target.value) {
          this.setState({ msg: 'service type already exists' })

          break
        }
        else {
          this.setState({ msg: null })
        }
      }
    }

    else {
      this.setState({ msg: null })
    }
  }

  onSubmit = async (e) => {
    // e.preventDefault()
    const { name } = this.props.match.params
    const { cost, service_type } = this.state
    const service_added = { name, service_type, cost }
    if (service_added != null) {
      const value = await this.props.addServiceType(service_added)
      this.setState({ flag: 1 })
    }
  }


  render() {
    const service_types = this.props.service_types ? this.props.service_types : null;
    if (this.state.flag2) {
      return <Redirect to='/admin/services' />
    }
    return (
      <div>
        <AppNavbar />
        <br />
        <div className="container">
        <Button onClick={this.toggle}>Add Service Type</Button>
        <Button style={{ float:'right' }} onClick={this.goBack}><FaArrowCircleLeft /></Button>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Enter the service type details</ModalHeader>
          <ModalBody>
            {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}

            <Form onSubmit={this.onSubmit}>
              <FormGroup>

                <Label for="service_type">Service Type</Label>
                <Input
                  type="string"
                  name="service_type"
                  id="name"
                  placeholder="service type"
                  onChange={this.onChange}
                />
                <br />
                <Label for="service_type">Cost</Label>
                <Input
                  type="number"
                  name="cost"
                  id="cost"
                  placeholder="cost"
                  onChange={this.onChange}
                />
                <br />

                {(this.state.msg) ? ' ' :
                  <Button color="dark" block>
                    Add Service Type
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
              <h1>Available Service Types</h1>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md="12">
              <Col md="8">

                <Container>
                  <Row>

                    {
                      service_types ?

                        service_types.map((item) => (
                          <Col md={{ size: 3, offset: 1 }} className="service_type" >

                            {item.service_type}<br />
            Rs.{item.cost}





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

Adminservicetype.propTypes = {
  service_types: PropTypes.object.isRequired,
  getserviceType: PropTypes.func.isRequired,
  addServiceType: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  service_types: state.admin.service_types
})


export default connect(mapStateToProps, { getserviceType, addServiceType })(Adminservicetype)
