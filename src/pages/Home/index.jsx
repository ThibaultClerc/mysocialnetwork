import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchPostListFailure } from '../../actions';
import PostList from '../../components/Postlist'

const Home = () => {
  const [post, setPost] = useState("")
  const currentUser = useSelector(state => state.currentUser.currentUser)

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchPost(data)
  }

  const data = () => {
    if (Array.isArray(currentUser)) {
      return
    } else {
      return {
        text: post,
        user: currentUser.user.id
      }
    }
  }

  const fetchPost = (data) => {
    fetch("https://my-pasteque-space.herokuapp.com/posts", {
      "method": "POST",
      "headers": {
        'Authorization': `Bearer ${currentUser.jwt}`, 
        "Content-Type": "application/json"
      },
      "body": JSON.stringify(data())
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

  console.log(currentUser.id)

  return (
    <>
    {!Array.isArray(currentUser) &&
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Ecrire un post:
            <input
              type="text"
              value={post}
              onChange={e => setPost(e.target.value)}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <PostList/>
      </div>
    }
    </>
  )
}

export default Home
