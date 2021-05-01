import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import store from '../store'
import { loadUser } from '../actions/authActions'
import {
  Redirect
} from "react-router-dom";
import AppNavbar from './AppNavbar';
import Footer from './Footer'


import PropTypes from 'prop-types'



class ShowProfessional extends Component {
  componentDidMount() {
    console.log('mounted');
    this.props.loadUser()
  }


  render() {
    const data = this.props.prof_details ? this.props.prof_details : null;
    if (data) {
      console.log(this.props.prof_details)
      var name = data[0];
      var email = data[1];
      var locality = data[2];
      var profession = data[3];
      var phonenumber = data[4];
    }

    if (!this.props.token) {
      // Logout
      return <Redirect to="/" />;
    }
    return (
      <div>
        <AppNavbar />
        <div style={{ fontSize: '200%' }}>
          Professional Profile<br /><br />
        </div>
        <ListGroup>
          <ListGroupItem>
            NAME:{data ? name : null}
          </ListGroupItem>
          <ListGroupItem>
            EMAIL:{data ? email : null}
          </ListGroupItem>
        </ListGroup>
        <Footer>
          <Footer />
        </Footer>
      </div>
    )
  }
}

ShowProfessional.propTypes = {
  user: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  token: PropTypes.string,
  prof_details: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user,
  token: state.auth.token,
  prof_details: state.showProf.prof_details
})
export default connect(mapStateToProps, { loadUser })(ShowProfessional)
