export const fetchCategories = () => fetch(`${process.env.REACT_APP_BACKEND}/categories`, {
  headers: {
    'Authorization': 'whatever-you-want'
  },
    credentials: 'include'
  })
  .then(data => data.json())
  .then(data => data.categories)
