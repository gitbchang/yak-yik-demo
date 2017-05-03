import React, {Component} from 'react';

import Zone from '../presentation/Zone';

class Zones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          name: 'Zone 1',
          zipCode: '10012',
          numComments: 10
        }, {
          name: 'Zone 2',
          zipCode: '10012',
          numComments: 10
        }, {
          name: 'Zone 3',
          zipCode: '78702',
          numComments: 10
        }
      ]
    };
  }
  render() {
    const listItems = this.state.list.map((zone, i) => {
      return (
        <li key={i}><Zone currentZone={zone} /></li>
      );
    });
    return (
      <div>
        <ol>
          {listItems}
        </ol>
      </div>
    );
  }
}

export default Zones;