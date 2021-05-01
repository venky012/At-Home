import React,{Component} from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
  Container,
  Row,
  Col,
  
  } from 'reactstrap'
  import ToggleButton from 'react-toggle-button'

  import {
    Redirect
  } from "react-router-dom";

import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import {createProfessional} from '../actions/profActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {clearErrors} from '../actions/errorActions'
import {isProf,isAvailable} from '../actions/profActions'


class Profisavailable extends Component{
  state={
    flag:null,
    modal:false,
    profession:null
  }
  static propTypes ={
    isAuthenticated:PropTypes.bool,
    isProfessional:PropTypes.bool,
    isProf:PropTypes.func.isRequired,
    error:PropTypes.object.isRequired,
    isAvailable:PropTypes.func.isRequired,
    is_available:PropTypes.object.isRequired
  }

  componentDidMount(){
    this.props.isProf();
    this.props.isAvailable();
  }

  componentDidUpdate(){
    this.props.isAvailable()
    
    if(this.state.modal){ 
        this.toggle()
    }
  }

  toggle=()=>{
    this.setState({
      modal: !this.state.modal,
    })
  }

  updateAvailable=()=>{
    console.log('hiii')
  }
  
  
  render(){
    if(this.state.flag){
      return <Redirect to="/" />;
    }
    return(
      <div>
      <NavLink onClick={this.toggle} href="#" >
      Is Available
      </NavLink>
        <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
        >
        <ModalHeader toggle={this.toggle}>Is Available</ModalHeader>
        <ModalBody>
         <Container>
           <Row>
           <ToggleButton
      value={ this.props.is_available || false }
    onClick={this.updateAvailable} />
            </Row>
            </Container>
        </ModalBody>
        </Modal>
      </div>
    )
  }
}

  const mapStateToProps = state =>({
    user:state.auth.user,
    error:state.error,
    isProfessional:state.prof.isProfessional,
    is_available:state.prof.is_available
   })

  export default connect(mapStateToProps,{ createProfessional, clearErrors,isProf,isAvailable})(CreateProfessional)
