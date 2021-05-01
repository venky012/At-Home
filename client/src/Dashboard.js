import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import AppNavbar from'./components/AppNavbar';
import Footer from './components/Footer'

import {CTX,sendChatAction} from './actions/chatActions';
const useStyles = makeStyles(theme => ({
    root: {
      margin:'50px',
      padding:theme.spacing(3,2),
    },

    flex:{
        display:'flex',
        alignItems:'center'
    },
    topicsWindow:{
        width:'30%',
        height:'300px',
        borderRight:'1px solid gray'
    },
    chatWindow:{
        width:'70%',
        height:'300px',
        padding:'20px'
    },
    chatBox:{
        width:'85%',
    },
    button:{
        width:'15%',
    },


}));


function Dashboard(props){

  const classes= useStyles();

  // CTX Store
  //const {sendChatAction, user} = React.useContext(CTX);
  const user="yashwanth"
  // console.log({allChats});

  const topics = Object.keys(props.allChats);
  const [activeTopic , changeActiveTopic]= React.useState(topics[0])
  const [textValue, changeTextValue] = React.useState('');

  return(
    <div>
      <Paper className={classes.root}>
          <Typography variant="h4" component="h4">
          Chat App
          </Typography>
          <Typography variant="h5" component="h5">
            {activeTopic}
          </Typography>
          <div className={classes.flex}>
            <div className={classes.topicsWindow}>
                <list>
                {
                  topics.map(topic=>(
                    <ListItem onClick={(e)=>changeActiveTopic(e.target.innerText)}  key={topic} button>
                    <ListItemText primary={topic} />
                  </ListItem>))
                }

                </list>
            </div>
            <div className={classes.chatWindow}>
                {
                  props.allChats[activeTopic].map((chat,i)=>(
                    <div className={classes.flex} key={i}>
                      <Chip label={chat.from} className={classes.Chip}/>
                      <Typography variant='body1' gutterBottom>
                      {chat.msg}
                      </Typography>
                  </div>
                ))
                }
            </div>
          </div>
          <div className={classes.flex}>
            <TextField
              label="Send a message"
              className={classes.chatBox}
              value={textValue}
              onChange={e => changeTextValue(e.target.value)}
            />

            <Button
            onClick={()=>{props.sendChatAction({from:user,msg:textValue, topic:activeTopic});
              changeTextValue('');
            }}
            variant="contained" color="primary" className={classes.button}>
              Send
            </Button>
          </div>
      </Paper>
    </div>

  )

}
Dashboard.propTypes={
  allChats:PropTypes.object.isRequired,
  sendChatAction:PropTypes.func.isRequired
}


const mapStateToProps = state =>({
  allChats:state.chat,
})


export default connect(mapStateToProps,{sendChatAction})(Dashboard)
