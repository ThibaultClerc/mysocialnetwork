import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

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

  const handleUserID = () => {
    if (userID === currentUser.user.id) {
      return "me"
    } else {
      return userID
    }
    console.log("j'étais là")
  }

  const update = (id, e) => {
    e.preventDefault();
    fetchPostUpdate(id)
  }
  
  return (
    <div>
        <h4>{text}</h4>
        <Link to={`/users/${handleUserID()}`}>{user}</Link>
        <h6>{likes} likes</h6>
        <button onClick={() => handleClick()} className ="btn btn-primary">Like</button>

      {userId === userID ?       
      <form onSubmit={(e) => update(postID, e)}>
        <h5>Modifier :</h5>
        <input
          type="text"
          value={postUpdate}
          onChange={e => setPostUpdate(e.target.value)}
        />
      <input type="submit" value="Submit" className="mt-3"/>
      </form> : ""}

    </div>

  )
}

export default Post