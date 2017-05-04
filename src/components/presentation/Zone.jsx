import React, {Component} from 'react';
import styles from './styles';

class Zone extends Component {
  render() {
    const style = styles.zone;
    const currentZone = this.props.currentZone;

    let zipString = '';
    if (currentZone.zipCodes) {
      if (currentZone.zipCodes.length > 1) {
        zipString = currentZone
          .zipCodes
          .join(', ');
      } else {
        zipString = currentZone
          .zipCodes
          .join('');
      }
    }

    return (
      <div style={style.container}>
        <h2 style={style.header2}>
          <a style={style.zoneLink} href="#">{this.props.currentZone.name}</a>
        </h2>
        <span className='detail'>Zip: {zipString}</span><br/>
        <span className='detail'>Comments: {this.props.currentZone.numComments}</span>
      </div>
    );
  }
}

export default Zone;