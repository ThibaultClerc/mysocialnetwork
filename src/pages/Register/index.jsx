import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserRequest, fetchUserSuccess, fetchUserFailure } from '../../actions';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom'

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirection, setRedirection]= useState(false)
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(fetchUser())
  }

  const data = {
    username : username,
    email: email,
    password: password
  }

  const fetchUser = () => {
    return (dispatch) => {
      dispatch(fetchUserRequest());
      fetch("http://localhost:1337/auth/local/register", {
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "body": JSON.stringify(data)
      })
      .then((response) => response.json())
      .then((response) => {
        if (response.statusCode === 400) {
          dispatch(fetchUserFailure(response.message));
        } else {
          dispatch(fetchUserSuccess(response));
          Cookies.set('token', response.jwt)
          setRedirection(true)
        }
      })
    }
  }
  

  return (
    <>
    {redirection && <Redirect to='/'/>}
    <h1>REGISTER</h1>
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="text"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
    </>
  );
}

export default Register
