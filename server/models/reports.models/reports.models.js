const { findByIdAndDelete } = require('./reports.schema');
const Reports = require('./reports.schema');

const allReports = () => {
  const reply = Reports.find({});
  return reply;
}

const getReport = (id) => {
  const reply = Reports.find({_id:id});
  return reply;
}

const newReport = (title, description, tags, steps, comments) => {
  const reply = Reports.create({title, description, tags, steps, comments});
  return reply;
}

const editReport = (id, title, description, tags, steps, comments) => {
  const reply = Reports.findByIdAndUpdate(id, {title, description, tags, steps, comments});
  return reply;
}

const deleteReport = (id) => {
  const reply = Reports.findByIdAndDelete({_id:id})
  return reply;
}

module.exports = {
  allReports,
  getReport,
  newReport,
  editReport,
  deleteReport
}