import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Container, Button, Row, Col, Table, TabContent, TabPane, Card} from 'reactstrap'
import {
  Redirect
} from "react-router-dom";
import AppNavbar from'../AppNavbar';
import Footer from '../Footer'

import { FaCrosshairs } from 'react-icons/fa';
class ProfLocation extends Component{
    state={
        flag:null
    }
    getCurrentloco(){
        this.setState({flag:1})
    }

    getOtherloco(){
        this.setState({flag:2})
    }
    render(){
        if(this.state.flag===1){
            return <Redirect to="/professional/currentloco" />;
        }
        if(this.state.flag===2){
            return <Redirect to="/professional/states" />;
        }
        return(
          <div>
          <AppNavbar />
            <Card style={{width:"30%",size:"70px",alignItems:"center",justifyContent:"center"}}>
            <Button onClick = {()=>{this.getCurrentloco()}}>
            <FaCrosshairs/>Current Location
            </Button>
            <Button onClick = {()=>{this.getOtherloco()}}>
            Other Location
            </Button>
            </Card>
            <Footer>
            <Footer/>
            </Footer>
          </div>
        )
    }

}

export default ProfLocation
