import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import { loadUser } from '../actions/authActions'
import PropTypes from 'prop-types'
import { sendMessage, getMessages } from '../actions/mainchatActions'
import { getOrder } from '../actions/locationAction'
import { Container } from 'reactstrap'
import '../styles/chatpage.css'
import {
  Redirect,
  Link
} from "react-router-dom";
import AppNavbar from './AppNavbar';
import Footer from './Footer'
import Container1 from './Container1'
const useStyles = makeStyles(theme => ({
  root: {
    margin: '50px',
    padding: theme.spacing(3, 2),
  },

  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  topicsWindow: {
    width: '30%',
    height: '300px',
    borderRight: '1px solid gray'
  },
  chatWindow: {
    width: '70%',
    height: '300px',
    padding: '20px'
  },
  chatBox: {
    width: '85%',
  },
  button: {
    width: '15%',
  },


}));


class ChatPage extends Component {
  state = {
    message: null,
    allChats: []
  }
  componentDidMount() {
    this.props.getOrder(this.props.location.state.order_id)
    this.props.loadUser();
    if (this.props.order) {
      this.props.getMessages(this.props.order.user_id, this.props.order.professional_id)
      // this.timer = setInterval(() => this.props.getMessages(this.props.order.user_id,this.props.order.professional_id), 1000);
    }
  }

  // componentWillUnmount() {
  //         clearInterval(this.timer);
  //         this.timer = null;
  //     }
  componentDidUpdate() {
    if (this.props.order) {
      this.props.getMessages(this.props.order.user_id, this.props.order.professional_id)
    }
  }

  changeTextValue = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  submitingmessage = (e, user_id, professional_id) => {
    e.target.value = ''
    this.props.sendMessage(user_id, professional_id, this.state.message)
  }
  render() {
    const user_id = this.props.auth.user ? this.props.auth.user._id : null;
    const professional_id = this.props.order ? this.props.order.professional_id == user_id ? this.props.order.user_id : this.props.order.professional_id : null;

    const stylesRight = { textAlign: 'right', marginRight: '10%', marginTop: '3px', marginBottom: '3px' }
    const stylesLeft = { textAlign: 'left', marginLeft: '10%', marginTop: '3px', marginBottom: '3px' }
    if (!this.props.auth.token) {
      // Logout
      return <Redirect to="/" />;
    }
    const talking_to = this.props.auth.user ? this.props.order ? this.props.auth.user.name == this.props.order.prof_name ? this.props.order.name : this.props.order.prof_name : null : null;

    return (
      <div>
        <div className = "card-custom">
        <AppNavbar />
        <Paper>
          <br/>
          <Typography variant="h5" component="h5">
            {this.props.order ? <div >You are talking to {talking_to}</div> : null}
          </Typography>
          <Paper style={{ maxheight:"50%", width: "70%", margin: "auto" }}>
            <div className="card-header msg_card_body" >
            <div style={{borderBottom: '1.5px solid rgba(0,0,0,0.14)', maxHeight: 500, width: '100%' }} className="scrollbar" id="style-1">
              {this.props.message ? this.props.message.messages.map(mess => <div style={mess.from === this.props.auth.user._id ? stylesRight : stylesLeft}><Chip label={mess.message} /></div>) : null}
            </div>
            </div>
            <div className="card-footer">
              <TextField
                label="Send a message"
                name="message"
                onChange={this.changeTextValue}
                style={{width: '90%'}}
              />
              {!this.props.message.isLoading ? <Button
                onClick={(e) => this.submitingmessage(e, user_id, professional_id)}
                variant="contained" color="primary" style={{ marginTop: '1%' }}>
                Send
            </Button> : null}
            </div>
          </Paper>
        </Paper>
        <Footer>
          <Footer />
        </Footer>
        </div>
      </div>

    )
  }
}
ChatPage.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  getMessages: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  token: PropTypes.string,
  getOrder: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
  order: state.booking.order_details,
  message: state.message,
  auth: state.auth,
})


export default connect(mapStateToProps, { sendMessage, getMessages, loadUser, getOrder })(ChatPage)
