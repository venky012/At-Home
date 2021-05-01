import { addCity } from '../../actions/adminActions'
import { getCities } from '../../actions/locationAction'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FaArrowCircleLeft } from 'react-icons/fa'
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



class Admincity extends Component {

  state = {
    flag: null,
    flag2: null,
    modal: false,
    city: null,
    lat: null,
    lng: null,
    end: null,
    msg: null,
  }

  componentDidMount() {
    this.props.getCities()
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
    var all_cities = this.props.cities
    if (e.target.name === 'city') {

      for (k in all_cities) {
        if (all_cities[k]["city"] === e.target.value) {
          this.setState({ msg: 'City already exists' })
          break;
        }

        else {
          this.setState({ msg: null })
        }
      }

    }

  }

  onSubmit = async (e) => {
    // e.preventDefault()

    const { city, lat, lng } = this.state
    const service_added = { city, lat, lng }
    if (service_added != null) {
      const value = await this.props.addCity(service_added)
      this.setState({ flag: 1 })
    }
  }


  render() {
    const cities = this.props.cities ? this.props.cities : null;
    if (this.state.flag2) {
      return <Redirect to='/admin' />
    }
    return (
      <div>
        <AppNavbar />
        <br />
        <div className="container">
        <Button onClick={this.toggle}>Add City</Button>
        <Button style={{ float:'right'}} onClick={this.goBack}><FaArrowCircleLeft /></Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Enter the city details</ModalHeader>
          <ModalBody>
            {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}

            <Form onSubmit={this.onSubmit}>
              <FormGroup>

                <Label for="City">City Name</Label>
                <Input
                  type="string"
                  name="city"
                  id="city"
                  placeholder="City name"
                  onChange={this.onChange}
                />
                <br />
                <Label for="City">Latitude :</Label>
                <Input
                  type="number"
                  step="0.0001"
                  name="lat"
                  id="lat"
                  placeholder="Latitude"
                  onChange={this.onChange}
                />
                <Label for="City">Longitude :</Label>
                <Input
                  type="number"
                  step="0.0001"
                  name="lng"
                  id="lng"
                  placeholder="Longitude"
                  onChange={this.onChange}
                />

                {(this.state.msg) ? ' ' :
                  <Button color="dark" block>
                    Add city
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
              <h1>Available cities</h1>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md="12">
              <Col md="8">

                <Container>
                  <Row>

                    {
                      cities ?

                        cities.map((item) => (
                          <Col md={{ size: 3, offset: 1 }} className="city" >

                            {item.city}


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

Admincity.propTypes = {
  cities: PropTypes.object.isRequired,
  getCities: PropTypes.func.isRequired,
  addCity: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  cities: state.booking.all_cities
})


export default connect(mapStateToProps, { addCity, getCities })(Admincity)
