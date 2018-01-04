import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavMenu from './Nav-menu';
import { newPostTitle, newPostBody } from '../actions';
import { fetchSinglePost, editPost, postVote } from '../reducers/posts';
import _ from 'lodash';

class EditPost extends Component {
  constructor(props) {
    super(props);

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
  }
  componentDidMount() {
    this.props.fetchSinglePost(this.props.match.params.id);
  }
  handleTitleChange(e) {
    this.props.onTitleChange(e.target.value);
  }
  handleBodyChange(e) {
    this.props.onBodyChange(e.target.value);
  }
  handleUpVote() {
    this.props.upVotePost(this.props.match.params.id, { option: 'upVote' });
  }
  handleDownVote() {
    this.props.downVotePost(this.props.match.params.id, { option: 'downVote' });
  }
  handleSubmit(e) {
    e.preventDefault();
    const title = this.props.title ? this.props.title : this.props.post.title;
    const body = this.props.body ? this.props.body : this.props.post.body;
    this.props.onSubmit(this.props.match.params.id, {
      title,
      body,
    });
    this.props.onBodyChange('');
    this.props.onTitleChange('');
    this.props.history.push('/');
  }
  handleCancel() {
    this.props.onBodyChange('');
    this.props.onTitleChange('');
    this.props.history.push(`/post/${this.props.match.params.id}`);
  }
  render() {
    const titlePlaceholder = this.props.title ? this.props.title : this.props.post.title;
    const bodyPlaceholder = this.props.body ? this.props.body : this.props.post.body;
    const authorPlaceholder = this.props.author ? this.props.author : this.props.post.author;

    if (_.isEmpty(this.props.post) || !this.props.post || this.props.post.error) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <header className="page-header">
                <NavMenu />
              </header>
              <div>Sorry, post was not found</div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <header>
              <NavMenu />
              <h4>Edit Post</h4>
              <div>
                <cite>
                  <small className="readable-post-score-btns">
                    Score: {this.props.post.voteScore}{' '}
                  </small>
                  <small className="readable-post-score-btns">
                    <button className="btn btn-success btn-xs" onClick={this.handleUpVote}>
                      Up Vote
                    </button>
                  </small>
                  <small className="readable-post-score-btns">
                    <button className="btn btn-danger btn-xs" onClick={this.handleDownVote}>
                      Down vote
                    </button>
                  </small>
                </cite>
              </div>
            </header>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={titlePlaceholder}
                  onChange={this.handleTitleChange}
                  placeholder={titlePlaceholder}
                />
              </div>
              <div className="form-group">
                <label htmlFor="postBody">Body</label>
                <textarea
                  type="text"
                  className="form-control"
                  value={bodyPlaceholder}
                  onChange={this.handleBodyChange}
                  placeholder={bodyPlaceholder}
                />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input type="text" className="form-control" value={authorPlaceholder} disabled />
              </div>
              <p>Category: {this.props.post.category}</p>
              <br />
              <div>
                <span className="readable-form-action-btns">
                  <input type="submit" className="btn btn-success" value="Submit" />
                </span>
                <span className="readable-form-action-btns">
                  <button className="btn btn-danger" onClick={this.handleCancel}>
                    Cancel
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchSinglePost: id => fetchSinglePost(id),
      onTitleChange: value => newPostTitle(value),
      onBodyChange: value => newPostBody(value),
      onSubmit: (id, post) => editPost(id, post),
      upVotePost: (id, vote) => postVote(id, vote),
      downVotePost: (id, vote) => postVote(id, vote),
    },
    dispatch,
  );

export default connect(
  state => ({
    post: state.posts.post,
    title: state.posts.newPostTitle,
    body: state.posts.newPostBody,
    author: state.posts.newPostAuthor,
  }),
  mapDispatchToProps,
)(EditPost);
