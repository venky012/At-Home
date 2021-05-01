import React from 'react'
import Loader from './Loader'
// import '../styles/loader.scss'
class Container1 extends React.Component {
  render() {
    const data = {
      size: 200
    };

    return <div style={{marginLeft:'43%',marginTop:'17%'}}><Loader {...data} /></div>
  }
}

export default Container1
