const Reports = require('./reports.schema');

const newReport = (title, description, tags, steps, comments) => {
  const reply = Reports.create({title, description, tags, steps, comments});
  return reply;
}

module.exports = {
  newReport
}