import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import PostsForm from './PostsForm'
import PostsFeed from './PostsFeed'
import Spinner from '../common/Spinner'
import {getPost} from '../../actions/postActions'

 class Posts extends Component {
  componentDidMount(){
    this.props.getPost()
  }
  render() {
    const {posts, loading} = this.props.post
    let postContent
    if(posts === null || loading){
      postContent = <Spinner />
    }else{
      postContent = <PostsFeed posts={posts}/>
    }

    return (
      <div className='feed'>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostsForm />
              {postContent}
            </div>
          </div>
        </div>
        
      </div>
    )
  }
}
Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
}

const mapStateToProps = state=>({post: state.post})
export default connect(mapStateToProps, {getPost})(Posts)