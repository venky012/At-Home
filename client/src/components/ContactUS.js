import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import {Button} from 'reactstrap'
import '../styles/serviceDisplay.css'
import ScrollUpButton from "react-scroll-up-button";
import AppNavbar from'./AppNavbar';
import Footer from './Footer'


class ContactUS extends Component{
  render(){
var mybutton = document.getElementById("myBtn");
    return(
      <div>
      <AppNavbar />
        Contact US
        <br/><br/><br/><br/><br/>
        <Footer>
        <Footer/>
        </Footer>
      </div>


    )
  }

}

export default ContactUS
