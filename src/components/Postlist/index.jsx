import React, { useState, useEffect } from 'react'
import { fetchPostListRequest, fetchPostListSuccess, fetchPostListFailure } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../Post'


function PostList() {
  const currentUser = useSelector(state => state.currentUser.currentUser)
  const [postList, setPostList] = useState("");
  const dispatch = useDispatch();
  const posts = useSelector(state => state.postList.postList)

  const fetchPostList = () => {
    return (dispatch) => {
      dispatch(fetchPostListRequest());
      fetch("https://my-pasteque-space.herokuapp.com/posts", {
        "method": "GET",
        "headers": {
          'Authorization': `Bearer ${currentUser.jwt}`, 
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((response) => {
        if (response.statusCode === 400) {
          dispatch(fetchPostListFailure(response.message));
        } else {
          dispatch(fetchPostListSuccess(response));
          console.log(response)
        }
      })
    }
  }

  useEffect(() => {
    dispatch(fetchPostList())
  }, [])

  const likesHandler = (likes) => {
    if (likes === null) {
      return 0
    } else {
      return likes
    }
  }
  

  return (
    <ul>
      {posts.map(post => <Post key={post.id} postID={post.id} text={post.text} user={post.user.username} likes={likesHandler(post.like)} userID={post.user.id}/>)}
    </ul>
  )
}

export default PostList
