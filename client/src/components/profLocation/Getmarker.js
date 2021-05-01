import React,{Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Container,Button,Form,FormGroup,Label,Input } from 'reactstrap';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {sendLocation} from '../../actions/profActions'
import {
  Redirect
} from "react-router-dom";
import AppNavbar from'../AppNavbar';
import Footer from '../Footer'

class ProfGetmarker extends React.Component {


onChange=(e)=>{
  this.setState({[e.target.name]:e.target.value})
}

sendAddress(markers,address){
  var id = this.props.user._id;
  var city = this.props.initial_center.city;
  console.log(markers)
  this.props.sendLocation(id,markers[0].position.lat,markers[0].position.lng,address,city)
  this.setState({
    flag:2
  })
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
      ]
    };

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
      if(this.state.flag===2)
      {
        return <Redirect to="/" />
      }
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
      return (
        <div>
        <AppNavbar />
        <div className="maps" style={{position:"relative"}}>
        <Container>
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

        </Container>
        </div>

        <Form style={{marginTop:'400px',height:'100px',position:'fixed'}}>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input
            type="text"
            name="address"
            id="address"
            placeholder ="address"
            onChange={this.onChange}
          />
          </FormGroup>
          </Form>

        <Button style={{marginTop:'550px',height:'50px'}} onClick={()=>{this.sendAddress(this.state.markers,this.state.address)}}>Become Professional</Button>
        <Footer>
        <Footer/>
        </Footer>
        </div>
      );
    }
  }


ProfGetmarker.propTypes={
  sendLocation:PropTypes.func.isRequired,
  initial_center:PropTypes.object.isRequired,
  user:PropTypes.object.isRequired
}

const mapStateToProps=state=>({
initial_center:state.booking.initial_center,
user:state.auth.user
})
export default connect(mapStateToProps,{sendLocation})( GoogleApiWrapper({
  apiKey: ('AIzaSyBM9hBBwzMOrDHqOB9harB9AqXS6HZdiX8'),
})(ProfGetmarker))
