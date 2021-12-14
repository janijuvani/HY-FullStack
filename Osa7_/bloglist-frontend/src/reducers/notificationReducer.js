const initialState = {
  message: null,
  display: 'none',
  className: 'Succeed'
}


const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SHOW':
    return action
  case 'HIDE':
    return initialState
  default:
    return state
  }
}


export const setNotification = (message, className, time) => {
  return dispatch => {
    dispatch({
      type: 'SHOW',
      message,
      className
    })
    setTimeout(() => {
      dispatch({
        type: 'HIDE',
        message,
        className
      })}, time * 1000)
  }
}



export default notificationReducer