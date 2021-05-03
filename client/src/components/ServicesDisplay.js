import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import {Button, Container, Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText} from 'reactstrap'
import '../styles/serviceDisplay.css'
import ScrollUpButton from "react-scroll-up-button";
import AppNavbar from'./AppNavbar';
import Footer from './Footer'

const baseUrl = process.env.REACT_APP_BASE_URL;

class ServicesDisplay extends Component{
  state = {
    all_services:[],
    disp_services:[]
	}
  componentDidMount(){
    this.getAllServices();
    this.getAllServices1();
  }

  getAllServices = () => {
		fetch(`${baseUrl}/api/service/all`)
		 .then(response => response.json())
     .then(data => this.setState({ all_services: data }))
  }

  getAllServices1 = () => {
		fetch(`${baseUrl}/api/service/all`)
		 .then(response => response.json())
     .then(data => this.setState({ disp_services: data }))
  }

  suggestion = ({ target }) => {
    console.log(target.value)
    console.log(this.state.disp_services)
    var disp = []
    for (var i in this.state.all_services) {
      var temp = this.state.all_services[i].name
      var tempSmall = temp.toLowerCase()
      var bol = tempSmall.includes(target.value.toLowerCase())
      if(bol){
        console.log(this.state.all_services[i].name )
        disp.push(this.state.all_services[i])
      }
    }
    this.setState({ disp_services: disp })
  }

  render(){
    var mybutton = document.getElementById("myBtn");
    return(
      <div>

      <AppNavbar />
      <br/>
      <br/>
      <input placeholder="Search for a service..." className="search" onChange={this.suggestion}></input>
      <button className="search_btn">Go</button>
      <Container >
        <br/>
        <Row style={{textAlign:'center'}}>
          <Col md="12">
          <h3>Our Services</h3>
          </Col>
        </Row><br/>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <ListGroup style={{textAlign:"left"}}>
            {this.state.disp_services.map((item, index) => (
              <ListGroupItem className="listgrp_serdisp">
                <Link className="link_sd" to={'/service/'+item.name} style={{textDecoration:'none'}}>
                  <ListGroupItemHeading>

                        {item.name}

                  </ListGroupItemHeading>
                  <ListGroupItemText>
                    {item.about}
                  </ListGroupItemText>
                </Link>
              </ListGroupItem>
            ))}
            {(this.state.disp_services.length === 0)?<span style={{marginLeft:'30%',fontSize:'20px'}}>No Results for given query</span>:''}
            </ListGroup>
          </Col>
        </Row>
      </Container>
      <br/><br/><br/><br/>
      <Footer>
      <Footer/>
      </Footer>
      </div>


    )
  }

}

export default ServicesDisplay
