import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import PostList from '../../components/Postlist'

const Home = () => {

  const currentUser = useSelector(state => state.currentUser.currentUser)
  console.log(currentUser)

  return (
    
    <div>
    {!Array.isArray(currentUser) && <PostList/>}
      Home
    </div>
  )
}

export default Home
