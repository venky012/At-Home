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
  Alert
} from 'reactstrap'
import {connect} from 'react-redux'
import uuid from 'uuid'
import PropTypes from 'prop-types'
import { register } from '../../actions/authActions'
import {clearErrors} from '../../actions/errorActions'

class RegisterModal extends Component{
state={
  modal:false,
  name:'',
  email:'',
  password:'',
  profilepic:'uploaded',
  profilepicparse:"",
  msg:null
}

static propTypes ={
  isAuthenticated:PropTypes.bool,
  error:PropTypes.object.isRequired,
  register:PropTypes.func.isRequired,
  clearErrors:PropTypes.func.isRequired
}

componentDidUpdate(prevProps){
  console.log('HERE');
  const {error, isAuthenticated} =this.props
  if(error !==prevProps.error){
    if(error.id === 'REGISTER_FAIL'){
      this.setState({msg:error.msg})
    }else{
      this.setState({msg:null})
    }
  }

  if(this.state.modal){
    if(isAuthenticated){
      this.toggle()
    }
  }
}

toggle=()=>{
  this.props.clearErrors()
  this.setState({
    modal: !this.state.modal
  })
}

onChange=(e)=>{
  this.setState({[e.target.name]:e.target.value})
}

fileSelectHandler = event => {
  this.setState({profilepicparse: event.target.files[0]});
};

onSubmit=(e)=>{
    e.preventDefault()
    const {name,email,password,profilepic,profilepicparse} =this.state;

    const newUser={
      name,
      email,
      password,
      profilepic,
      profilepicparse
    }

this.props.register(newUser);
}
render(){
  return(
    <div>
    <NavLink onClick={this.toggle} href="#" >
    Register
    </NavLink>
      <Modal
      isOpen={this.state.modal}
      toggle={this.toggle}
      >
      <ModalHeader toggle={this.toggle}>Register</ModalHeader>
      <ModalBody>
      {this.state.msg?<Alert color="danger">{this.state.msg}</Alert> : null}
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder ="Name"
            onChange={this.onChange}
          />
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder ="email"
            onChange={this.onChange}
          />
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder ="password"
            onChange={this.onChange}
          />
          <br/>
          Profile Picture<br/>
          <input type="file" className="form__input" name="profilepicparse" onChange={this.fileSelectHandler} id="profilepic_parse" placeholder="Upload pic"/>
          <Button style={{ marginTop:'20px' }} color="dark" block>
          Register
          </Button>
        </FormGroup>
      </Form>
      </ModalBody>
      </Modal>
    </div>
  )
}
}

const mapStateToProps = state =>({
  isAuthenticated:state.auth.isAuthenticated,
  error:state.error
})

export default connect(mapStateToProps,{ register, clearErrors })(RegisterModal)
