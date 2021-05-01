import React,{Component} from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import {connect} from 'react-redux'
import {addItem} from '../actions/itemActions'
import uuid from 'uuid'

class ItemModal extends Component{
state={
  modal:false,
  name:''
}

toggle=()=>{
  this.setState({
    modal: !this.state.modal
  })
}

onChange=(e)=>{
  this.setState({[e.target.name]:e.target.value})
}

onSubmit=(e)=>{
    e.preventDefault()

    const newItem={
      id: uuid(),
      name:this.state.name
    }
  //Add item via addItem actions
this.props.addItem(newItem)

this.toggle();
}
render(){
  return(
    <div>
      <Button
      color="dark"
      style={{marginBottom:'2rem'}}
      onClick={this.toggle}
      >
      Add Item
      <Modal
      isOpen={this.state.modal}
      toggle={this.toggle}
      >
      <ModalHeader toggle={this.toggle}>Add to Shopping List</ModalHeader>
      <ModalBody>
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <Label for="item">item</Label>
          <Input
            type="text"
            name="name"
            id="item"
            PlaceHolder ="Add shopping item"
            onChange={this.onChange}
          />
          <Button color="dark" block>
          Add Item
          </Button>
        </FormGroup>
      </Form>
      </ModalBody>
      </Modal>
      </Button>
    </div>
  )
}
}

const mapStateToProps = state =>({
  item:state.item
})

export default connect(mapStateToProps,{addItem})(ItemModal)
