import React, {Component} from 'react';
import axios from 'axios';
import superagent from 'superagent';

import Comment from '../presentation/Comment';
import styles from './styles';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: {
        userName: '',
        body: '',
        timestamp: ''
      },
      commentList: []
    }
  }

  componentDidMount() {

    // const self = this;
    // axios({method: 'get', url: 'api/comment', responseType: 'json'}).then(function (response) {
    //   console.log(response.data);
    //   let results = response.data.results;
    //   self.setState({commentList: results});
    // });

    superagent
      .get('api/comment')
      .query(null)
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err) {
          console.log("error", err);
        }
        let results = response.body.results;
        this.setState({commentList: results});
      });

  }

  submitComment = () => {
    console.log("submitted");
    let updatedList = Object.assign([], this.state.commentList);
    updatedList.push(this.state.comment);

    this.setState({commentList: updatedList});
  };

  updateUsername = (e) => {

    let updatedComment = Object.assign({}, this.state.comment);
    updatedComment['userName'] = e.target.value;

    this.setState({comment: updatedComment});
  }

  updateBody = (e) => {
    let updatedComment = Object.assign({}, this.state.comment);
    updatedComment['body'] = e.target.value;

    this.setState({comment: updatedComment});
  }

  updateTime = (e) => {
    let updatedComment = Object.assign({}, this.state.comment);
    updatedComment['timestamp'] = e.target.value;

    this.setState({comment: updatedComment});
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
        <div style={styles.comment.commentsBox}>
          <ul style={styles.comment.commentList}>
            {allComments}
          </ul>

          <input
            onChange={this.updateUsername}
            className="form-control"
            type="text"
            placeholder="Username"/><br/>
          <input
            onChange={this.updateBody}
            className="form-control"
            type="text"
            placeholder="Comment"/><br/>
          <input
            type="text"
            onChange={this.updateTime}
            className="form-control"
            type="text"
            placeholder="timestamp"/><br/>

          <button onClick={this.submitComment} className="btn btn-info" type="submit">Submit Comment</button>
        </div>
      </div>
    );
  }
}

export default Comments;