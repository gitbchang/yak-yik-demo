import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Zones from './components/Zones';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

ReactDOM.render(<App />, 
document.getElementById('root'));