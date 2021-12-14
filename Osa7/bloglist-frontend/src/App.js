import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateForm from './components/NewBlog'
import Togglable from './components/Togglable'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, deleteBlogCreator } from './reducers/blogReducer'
import { userLogin, initializeLogin, clearLogin } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

import {
  BrowserRouter as Router,
  Routes, Route, useParams, Link
} from 'react-router-dom'

import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  AppBar,
  Toolbar
} from '@material-ui/core'

import styled from 'styled-components'

const Button2 = styled.button`
  background: lightgreen;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 3px;
`

//const UserStyle = styled.div`
//background: LightGrey;
//padding: 1em;
//border: 1px solid black;
//`



const Notification = () => {
  const notification = useSelector(state => state.notification)
  const styleClass = notification.className

  return (
    <div className={styleClass}>
      {notification.message}
    </div>
  )
}


const AllUsers = ({ users }) => {
  console.log(users)
  return (
    <div>
      <h2>Users</h2>
      <div style={{ marginLeft: 245, fontWeight: 'bold' }}> blogs created</div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {users.map(user => (<TableRow key={user.id}>
              <TableCell style={{ width: 200 }}>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </TableCell>
              <TableCell align='left'>{user.blogs.length}</TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}


const UserBlogs = ({ users }) => {
  const id = useParams().id
  console.log(id)
  const user = users.find(user => user.id === id)
  console.log(user)
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>
          {blog.title}
        </li>)}
      </ul>
    </div>
  )
}

const BlogView = ({ blogs, updateLikes }) => {
  const id = useParams().id
  console.log(id)
  const blog = blogs.find(blog => blog.id === id)
  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div>
        {blog.url} <br/>
        {blog.likes} likes <Button2 onClick={() => updateLikes(blog)}>like</Button2> <br/>
        added by {blog.user.name}
        <h3>comments</h3>
        <ul>
          {blog.comments.map(comment => <li key={comment}>
            {comment}
          </li>)}
        </ul>
      </div>
    </div>
  )
}




const App = () => {
  //const [blogs, setBlogs] = useState([])
  //const [errorMessage, setErrorMessage] = useState(null)
  //const [succeedMessage, setSucceedMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)



  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeLogin())
  }, [dispatch])



  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
    dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 'succeed', 5))
  }

  const updateLikes = async (blogToLike) => {
    dispatch(likeBlog(blogToLike.id, blogToLike))
    dispatch(initializeBlogs())
  }

  const deleteBlog = async (blogToDelete) => {
    if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`)) {
      dispatch(deleteBlogCreator(blogToDelete.id))
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
          <Button variant="contained" color="primary" onClick={() => setLoginVisible(true)}>log in</Button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
          <Button id='login-button' variant="contained" color="secondary" onClick={() => setLoginVisible(false)}>cancel</Button>
        </div>
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    dispatch(userLogin(username, password))
    setUsername('')
    setPassword('')
  }


  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(clearLogin())
  }

  const logoutButton = () => (
    <Button variant="outlined" color="inherit" onClick={() => handleLogout() }
    >logout</Button>
  )

  const BlogsPage = () => {
    return(
      <div>
        {createForm()}
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {blogs.map(blog => <TableRow key={blog.id}>
                <TableCell>
                  <Blog key={blog.id} blog={blog} updateLikes={updateLikes} user={user} deleteBlog={deleteBlog} />
                </TableCell>
              </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification/>
        <div>
          {loginForm()}
        </div>
      </div>
    )
  }

  return (
    <Container>
      <div>
        <Router>
          <div>
            <AppBar position="static">
              <Toolbar>
                <Button variant="outlined" color="inherit" component={Link} to="/">blogs</Button>
                <Button variant="outlined" color="inherit" component={Link} to="/users">users</Button>
                {user.name} logged in {logoutButton()}
              </Toolbar>
            </AppBar>

          </div>
          <h2>blog app</h2>
          <Notification/>
          <Routes>
            <Route path="/users/:id" element={<UserBlogs users={users}/>}/>
            <Route path="/blogs/:id" element={<BlogView blogs={blogs} updateLikes={updateLikes}/>}/>
            <Route path="/users" element={<AllUsers users={users}/>}/>
            <Route path="/" element={<BlogsPage/>}/>
          </Routes>
        </Router>
      </div>
    </Container>
  )
}

export default App

//<Route path="/" element={blogs.map(blog =>
//              <Blog key={blog.id} blog={blog} updateLikes={updateLikes} user={user} deleteBlog={deleteBlog} />
//            )}/>
//style={{ backgroundColor: 'lightgray', paddingRight: 5, }}