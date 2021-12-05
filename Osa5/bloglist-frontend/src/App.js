import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import CreateForm from './components/NewBlog'
import Togglable from './components/Togglable'
import './App.css'


const SucceedNotification = ({ succeedMessage }) => {
  if (succeedMessage === null) {
    return null
  }
  return (
    <div className="succeed">
      {succeedMessage}
    </div>
  )
}

const ErrorNotification = ({ errorMessage }) => {
  if (errorMessage === null) {
    return null
  }
  return (
    <div className="error">
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [succeedMessage, setSucceedMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  //const [createBlogVisible, setCreateBlogVisible] = useState(false)


  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( blogs )
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlogObject = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlogObject))
      const allBlogs = await blogService.getAll()
      setBlogs( allBlogs )
      setSucceedMessage(`a new blog ${newBlogObject.title} by ${newBlogObject.author} added`)
      setTimeout(() => {
        setSucceedMessage(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage('Can not be added')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const updateLikes = async (blogToUpdate) => {
    //console.log(blogToUpdate)
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
    //console.log(updatedBlog)
    const response = await blogService.update(updatedBlog.id, updatedBlog)
    //console.log(response)
    setBlogs(blogs.map(blog => blog.id !== blogToUpdate.id ? blog : response))
    //const allBlogs = await blogService.getAll()
    //setBlogs( allBlogs )
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( blogs )
    })
  }

  const deleteBlog = async (blogToDelete) => {
    if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`)) {
      await blogService.del(blogToDelete.id)
      setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
    }
  }

  const blogFormRef = useRef()

  const createForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <CreateForm createBlog={addBlog}/>
    </Togglable>
  )



  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }


  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(window.localStorage.getItem('loggedBlogappUser'))
  }

  const logoutButton = () => (
    <button onClick={() => handleLogout() }
    >logout</button>
  )


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <SucceedNotification succeedMessage={succeedMessage}/>
        <ErrorNotification errorMessage={errorMessage}/>
        <div>
          {loginForm()}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <SucceedNotification succeedMessage={succeedMessage}/>
      <ErrorNotification errorMessage={errorMessage}/>
      <div>
        <p>{user.name} logged in {logoutButton()} <br/></p>
        {createForm()}
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateLikes={updateLikes} user={user} deleteBlog={deleteBlog} />
      )}
    </div>
  )
}

export default App