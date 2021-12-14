const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})


blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  try {
    const body = request.body
    //const token = getTokenFrom(request)
    //console.log(request.token)
    //const decodedToken = jwt.verify(request.token, process.env.SECRET)
    //if (!request.token || !decodedToken.id) {
    //  return response.status(401).json({ error: 'token missing or invalid' })
    //}
    const user = request.user

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id })


    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    const body = request.body
    console.log(body)
    blog.comments = blog.comments.concat(body.comment)
    console.log(blog)

    const savedBlog = await blog.save()

    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  // const id = Number(request.params.id)
  try {
    const blog = await Blog.findById(request.params.id)
    //console.log(blog.user.toString())
    const user = request.user
    //console.log(decodedToken.id.toString())
    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end() }
    else {
      return response.status(401).json({
        error: 'not authorized' })}
  } catch(exception) {
    next(exception)
  }
})



blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const newLikes = {
    likes: body.likes
  }

  //const blog = {
  //  title: body.title,
  //  author: body.author,
  //  url: body.url,
  //  likes: body.likes || 0 }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newLikes, { new: true })
    response.json(updatedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter