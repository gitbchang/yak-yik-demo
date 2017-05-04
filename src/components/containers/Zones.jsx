import React, {Component} from 'react';
import superagent from 'superagent';
import axios from 'axios';

import { CreateZone, Zone } from '../presentation/';
import { APIManager } from '../../utils/';

class Zones extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  submitZone = (newZone) => {
    // let newZone = Object.assign({}, this.state.newZone);
    // clean up object before sending to API
    console.log('new zone before modification', newZone);
    newZone['zipCodes'] = newZone.zipCode.split(',');
    newZone['timestamp'] = '';
    delete newZone.zipCode;
    delete newZone.numComments;

    console.log("updated zone", newZone);
    // newZoneList.push(this.state.newZone);
    // this.setState({list: newZoneList});

    APIManager.post('api/zone', newZone, (err, response) => {
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
        <CreateZone onNewZone={this.submitZone} />
      </div>
    );
  }
}

export default Zones;