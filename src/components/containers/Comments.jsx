import React, {Component} from 'react';
import axios from 'axios';
import superagent from 'superagent';
import { APIManager } from '../../utils/';

import Comment from '../presentation/Comment';
import styles from './styles';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: {
        username: '',
        body: ''
      },
      commentList: []
    }
  }

  
  componentDidMount() {

    APIManager.get('api/comment', null, (err, response) => {
      if(err) {
        console.log("error", err.message);
        return;
      }
      this.setState({commentList: response.results});
    });    

  }

  submitComment = () => {
    console.log("submitted");
    let newComment = Object.assign({}, this.state.comment);

    APIManager.post('api/comment', newComment, (err, response) => {
      if(err) {
        console.log("error", err.message);
        return
      }
      console.log("Comment created", JSON.stringify(response));
      let updatedCommentList = Object.assign([], this.state.commentList);
      updatedCommentList.push(response.result);
      this.setState({
        commentList: updatedCommentList
      });
    });

  };

  updateUsername = (e) => {

    let updatedComment = Object.assign({}, this.state.comment);
    updatedComment['username'] = e.target.value;

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

          <button onClick={this.submitComment} className="btn btn-info" type="submit">Submit Comment</button>
        </div>
      </div>
    );
  }
}

export default Comments;