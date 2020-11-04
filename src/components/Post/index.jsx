import React, { useState } from 'react';
import { Link } from 'react-router-dom'

const Post = ({text, user, likes, userID, postID}) => {
  const [isLiked, setIsLiked] = useState(false)

  const data = {
    like: isLiked ? (likes - 1) : (likes + 1)
  }

  const fetchLike = () => {
      fetch(`https://my-pasteque-space.herokuapp.com/posts/${postID}`, {
        "method": "PUT",
        "headers": {
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

    console.log(data)
  

  const handleClick = () => {
    setIsLiked(!isLiked)
    fetchLike()
  }

  

  return (
    <li>
        <h4>{text}</h4>
        <Link to={`/users/${userID}`}>{user}</Link>
        <h6>{likes} likes</h6>
        <button onClick={() => handleClick()}>Like</button>
    </li>
  )
}

export default Post
