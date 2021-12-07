import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"


const AnecdoteList = (props) => {
    //const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch() 
 
    const vote = (id, anecdote) => {
        const message = `You voted '${anecdote.content}'`
        dispatch(voteAnecdote(id, anecdote))
        dispatch(setNotification(message, 5))
        console.log('vote', id)
  }

    const anecdotes = useSelector(state => {
        return state.filter === ''
          ? state.anecdotes
          : state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    })
    


  return (
    <div>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote => 
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList