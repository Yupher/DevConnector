import React, { Component } from "react";
import Spinner from "../common/Spinner";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import { getPostById } from "../../actions/postActions";
import PostItem from "../posts/PostItem";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

class Post extends Component {
  componentDidMount() {
    this.props.getPostById(this.props.match.params.id);
  }
  render() {
    const { post, loading } = this.props.post;
    let postContent;
    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      );
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Go Back
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Post.propTypes = {
  getPostById: Proptypes.func.isRequired,
  post: Proptypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPostById })(Post);
