import React, {Component} from 'react';
import superagent from 'superagent';
import axios from 'axios';

import Zone from '../presentation/Zone';
import { APIManager } from '../../utils/';

class Zones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newZone: {
        name: '',
        zipCode: '',
        numComments: 0
      },
      list: []
    };
  }

  componentDidMount() {

    APIManager.get('api/zone', null, (err, response) => {
      if(err) {
        console.log("error", err.message);
        return;
      }
      this.setState({list: response.results});
    });

  }

  submitZone = () => {
    let updatedZone = Object.assign({}, this.state.newZone);
    // clean up object before sending to API
    updatedZone['zipCodes'] = updatedZone.zipCode.split(',');
    updatedZone['timestamp'] = '';
    delete updatedZone.zipCode;
    delete updatedZone.numComments;

    console.log("updated zone", updatedZone);
    // updatedZoneList.push(this.state.newZone);
    // this.setState({list: updatedZoneList});

    APIManager.post('api/zone', updatedZone, (err, response) => {
      if(err) {
        console.log("error", err.message);
        return;
      }
      console.log('ZONE CREATED:', JSON.stringify(response));
      let updatedList = Object.assign([], this.state.list);
      updatedList.push(response.result);
      this.setState({
        list: updatedList
      });
    });       
  
  }

  updateZone = (e) => {
    let zoneObject = Object.assign({}, this.state.newZone);
    zoneObject[e.target.id] = e.target.value;
    this.setState({newZone: zoneObject});
  }

  render() {
    const listItems = this
      .state
      .list
      .map((zone, i) => {
        return (
          <li key={i}><Zone currentZone={zone}/></li>
        );
      });
    return (
      <div>
        <h2>Choose a Zone</h2>
        <ol>
          {listItems}
        </ol>

        <input
          id="name"
          onChange={this.updateZone}
          className="form-control"
          type="text"
          placeholder="Zone Name"/><br/>
        <input
          id="zipCode"
          onChange={this.updateZone}
          className="form-control"
          type="text"
          placeholder="Zip Code"/><br/>
        <button onClick={this.submitZone} className="btn btn-success" type="submit">Add Zone</button>
      </div>
    );
  }
}

export default Zones;