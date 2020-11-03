import React, { useState } from 'react'
import { fetchPostListRequest, fetchPostListSuccess, fetchPostListFailure } from '../../actions';
import { useDispatch } from 'react-redux';


function PostList() {
  const [postList, setPostList] = useState("");
  const dispatch = useDispatch();

  const fetchPostList = () => {
    return (dispatch) => {
      dispatch(fetchPostListRequest());
      fetch("https://my-pasteque-space.herokuapp.com/posts", {
        "method": "GET"
      })
      .then((response) => response.json())
      .then((response) => {
        if (response.statusCode === 400) {
          dispatch(fetchPostListFailure(response.message));
          console.log(response)
        } else {
          dispatch(fetchPostListSuccess(response));
        }
      })
    }
  }

  dispatch(fetchPostList())
  console.log(postList)

  return (
    <div>
      Posts
    </div>
  )
}

export default PostList
