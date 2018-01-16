export const fetchComments = (id) =>
  fetch(`${process.env.REACT_APP_BACKEND}/posts/${id}/comments`, { headers: { 'Authorization': 'whatever-you-want' }})
    .then(data => data.json())
    .then(data => data)

// Add new post
export const addComment = (data) =>
  fetch(`${process.env.REACT_APP_BACKEND}/comments`,
    {
      method: 'POST',
      headers: {
       'Authorization': 'whatever-you-want',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(data)
    })
    .then(data => data.json())

  // Change voteScore for a comment
  export const voteComment = (id, vote) =>
    fetch(`${process.env.REACT_APP_BACKEND}/comments/${id}`,
      {
        method: 'POST',
        headers: {
         'Authorization': 'whatever-you-want',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({option: vote})
      })
      .then(data => data.json())

  // Delete post
  export const deleteComment = (id) =>
    fetch(`${process.env.REACT_APP_BACKEND}/comments/${id}`,
      {
        method: 'DELETE',
        headers: {
         'Authorization': 'whatever-you-want',
       }
      })
      .then(data => data.json())
