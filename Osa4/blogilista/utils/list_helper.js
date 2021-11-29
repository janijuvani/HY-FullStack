const _ = require('lodash')
const logger = require('./logger')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  const total = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  return total
}

const favoriteBlog = (blogs) => {
  const max = blogs.reduce((maxBlog, currentBlog) => maxBlog.likes < currentBlog.likes ? currentBlog : maxBlog)
  return {
    title: max.title,
    author: max.author,
    likes: max.likes
  }
}

const mostBlogs = (blogs) => {
  const counts = _.countBy(blogs, 'author')
  const tuples = _.entries(counts)
  const most = _.maxBy(tuples)
  //logger.info(counts)
  //logger.info(tuples)
  //logger.info(most)
  return {
    author: most[0],
    blogs: most[1]
  }
}

const mostLikes = (blogs) => {
  const output =
    _(blogs)
      .groupBy('author')
      .map((objs, key) => ({
        'author': key,
        'count': _.sumBy(objs, 'likes')
      }))

      .value()
  const most = _.maxBy(output, 'count')
  logger.info(output)
  logger.info(most.author, most.count)
  return {
    author: most.author,
    likes: most.count
  }
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}