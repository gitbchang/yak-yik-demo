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

    // const self = this;
    // axios({method: 'get', url: 'api/zone', responseType: 'json'}).then(function (response) {
    //   console.log(response.data);
    //   let results = response.data.results;
    //   self.setState({list: results});
    // });

    // superagent
    //   .get('api/zone')
    //   .query(null)
    //   .set('Accept', 'application/json')
    //   .end((err, response) => {
    //     if (err) {
    //       console.log("error", err);
    //     }
    //     let results = response.body.results;
    //     console.log(JSON.stringify(results));
    //     this.setState({list: results});
    //   });
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
      // let updatedList = Object.assign([], this.state.list);
      
      // updatedList.push(response.result);
      // this.setState({
      //   list: updatedList
      // });
    });

    // axios({method: 'post', url: 'api/zone', data:updatedZone, responseType: 'json'}).then(function (response){
    //   console.log("post response", response);
    //   const confirmation = response.data.confirmation;
    //   if(confirmation != 'success'){
    //     console.error("error", confirmation);
    //   } 
    // }).catch(function(error){
    //   console.error("error", error);
    // })

    // superagent
    // .post('api/zone')
    // .send({name: 'prefilled data', zipCodes: ['56565']})
    // .set('Accept', 'application/json')
    // .end((err, response) => {
    //   if (err) {
    //     callback(err, null);
    //   }
    // const confirmation = response.body.confirmation;
    //     // we need to check if our API call was a success. The first error handling checks if we hit the server correctly.
    //     if(confirmation != 'success'){
    //       console.error("error", response.body.message);
    //     } else {
    //       console.log("post reponse", response.body);
    //     }        
    // });
        
  
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