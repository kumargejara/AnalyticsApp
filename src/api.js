const api = "http://localhost:4002"
const API_KEY = '__api_key__'
const headers = {
  'Accept': 'application/json',
  'Authorization': API_KEY
}

// create an account
export const getData = () =>
  fetch(`${api}/`, {method: 'GET'})
  .then(res => res.json())