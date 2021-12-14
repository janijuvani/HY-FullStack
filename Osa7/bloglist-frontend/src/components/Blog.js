import React from 'react'

import {
  Link
} from 'react-router-dom'

const Blog = ({ blog, user, deleteBlog }) => {
  //const [showAll, setShowAll] = useState(false)

  //const hideWhenVisible = { display: visible ? 'none' : '' };
  //const showWhenVisible = { display: visible ? '' : 'none' };

  //const Visibility = () => {
  //  setShowAll(!showAll)
  //}

  //console.log(user)
  //console.log(blog)

  //const blogStyle = {
  //  paddingTop: 10,
  //  paddingLeft: 2,
  //  border: 'solid',
  //  borderWidth: 1,
  //  marginBottom: 5
  //}

  const removeStyle = {
    background: 'lightblue',
    float: 'right'
  }

  //if (showAll === false) {
  //  return (
  //    <div style={blogStyle}>
  //      <div>
  //        {blog.title} {blog.author} <button id='view-button' onClick={Visibility}>view</button>
  //      </div>
  //    </div>
  //  )
  //}

  return (
    <div>
      <Link to={`/blogs/${blog.id}`}>{blog.title}, {blog.author}</Link>
      {user.username === blog.user.username && (
        <button style={removeStyle} onClick={() => deleteBlog(blog)}>Remove</button>)}
    </div>
  )
}

export default Blog