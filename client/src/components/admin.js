import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Button, Row, Col, } from 'reactstrap'
import { Card, CardTitle, CardText } from 'reactstrap'

import {
  Redirect
} from "react-router-dom";
import AppNavbar from './AppNavbar';
import Footer from './Footer'

const baseUrl = process.env.REACT_APP_BASE_URL;

class Admin extends Component {
  state = {
    flag: null,
    details: []
  }


  goto(value) {
    this.setState({ flag: value })
  }

  componentDidMount() {
    this.getDetails();
  }

  getDetails = () => {
    fetch(`${baseUrl}/api/users/adetails`)
      .then(response => response.json())
      .then(data => this.setState({ details: data }))
  }

  render() {
    console.log(this.state.details)
    if (this.state.flag === 1) {
      return <Redirect to="/admin/services" />
    }
    if (this.state.flag === 2) {
      return <Redirect to="/admin/slots" />
    }
    if (this.state.flag === 3) {
      return <Redirect to="/admin/cities" />
    }
    return (
      <div>
        <AppNavbar />
        
        <Container>
          <br /><br />
          <Row>
            <Col md="12">
              <h1>Admin Page</h1>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md="12">
              <Col md="8" style={{ marginLeft: '20%' }}>

                <Container>


                  <Row>

                    <Col md="4" >
                      <Card body className="admin_data" >
                        <CardTitle><i class="fa fa-user-circle" aria-hidden="true"><br />Total Users - {this.state.details.no_users ? this.state.details.no_users : null}</i></CardTitle>


                      </Card>
                    </Col>


                    <Col md="4" >
                      <Card body className="admin_data" >
                        <CardTitle><i class="fas fa-user-tie"><br />Total Professionals - {this.state.details.no_professionals ? this.state.details.no_professionals : null}</i></CardTitle>


                      </Card>
                    </Col>


                    <Col md="4" >
                      <Card body className="admin_data" >
                        <CardTitle><i class="fas fa-shopping-cart"><br />Total Orders - {this.state.details.no_orders ? this.state.details.no_orders : null}</i></CardTitle>


                      </Card>
                    </Col>
                  </Row>
                  <br /><br />
                  <Row>

                    <Col md="4">
                      <Card body className="admin_data" >
                        <CardTitle><i class="fa fa-wrench"><br />Services</i></CardTitle>

                        <Button onClick={() => { this.goto(1) }}>View Services</Button>
                      </Card>
                    </Col>


                    <Col md="4">
                      <Card body className="admin_data" >
                        <CardTitle><i class="far fa-clock fas"><br />Slots</i></CardTitle>

                        <Button onClick={() => { this.goto(2) }}>View Slots</Button>
                      </Card>
                    </Col>


                    <Col md="4">
                      <Card body className="admin_data" >
                        <CardTitle><i class="fas fa-city"><br />Cities</i></CardTitle>

                        <Button onClick={() => { this.goto(3) }}>View Cities</Button>
                      </Card>
                    </Col>


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
}

export default Admin
