import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Post = ({text, user, likes, userID, postID}) => {
  const [isLiked, setIsLiked] = useState(false)
  const currentUser = useSelector(state => state.currentUser.currentUser)
  const [postUpdate, setPostUpdate] = useState(text)
  const [userId, setUserId] = useState(currentUser.user.id)



  const data = {
    like: isLiked ? (likes - 1) : (likes + 1)
  }

  const fetchLike = () => {
    fetch(`https://my-pasteque-space.herokuapp.com/posts/${postID}`, {
      "method": "PUT",
      "headers": {
        'Authorization': `Bearer ${currentUser.jwt}`, 
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

  const fetchPostUpdate = (postid) => {
    fetch(`https://my-pasteque-space.herokuapp.com/posts/${postid}`, {
      "method": "PUT",
      "headers": {
        'Authorization': `Bearer ${currentUser.jwt}`, 
        "Content-Type": "application/json"
      },
      "body": JSON.stringify(dataUpdate)
    })
    .then((response) => response.json())
    .then((response) => {
      if (response.statusCode === 400) {
        console.log(response.message);
      } else {
        console.log(response);
        console.log("Hello")
      }
    })
  }

  console.log(data)
  
  const dataUpdate = {
    text :postUpdate
  }  

  const handleClick = () => {
    setIsLiked(!isLiked);
    fetchLike()
  }

  function Update(id,e){
    e.preventDefault();
    fetchPostUpdate(id)
  }


  return (
    <div>
        <p>{text}</p>
        <Link to={`/users/${userID}`}>{user}</Link>
        <h6>{likes} likes</h6>
        <button onClick={() => handleClick()} className ="btn btn-primary">Like</button>

      {userId === userID ?       
      <form onSubmit={function(event){Update(postID, event)}}>
      <label>
        Modifier mon post
        <input
          type="text"
          value={postUpdate}
          onChange={e => setPostUpdate(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
      </form> : ""}

    </div>

  )
}

export default Post
