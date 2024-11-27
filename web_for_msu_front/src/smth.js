fetch('/api/home/all_roles', {headers: {
    'Authorization': 'Bearer your-auth-token',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }})
  .then(response => console.log(response))
  .catch(error => console.log(error))

