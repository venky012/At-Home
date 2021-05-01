import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Container, ListGroup, ListGroupItem, Button, Row, Col, Table, TabContent, TabPane} from 'reactstrap'
import {getCities,setLocation} from '../../actions/locationAction'
import AppNavbar from'../AppNavbar';
import Footer from '../Footer'

import {
  Redirect
} from "react-router-dom";
import PropTypes from 'prop-types'


class ProfStates extends Component{

   state= {
     flag:null
   }

  componentDidMount(){
     this.props.getCities()
  }

  bookslot =  (city,lat,lng) => {
    this.props.setLocation(city,lat,lng);
    this.setState({flag:true})
  }

render(){
 const cities_available = this.props.cities?this.props.cities:null;
if (!this.props.token) {
      return <Redirect to="/" />;
    }

if (this.state.flag){
  return <Redirect to="/professional/marker" />;
}
return(

<div >
<AppNavbar />
<Table>
  <tbody>
{

    cities_available?
    cities_available.map((item) => (
      item?
  <tr>
    <Button variant="light"  onClick={()=>{this.bookslot(item.city,item.lat,item.lng)}} >{item.city}
        </Button>
     </tr>
     :
     null

    ))
  :
  null

}
</tbody>
</Table>
<Footer>
<Footer/>
</Footer>
</div>
)
}
}

ProfStates.propTypes={
  token:PropTypes.string,
  getCities:PropTypes.func.isRequired,
  all_cities:PropTypes.string.isRequired,
  setLocation:PropTypes.func.isRequired
}

const mapStateToProps=state=>({
token:state.auth.token,
cities:state.booking.all_cities
})
export default connect(mapStateToProps,{getCities, setLocation})(ProfStates)
