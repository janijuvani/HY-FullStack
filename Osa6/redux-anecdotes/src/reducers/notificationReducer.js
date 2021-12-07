const initialState = {
    message: null,
    display: 'none'
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

  
  export const setNotification = (message, time) => {
    return dispatch => {
        dispatch({
          type: 'SHOW',
          message,
        })
        setTimeout(() => {
            dispatch({
                type: 'HIDE',
                message,
              })}, time * 1000)
        }
  }

export default notificationReducer