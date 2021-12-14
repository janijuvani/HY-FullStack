import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const userReducer = (state = null, action) => {
  //console.log('state now: ', state)
  //console.log('action', action)
  switch (action.type) {
  case 'USER_LOGIN':
    // eslint-disable-next-line no-case-declarations
    const user = action.data
    return user
  case 'CLEAR_LOGIN':
    return null


  //case 'INIT_LOGIN':
  //  return action.data
  default:
    return state
  }
}

export const userLogin = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      dispatch({
        type: 'USER_LOGIN',
        data: user
      })
    } catch (exception) {
      dispatch(setNotification('wrong credentials', 'error', 5))

    }

  }
}

export const clearLogin = () => {
  return async dispatch => {
    dispatch({
      type: 'CLEAR_LOGIN',
    })
  }
}

export const initializeLogin = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'USER_LOGIN',
        data: user
      })
    }
  }
}




export default userReducer