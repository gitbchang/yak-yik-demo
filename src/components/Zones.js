import React, {Component} from 'react';

import Zone from './Zone';

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
        <li><Zone currentZone={zone} index={i}/></li>
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