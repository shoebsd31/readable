//  Get all posts
export const fetchPosts = () =>
  fetch(`${process.env.REACT_APP_BACKEND}/posts`, {
    headers: { Authorization: 'whatever-you-want' }
  }).then(data => data.json())

// Get all posts in a category
export const fetchPostsByCategory = category =>
  fetch(`${process.env.REACT_APP_BACKEND}/${category}/posts`, {
    headers: { Authorization: 'whatever-you-want' }
  }).then(data => data.json())

// Get a single post based on id
export const fetchPost = id =>
  fetch(`${process.env.REACT_APP_BACKEND}/posts/${id}`, {
    headers: { Authorization: 'whatever-you-want' }
  }).then(data => data.json())

// Delete post
export const deletePost = id =>
  fetch(`${process.env.REACT_APP_BACKEND}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'whatever-you-want'
    }
  }).then(data => data.json())

// Change voteScore for a post
export const vote = (id, vote) =>
  fetch(`${process.env.REACT_APP_BACKEND}/posts/${id}`, {
    method: 'POST',
    headers: {
      Authorization: 'whatever-you-want',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: vote })
  }).then(data => data.json())

// Add new post
export const addPost = data =>
  fetch(`${process.env.REACT_APP_BACKEND}/posts`, {
    method: 'POST',
    headers: {
      Authorization: 'whatever-you-want',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(data => data.json())

// Edit post
export const editPost = (data, id) =>
  fetch(`${process.env.REACT_APP_BACKEND}/posts/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: 'whatever-you-want',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(data => data.json())
