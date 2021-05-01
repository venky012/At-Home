import React,{Component} from 'react';
import { Jumbotron } from 'reactstrap';
import '../index.css';
import img from '../assets/Carpentry.jpg'
const imgUrl = '../assets/Carpentry.jpg'

const jumbStyle = {
	backgroundImage: 'url(' + imgUrl + ')',
}

class HomePage extends Component{
  render(){
    return(
      <div>


	  <Jumbotron className="mainSlide">
        <h1 className="display-3">At-Home</h1>
        <p className="lead">Find Your Service</p>
      </Jumbotron>


</div>


    )
  }

}

export default HomePage
