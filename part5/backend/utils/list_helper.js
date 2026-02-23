const _ = require('lodash')
const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => {
    return total + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length < 1) return null
  return blogs.reduce((max, blog) => {
    return max.likes > blog.likes ? max : blog
  })
}

const mostBlogs = (blogs) => {
  if (blogs.length < 1) return null
  const autor_ganador = _(blogs).countBy('author').entries().maxBy(1)
  return {
    author: autor_ganador[0],
    blogs: autor_ganador[1],
  }
}

const mostLikes= (blogs) => {
  if (blogs.length < 1) return null
  return _(blogs).groupBy('author').map((authorBlogs, authorName) => {
    return {
      author: authorName,
      likes: _.sumBy(authorBlogs, 'likes')
    }
  }).maxBy('likes')
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}