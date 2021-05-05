import React,{Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Container,Button,Form,FormGroup,Label,Input, Row, Col } from 'reactstrap';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {bookSlot} from '../actions/locationAction'
import AppNavbar from'./AppNavbar';
import Footer from './Footer'
import Container1 from './Container1'
import {
  Redirect
} from "react-router-dom";
import ReactTimeout from "react-timeout";

class Getmarker extends Component {

onChange=(e)=>{
  this.setState({[e.target.name]:e.target.value})
}

sendAddress(markers,address){
  var id = this.props.order.order_id
  var city = this.props.initial_center.city;
  console.log(markers)
  this.props.bookSlot(id,markers[0].position.lat,markers[0].position.lng,address,city)
  console.log(this.props.order_id)
  this.setState({flag:2})
}


  state = {
    address:null,
    flag:null,
    initial_center:{
      lat:13.09,
      lng:77.89
    },
      markers: [
        {
          name: "Current position",
          position: {
            lat: null,
            lng: null
          }
        }
      ],
      isLoading:true
    };


      componentDidMount(){
       this.props.setTimeout(()=>{this.setState({isLoading:false})},200)
      }


    onMarkerDragEnd = (coord, index) => {
      const { latLng } = coord;
      const lat = latLng.lat();
      const lng = latLng.lng();

      this.setState(prevState => {
        const markers = [...this.state.markers];
        markers[index] = { ...markers[index], position: { lat, lng } };
        return { markers };
      });
    };

    render() {

      if(!this.state.flag){
        this.setState({
          markers: [
            {
              name: "Current position",
              position: {
                lat: this.props.initial_center.initialCenter.lat,
                lng: this.props.initial_center.initialCenter.lng
              }
            }
          ],
          flag:1
        })

      }

      if(this.state.flag==2)
      {
        return <Redirect  to={{
          pathname: "/displaybooking",
          state: { order_id: this.props.order.order_id }
      }}
         />;
      }
      if(this.state.isLoading){
        return <Container1/>
      }
      else{
      return (
        <div>
        <AppNavbar />
        <br/><br/><br/>
        <Container>
        <Row>
        <Col md="12">
        <div className="maps">

        <Map
              google={this.props.google}
              style={{
                width: "70%",
                height: "350px"
              }}
              initialCenter={this.props.initial_center.initialCenter}
              zoom={14}

            >
              {this.state.markers.map((marker, index) => (
                <Marker
                  position={marker.position}
                  draggable={true}
                  onDragend={(t, map, coord) => this.onMarkerDragEnd(coord, index)}
                  name={marker.name}

                />
              ))}
            </Map>

        </div>
        </Col>
      </Row>
      <Row>
        <Col md="6">

        <Form style={{marginTop:'65%'}}>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input
            type="textarea"
            name="address"
            id="address"
            placeholder ="Enter your address here...."
            cols="10"
            rows="5"
            onChange={this.onChange}
          />
          </FormGroup>
          </Form>
          <br/>
        <Button onClick={()=>{this.sendAddress(this.state.markers,this.state.address)}}>
          Continue to Checkout
        </Button>


        </Col>
      </Row>
      </Container>
      <Footer>
      <Footer/>
      </Footer>

        </div>
      );
    }
    }
  }


Getmarker.propTypes={
  order:PropTypes.object.isRequired,
  order_id:PropTypes.object.isRequired,
  bookSlot:PropTypes.func.isRequired,
  initial_center:PropTypes.object.isRequired
}

const mapStateToProps=state=>({
order:state.order,
initial_center:state.booking.initial_center,
order_id:state.booking.order
})
export default ReactTimeout(connect(mapStateToProps,{bookSlot})( GoogleApiWrapper({
  apiKey: ('AIzaSyBM9hBBwzMOrDHqOB9harB9AqXS6HZdiX8'),
})(Getmarker)))
