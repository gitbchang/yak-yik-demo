import React, { Component } from 'react';

import Zones from './Zones';
import Comments from './Comments';

import styles from './styles';

class Home extends Component {
  render() {
    return (
      <div className='container' style={styles.universal} >
        <div className='row'>
          <div className='col-xs-4'>
            <Zones />
          </div>
          <div className='col-xs-8' >
            <Comments />
          </div>
        </div>
        
      </div>
    );
  }
}

export default Home;