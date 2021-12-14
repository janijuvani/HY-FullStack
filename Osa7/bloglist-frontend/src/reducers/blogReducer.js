import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)
  switch (action.type) {
  case 'CREATE':
    // eslint-disable-next-line no-case-declarations
    const newBlog = action.data
    return state.concat(newBlog)

  case 'DELETE':
    // eslint-disable-next-line no-case-declarations
    const id = action.data
    return state.filter(blog =>
      blog.id !== id)

  case 'LIKE':
    // eslint-disable-next-line no-case-declarations
    const likedBlog = action.data
    console.log(likedBlog)
    return state.map(blog =>
      blog.id === likedBlog.id ? likedBlog : blog)

  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

export const createBlog = (newObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(newObject)
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
  }
}

export const deleteBlogCreator = (id) => {
  return async dispatch => {
    await blogService.del(id)
    dispatch({
      type: 'DELETE',
      data: id
    })
  }
}

export const likeBlog = (id, blogToUpdate) => {
  return async dispatch => {
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
    const likedBlog = await blogService.update(id, updatedBlog)
    dispatch({
      type: 'LIKE',
      data: likedBlog
    })
  }
}


export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const arrangedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    dispatch({
      type: 'INIT_BLOGS',
      data: arrangedBlogs,
    })
  }
}

export default blogReducer