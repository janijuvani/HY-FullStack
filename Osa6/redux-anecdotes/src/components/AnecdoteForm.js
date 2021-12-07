import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"
import { connect } from 'react-redux'


const AnecdoteForm = (props) => {
    //const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)

        const message = `You created '${content}'`
        props.setNotification(message, 5)
    }


    return (
        <form onSubmit={addAnecdote}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
    )
}

const mapStateToProps = (state) => {
    return {
      anecdotes: state.anecdotes,
      notification: state.notification
    }
  }
  
  const mapDispatchToProps = {
    createAnecdote, setNotification
  }
  
const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm

//export default AnecdoteForm