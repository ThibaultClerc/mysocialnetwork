import React, { useState, useEffect } from 'react'
import { fetchPostListRequest, fetchPostListSuccess, fetchPostListFailure } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../Post';
import Cookies from 'js-cookie'


function PostList() {
  const currentUser = useSelector(state => state.currentUser.currentUser)
  const [username, setUsername] = useState(currentUser.user.username)
  const [userId, setUserId] = useState(currentUser.user.id)
  const dispatch = useDispatch();
  const posts = useSelector(state => state.postList.postList)

  const fetchPostList = () => {
    return (dispatch) => {
      dispatch(fetchPostListRequest());
      fetch("https://my-pasteque-space.herokuapp.com/posts?_sort=created_at:desc", {
        "method": "GET",
        "headers": {
          'Authorization': `Bearer ${Cookies.get('token')}`, 
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

  const fetchDeletePost = (postid) => {
    fetch(`https://my-pasteque-space.herokuapp.com/posts/${postid}`, {
      "method": "DELETE",
      "headers": {
        'Authorization': `Bearer ${Cookies.get('token')}`, 
        "Content-Type": "application/json"
      },
    })
    .then((response) => response.json())
    .then((response) => {
      if (response.statusCode === 400) {
        console.log(response.message);
      } else {
        console.log(response);
      }
    })
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
  
  console.log(posts)

  return (
      <div className="row mx-auto card-columns justify-content-center">
      {posts.map(post => {
        if (post.user !== null) {
          return ( <div className = "card col-3 mt-3 ml-1 ml-1 p-3">
            <Post key={post.id} postID={post.id} text={post.text} user={post.user.username} likes={likesHandler(post.like)} userID={post.user.id} lastLiker={post.liking}/>
            {userId === post.user.id ? <button onClick={()=>fetchDeletePost(post.id)}className ="btn btn-primary">Delete</button> : ""}
          </div> )
        }
      })}
      </div>
  )
}

export default PostList
