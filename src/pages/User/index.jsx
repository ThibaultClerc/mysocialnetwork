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
  }, [userID])

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
    <div className="text-center pt-5 mt-5">
    <h1>{displayedUser.username}</h1>
    {!displayedUser.description ? <p>Pas de description</p> : <p>{displayedUser.description}</p>}
    <div className="row mx-auto card-columns justify-content-center">      
      {posts.map(post => <div className = "card col-3 mt-3 ml-1 ml-1 p-4">{post.text}</div>)}
    </div>
    {userID === 'me' && 
    <div>
      <form onSubmit={handleUsernameSubmit}>
        <h3 className="mb-3">Modifier mon username</h3>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="mb-4"
          />
        <input type="submit" value="Submit" />
      </form>
      <form onSubmit={handleDescriptionSubmit}>
      <h3 className="mb-3">Modifier ma description</h3>
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        <input type="submit" value="Submit" />
      </form>
    </div>
    }
    </div>
  );
}

export default User