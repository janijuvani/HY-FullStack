import React from 'react'

import {
  TextField,
  Button
} from '@material-ui/core'

const LoginForm = ({ handleLogin, username, handleUsernameChange, password, handlePasswordChange }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        <TextField label="username"

          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <TextField label="password"
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <Button id='login-button' variant="contained" color="primary" type="submit">login</Button>
    </form>
  )
}

export default LoginForm