import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserRequest, fetchUserSuccess, fetchUserFailure } from '../../actions';
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchUser())
  }

  const data = {
    identifier: email,
    password: password
  }

  const fetchUser = () => {
    return (dispatch) => {
      dispatch(fetchUserRequest());
      fetch("https://my-pasteque-space.herokuapp.com/auth/local", {
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
          Cookies.set('token', response.jwt);
        }
      })
    }
  }

  return (
    <>
    <h1>LOGIN</h1>
    <form onSubmit={handleSubmit}>
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

export default Login
