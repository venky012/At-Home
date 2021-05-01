import React,{Component} from 'react'; 
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Container,Button,Form,FormGroup,Label,Input } from 'reactstrap';



class Gmaps extends React.Component {
  
        
        render() {
          return (
            <Map
              google={this.props.google}
              style={{
                width: "70%",
                height: "350px"
              }}
              initialCenter={this.props.initialCenter}
              zoom={14}
            >
              {this.props.markers.map((marker, index) => (
                <Marker
                  position={marker.position}
                  draggable={true}
                  onDragend={(t, map, coord) => this.props.onMarkerDragEnd(coord, index)}
                  name={marker.name}
                />
              ))}
            </Map>
            
          );
        }
      }
    
    
    export default GoogleApiWrapper({
        apiKey: ('AIzaSyBM9hBBwzMOrDHqOB9harB9AqXS6HZdiX8'),
    })(Gmaps)