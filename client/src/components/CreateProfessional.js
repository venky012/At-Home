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
  Col
  } from 'reactstrap'
  import {
    Redirect
  } from "react-router-dom";

import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import {createProfessional} from '../actions/profActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {clearErrors} from '../actions/errorActions'
import {isProf,getProfessions} from '../actions/profActions'
import {getCities} from '../actions/locationAction'


class CreateProfessional extends Component{
  state={
    profession:"Select Profession",
    phonenumber:null,
    msg:null,
    flag:null,
    city:"Select City"
  }
  static propTypes ={
    isAuthenticated:PropTypes.bool,
    isProfessional:PropTypes.bool,
    isProf:PropTypes.func.isRequired,
    error:PropTypes.object.isRequired,
    createProfessional:PropTypes.func.isRequired,
    clearErrors:PropTypes.func.isRequired,
    getProfessions:PropTypes.func.isRequired,
    professions:PropTypes.array.isRequired,
    all_cities:PropTypes.object.isRequired,
    getCities:PropTypes.func.isRequired,

  }

  componentDidMount(){
    this.props.isProf();
    this.props.getProfessions()
    this.props.getCities()
  }

  componentDidUpdate(prevProps){
    const {error} =this.props
    if(error !==prevProps.error){
      // console.log('HERE');
      if(error.id === 'CREATE_PROFESSIONAL_FAIL'){
        this.setState({msg:error.msg})
      }else{
        this.setState({msg:null})
      }
    }

    if(this.state.modal){
      if(this.props.isProfessional){
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

  handleChange = (value) => {
    this.setState({
        profession: value
    });
  }
  handleChange2 = (value) => {
    this.setState({
        city: value
    });
  }
  
  
  onSubmit= async(e)=>{
     // e.preventDefault()

      const{profession,phonenumber,city}=this.state
      const user=this.props.user
      const professional={user,profession,phonenumber,city}
      if (profession!=null){
        const value = await this.props.createProfessional(professional)
        this.setState({flag:1})
      }
  }
  render(){
    if(this.state.flag){
      return <Redirect to="/" />;
    }
    return(
      <div>
      <NavLink onClick={this.toggle} href="#" >
      Become Professional
      </NavLink>
        <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
        >
        <ModalHeader toggle={this.toggle}>Enter your professional details</ModalHeader>
        <ModalBody>
        {this.state.msg?<Alert color="danger">{this.state.msg}</Alert> : null}
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
         <Container>
           <Row>
          <DropdownButton style={{borderLeftWidth:'0px'}} id="dropdown-basic-button" title={this.state.profession}>
           {
            this.props.professions?
            this.props.professions.map((item) => (
            <Dropdown.Item value={item} onSelect={()=>{this.handleChange(item)}} >{item}</Dropdown.Item>
            )
            )
            : null
          }
          </DropdownButton>
          </Row>
          <Row>
            <Label for="phonenumber">phonenumber</Label>
            <Input
              type="string"
              name="phonenumber"
              id="phonenumber"
              placeholder ="phonenumber"
              onChange={this.onChange}
            />
            </Row>
            <br/>
            <Row>
            <DropdownButton  style={{borderLeftWidth:'0px'}} id="dropdown-basic-button" title={this.state.city}>
           {
            this.props.all_cities?
            this.props.all_cities.map((item) => (
            <Dropdown.Item value={item.city} onSelect={()=>{this.handleChange2(item.city)}} >{item.city}</Dropdown.Item>
            )
            )
            : null
          }
          </DropdownButton>
          <br/>
          <br/>
            <Button color="dark" block>
            Become professional
            </Button>
            </Row>
            </Container>
          </FormGroup>
        </Form>
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
    professions:state.prof.professions,
    all_cities:state.booking.all_cities
  })

  export default connect(mapStateToProps,{ createProfessional, clearErrors,isProf,getProfessions,getCities})(CreateProfessional)
