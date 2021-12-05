import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CreateForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title : newTitle,
      author : newAuthor,
      url : newUrl,
      id : newTitle
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  CreateForm.propTypes = {
    createBlog: PropTypes.func.isRequired
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
        title
          <input
            id='title'
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div>
        author
          <input
            id='author'
            type="text"
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
        url
          <input
            id='url'
            type="text"
            value={newUrl}
            onChange={handleUrlChange}
          />
        </div>
        <button id='create-button' type="submit">create</button>
      </form>
    </div>
  )
}

//<button onClick={() => setCreateBlogVisible(false)}>create</button>

export default CreateForm