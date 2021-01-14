const BASE_URL = 'http://localhost:3001/';

const getReports = async () => {
  
  let dbCall;
  
  await fetch(BASE_URL + 'allreports')
    .then(response => response.json())
    .then(data => {dbCall = data})
    .catch(err => console.log('Fetch error', err));

    return dbCall;
}

module.exports = {
  getReports
}