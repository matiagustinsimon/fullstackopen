const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => {return total + blog.likes}, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length < 1) return null
  return blogs.reduce((max, blog) => { return max.likes > blog.likes ? max : blog })
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}