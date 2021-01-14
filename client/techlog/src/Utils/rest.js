const BASE_URL = 'http://localhost:3001/';

const getReports = async () => {
  
  let dbCall;
  
  await fetch(BASE_URL + 'allreports')
    .then(response => response.json())
    .then(data => {dbCall = data})
    .catch(err => console.log('Fetch error', err));

    //console.log(dbCall);
    return dbCall;
}

const postReport = async (title, searchTags, description, steps) => {
  await fetch(BASE_URL + 'postreport', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      tags: searchTags,
      description: description,
      steps: steps
    })
  }).catch(err => console.log('Fetch error', err)); 
}

const deleteReport = async (id) => {
  await fetch(BASE_URL + `deletereport/${id}`, {
    method: 'DELETE'
  }).catch(err => console.log('Fetch error', err))
}

module.exports = {
  getReports,
  postReport,
  deleteReport
}