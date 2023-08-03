//Domain: DW Messenger
const axios = require('axios')
axios.defaults.baseURL = 'http://localhost:3000'

async function main() {
  // DELETE ALL
  await axios.get('/secretdb')
  // CREATE USERS
  const fede = await axios.post('/users', { email: 'Fede' })
  const juli = await axios.post('/users', { email: 'juli' })
  const maria = await axios.post('/users', { email: 'maria' })
  const pepita = await axios.post('/users', { email: 'pepita' })
  const rambo = await axios.post('/users', { email: 'rambo' })

  // CREATE POSTS
  const firstPost = await axios.post('/posts', {
    user: fede.data._id,
    bodyPost: 'This is my first message',
  })
  const secondPost = await axios.post('/posts', {
    user: fede.data._id,
    bodyPost: 'This is my second message',
  })

  // DELETE POST
  await axios.delete(`/posts/${fede.data._id}/${secondPost.data._id}`)

  // FOLLOW
  await axios.post(`/users/${fede.data._id}/following`, { user: juli.data._id })
  await axios.post(`/users/${fede.data._id}/following`, { user: rambo.data._id })
  await axios.post(`/users/${fede.data._id}/following`, { user: pepita.data._id })
  await axios.post(`/users/${fede.data._id}/following`, { user: maria.data._id })
  console.log(fede.data.following)
  //UNFOLLOW
  await axios.delete(`/users/${fede.data._id}/unfollowing/${pepita.data._id}`)

  // PROFILE
  // Update profile name
  await axios.patch(`/users/${fede.data._id}/name`, { name: 'Federico' })
  // Update profile description
  await axios.patch(`/users/${fede.data._id}/description`, { description: 'Hi! I am Fede! Alles gut?' })
  // Update profile avatar
  await axios.patch(`/users/${fede.data._id}/avatar`, {
    avatar:
      'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.licdn.com%2Fdms%2Fimage%2FD4E03AQEETspkloHJIw%2Fprofile-displayphoto-shrink_800_800%2F0%2F1682453844837%3Fe%3D2147483647%26v%3Dbeta%26t%3D5H-eDEqsGK62FTdov1nqny3yDv--M7UAKrLonxLUW80&tbnid=LKxBoDD5chcu4M&vet=12ahUKEwj9sYabzMCAAxUiuaQKHehODKAQMygAegQIARBL..i&imgrefurl=https%3A%2F%2Fde.linkedin.com%2Fin%2Fcarrillofa&docid=8StHT0K3T_G6IM&w=800&h=800&q=federico%20andres%20carrillo&ved=2ahUKEwj9sYabzMCAAxUiuaQKHehODKAQMygAegQIARBL',
  })

  //COMMENT
  const firstComment = await axios.post(`/posts/${firstPost.data._id}/comments`, {
    user: juli.data._id,
    text: 'It is working', //text or body
  })
  const secondComment = await axios.post(`/posts/${firstPost.data._id}/comments`, {
    user: pepita.data._id,
    text: 'Well done', //text or body
  })

  // DELETE
  //await axios.delete(`/posts/${firstPost.data._id}/comments/${secondComment.data._id}`)

  // Get user Fede
  const allUsers = await axios.get('http://localhost:3000/users')
  //console.log('List of all users: ', allUsers.data)
  // // Get Post of Fede
  // const allPosts = await axios.get('http://localhost:5000/posts')
  // console.log('Comment of a the post in position 0: ', allPosts.data[0])
}
main() //.catch(err => console.log(err.data.message ? err.data.message : err))

// Fetch users with axios
// axios.get('http://localhost:3000/users').then(response => {
//   console.log(response.data)
// })
// Create a new user with axios
// axios.post('http://localhost:3000/users', { email: 'Fede@gmail.com', username: 'fede' }).then(response => {
//   console.log(response.data)
// })

// //Users
// const fede = new User('fede@gmail.com', 'fedect1')
// const julio = new User('julio@gmail.com', 'julio')
// const maria = new User('maria@gmail.com', 'maria')
// const pepita = new User('pepita@gmail.com', 'pepita')
// const rambo = new User('rambo@gmail.com', 'rambo')

// //User: fede
// fede.profileDescription = 'Hi! I am Fede! Alles gut?'
// fede.profilePictureURL = 'hereGoesAnUrl.jpg'
// fede.addPost('This is my first message')
// fede.addPost('Checking if it is working')
// fede.addPost('Hey you')
// fede.posts[0].addComment(julio, 'It is working')
// fede.posts[0].addComment(maria, 'Arrivederci')
// fede.posts[0].addComment(pepita, 'Well done')
// fede.posts[0].addLike(rambo)
// fede.posts[0].addLike(maria)

// fede.follow(julio)
// fede.follow(maria)
// fede.follow(pepita)
// fede.follow(rambo)
// fede.unfollow(pepita)
// fede.deletePost(2)

// console.log(fede.profileInfo)
// console.log(fede.interactionInfo)
// console.log(fede.postsInfo)
