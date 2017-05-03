import React, {Component} from 'react';

import Comment from '../view/Comment';

import styles from '../../styles';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentList: [
        {
          body: 'Hello',
          userName: 'joe smith',
          timestamp: '10:30'
        }, {
          body: 'this is a test',
          userName: 'bchang',
          timestamp: '10:30'
        }, {
          body: 'i liked this post',
          userName: 'random',
          timestamp: '10:30'
        }, {
          body: 'hello everyone',
          userName: 'dtrump',
          timestamp: '10:30'
        }
      ]
    }
  }
  render() {
    const allComments = this
      .state
      .commentList
      .map((com, i) => {
        return (
          <li key={i}><Comment index={i} currentComment={com}/></li>
        )
      });

    return (
      <div>
        <h2>All Comments in Zone</h2>
        <div
          style={styles.comment.commentsBox}>
          <ul style={styles.comment.commentList} >
            {allComments}
          </ul>
        </div>
      </div>
    );
  }
}

export default Comments;