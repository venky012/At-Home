import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Container, Button, Row, Col, Table, TabContent, TabPane, Card} from 'reactstrap'
import {
  Redirect
} from "react-router-dom";
import AppNavbar from'./AppNavbar';
import Footer from './Footer'

import { FaCrosshairs } from 'react-icons/fa';
class Location extends Component{
    state={
        flag:null
    }
    getCurrentloco(){
        this.setState({flag:1})
        // var url = '/currentloco'
        // window.location.href=url;
    }

    getOtherloco(){
        this.setState({flag:2})
        // var url = '/marker'
        // window.location.href=url;
    }
    render(){
        if(this.state.flag===1){
            return <Redirect to="/currentloco" />;
        }
        if(this.state.flag===2){
            return <Redirect to="/states" />;
        }
        return(
          <div>
          <AppNavbar />
          <br/><br/>
          <Container style={{border:'1px solid gray'}}>
          <br/><br/>
            <Row>
              <Col md="12">
                <h1>Select Your City</h1>
              </Col>
            </Row>
            <br/>
            <Row>
              <Col>
                <Button className="add_btn" onClick = {()=>{this.getCurrentloco()}}>
                <FaCrosshairs/> Current Location
                </Button>
                <br/><br/>
                <Button  className="add_btn" onClick = {()=>{this.getOtherloco()}}>
                Pin Location on Map
                </Button>

              </Col>
            </Row>
<br/><br/>
          </Container>
          <Footer>
          <Footer/>
          </Footer>
          </div>
        )
    }

}

export default Location
