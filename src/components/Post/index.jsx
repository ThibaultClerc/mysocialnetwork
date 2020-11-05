import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const Post = ({text, user, likes, userID, postID}) => {
  const [isLiked, setIsLiked] = useState(false)
  const currentUser = useSelector(state => state.currentUser.currentUser)

  const data = {
    like: isLiked ? (likes - 1) : (likes + 1)
  }

  const fetchLike = () => {
    fetch(`https://my-pasteque-space.herokuapp.com/posts/${postID}`, {
      "method": "PUT",
      "headers": {
        'Authorization': `Bearer ${Cookies.get('token')}`, 
        "Content-Type": "application/json"
      },
      "body": JSON.stringify(data)
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

  const handleClick = () => {
    setIsLiked(!isLiked)
    fetchLike()
  }

  const handleUserID = () => {
    if (userID === currentUser.user.id) {
      return "me"
    } else {
      return userID
    }
    console.log("j'étais là")
  }
  
  return (
    <li>
        <h4>{text}</h4>
        <Link to={`/users/${handleUserID()}`}>{user}</Link>
        <h6>{likes} likes</h6>
        <button onClick={() => handleClick()}>Like</button>
    </li>
  )
}

export default Post
