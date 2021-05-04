
import React from "react";
import { Form, FormGroup, Label, Input, Button, Container, Row, Col, Table, TabContent, TabPane } from 'reactstrap'
import { bookSlot,getCities } from '../actions/locationAction'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import PropTypes from 'prop-types'
import { geolocated } from "react-geolocated";
import { connect } from 'react-redux'
import AppNavbar from'./AppNavbar';
import Footer from './Footer'

import {
  Redirect
} from "react-router-dom";

class Currentloco extends React.Component {
  state = {
    city:'Select City',
    address: null,
    position: {
      lat: null,
      lng: null
    },
    flag:null
  }


  componentDidMount(){
    this.props.getCities()
 }


  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  sendAddress(position, address,city) {
    var id = this.props.order.order_id
    console.log(id)
    this.props.bookSlot(id, position.lat, position.lng, address,city)
    this.setState({flag:2})
  }

  handleChange = (value) => {
    this.setState({
        city: value
    });
  }

  setLocation = (lat1, lng1) => {
    this.setState({
      position: {
        lat: lat1,
        lng: lng1
      },
      flag:1
    })

  }

  render() {
    if(!this.props.isGeolocationAvailable)
      return(<div>Your browser does not support Geolocation</div>)
      if(this.props.coords && this.state.flag===null)
      {
        this.setLocation(this.props.coords.latitude,this.props.coords.longitude)
      }
      if(this.state.flag==2)
      {
        return <Redirect  to={{
          pathname: "/displaybooking",
          state: { order_id: this.props.order.order_id }
      }}
         />;
      }
    return (
      <div>
      <AppNavbar />
        <br/><br/>

        <Container>
          <Row  style={{marginRight:'4%'}}>
            <Col md="12">
              <h1>Address</h1>
            </Col>
          </Row>
          <Row>
            <Col md="5">
            <Table borderless style={{textAlign:'left',marginLeft:'70%'}}>
              <tr>
                <td colspan="2">
                  <Form>
                  <FormGroup>
                    <Input type="textarea" name="address" id="address" placeholder="Enter your address here..." onChange={this.onChange} cols="10" rows="5" className="input_add" />
                  </FormGroup>
                  </Form>
                </td>
              </tr>
              <tr>
                <td>
                <DropdownButton style={{borderLeftWidth:'0px'}} id="dropdown-basic-button" className="dd_btn"  title={this.state.city}>

                   {
                    this.props.all_cities?
                    this.props.all_cities.map((item) => (
                    <Dropdown.Item value={item.city} onSelect={()=>{this.handleChange(item.city)}} >{item.city}</Dropdown.Item>
                    )
                    )
                    : null
                  }
                  </DropdownButton>
                </td>
                <td><Button onClick={() => { this.sendAddress(this.state.position, this.state.address,this.state.city) }}>Continue to Checkout</Button></td>
              </tr>
            </Table>


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


Currentloco.propTypes = {
  order: PropTypes.object.isRequired,
  bookSlot: PropTypes.func.isRequired,
  getCities: PropTypes.func.isRequired,
  all_cities: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  order: state.order,
  all_cities: state.booking.all_cities
})

export default connect(mapStateToProps, { bookSlot,getCities })( geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Currentloco))
