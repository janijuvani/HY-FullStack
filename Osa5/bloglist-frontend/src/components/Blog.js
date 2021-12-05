import React, { useState } from 'react'

const Blog = ({ blog, updateLikes, user, deleteBlog }) => {
  const [showAll, setShowAll] = useState(false)

  //const hideWhenVisible = { display: visible ? 'none' : '' };
  //const showWhenVisible = { display: visible ? '' : 'none' };

  const Visibility = () => {
    setShowAll(!showAll)
  }

  //console.log(user)
  //console.log(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeStyle = {
    background: 'lightblue'
  }

  if (showAll === false) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author} <button id='view-button' onClick={Visibility}>view</button>
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={Visibility}>hide</button> <br/>
        {blog.url} <br/>
          likes {blog.likes} <button onClick={() => updateLikes(blog)}>like</button> <br/>
        {blog.user.name}
      </div>
      <div>{user.username === blog.user.username && (
        <button style={removeStyle} onClick={() => deleteBlog(blog)}>Remove</button>)}
      </div>
    </div>
  )
}

export default Blog