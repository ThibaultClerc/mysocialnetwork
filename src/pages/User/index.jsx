import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";


const User = () => {
  const currentUser = useSelector(state => state.currentUser.currentUser)
  const [username, setUsername] = useState(currentUser.user.username)
  const [userId, setUserId] = useState(currentUser.user.id)
  const [description, setDescription] = useState(currentUser.user.description || "")
  const [displayedUser, setDisplayedUser] = useState([])
  const [posts, setPosts] = useState([])
  let { userID } = useParams()

  const dataUsername = {
    username: username
  }

  const dataUserDescription = {
    description: description
  }

  const fetchUser = () => {
    fetch(`https://my-pasteque-space.herokuapp.com/users/${userID}`, {
      "method": "GET",
      "headers": {
        'Authorization': `Bearer ${Cookies.get('token')}`, 
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((response) => {
      if (response.statusCode === 400) {
        console.log(response.message);
      } else {
        console.log("je suis al")
        setDisplayedUser(response)
      }
    })
  }

  const fetchPosts = () => {
    let currentID = ""
    if (userID === "me") {
      currentID = userId
    } else {
      currentID = userID
    }
    fetch(`https://my-pasteque-space.herokuapp.com/posts?user.id=${currentID}`, {
      "method": "GET",
      "headers": {
        'Authorization': `Bearer ${Cookies.get('token')}`, 
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((response) => {
      if (response.statusCode === 400) {
        console.log(response.message);
      } else {
        setPosts(response)
      }
    })
  }

  const fetchNewUsername = () => {
      fetch(`https://my-pasteque-space.herokuapp.com/users/${userId}`, {
        "method": "PUT",
        "headers": {
          'Authorization': `Bearer ${Cookies.get('token')}`, 
          "Content-Type": "application/json"
        },
        "body": JSON.stringify(dataUsername)
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

  const fetchDescription= () => {
      fetch(`https://my-pasteque-space.herokuapp.com/users/${userId}`, {
        "method": "PUT",
        "headers": {
          'Authorization': `Bearer ${Cookies.get('token')}`, 
          "Content-Type": "application/json"
        },
        "body": JSON.stringify(dataUserDescription)
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
    fetchUser()
    fetchPosts()
  }, [])

  const handleUsernameSubmit = (e) => {
    e.preventDefault()
    fetchNewUsername()
  }

  const handleDescriptionSubmit = (e) => {
    e.preventDefault()
    fetchDescription()
  }

  console.log(currentUser.jwt)

  return (
    <>
    <h1>USER PROFILE</h1>
    <h1>{displayedUser.username}</h1>
    {!displayedUser.description ? <p>Pas de description</p> : <p>{displayedUser.description}</p>}
    <ul>      
      {posts.map(post => <li>{post.text}</li>)}
    </ul>
    {userID === 'me' && 
    <div>
      <form onSubmit={handleUsernameSubmit}>
        <label>
          Modifier mon username
          <input
            type="text"
            value={currentUser.username}
            onChange={e => setUsername(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <form onSubmit={handleDescriptionSubmit}>
        <label>
          Modifier ma description
          <input
            type="text"
            value={currentUser.description}
            onChange={e => setDescription(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
    }
    </>
  );
}

export default User