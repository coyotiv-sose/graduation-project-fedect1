const mongoose = require('mongoose')
const Comment = require('./comment')
const postSchema = new mongoose.Schema({
  bodyPost: String,
  comments: [],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expirationDate: {
    type: Date,
    default: function () {
      return new Date(this.createdAt.getTime() + 3 * 60 * 60 * 1000)
    },
  },
  status: Boolean,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})
class Post {
  async createComment(author, text) {
    const newComment = new Comment(author, text)
    this.comments.push(newComment)
    //this.expirationDate = new Date(this.expirationDate.getTime() + 15 * 60 * 1000) //refactor
    await this.save()
    return this
  }

  async deleteComment(index) {
    this.comments.splice(index, 1)
    await this.save()
    return this
  }

  addLike(author) {
    //addLikeBy
    this.likes.push(author.profile.userName)
    this.expirationDate = new Date(this.expirationDate.getTime() + 5 * 60 * 1000)
  }

  deleteLike(author) {
    //removeLikeFrom
    const indexOfAuthor = this.interaction.following.indexOf(author.profile.userName)
    if (indexOfAuthor !== -1) {
      this.interaction.following.splice(indexOfAuthor, 1)
      return (this.expirationDate = new Date(this.expirationDate.getTime() - 5 * 60 * 1000))
    }
  }

  get allComments() {
    const commentsByString =
      this.comments.length === 0
        ? '** No comments yet **'
        : this.comments.map((el, i) => `${i + 1}- ${el.author}: ${el.comment}`).join('\n') //refactor
    return `--- Comments ---\n${commentsByString}`
  }

  get allLikes() {
    const likesByString =
      this.likes.length === 0 ? 'No likes yet' : this.likes.map((el, i) => `${i + 1}- ${el}`).join('\n') //refactor
    return `--- Likes ---\n${likesByString}\n`
  }
}
postSchema.loadClass(Post)
module.exports = mongoose.model('Post', postSchema)
