const reports = require('../models/reports.models/reports.models');

const allReports = async (req, res) => {
  res.send('All reports')
}

const getReport = async (req, res) => {
  res.send('Get report')
}

const newReport = async (req, res) => {
  try {
    const { title, description, tags, steps, comments } = req.body;
    console.log(title, description, tags, steps, comments)
    const reply = await reports.newReport(title, description, tags, steps, comments);
    res.status(201).send(reply);
  } catch (err) {
    console.log('Create new report error', err);
    res.status(500).send(err);
  }
}

const editReport = async (req, res) => {
  res.send('Edit report')
}

const deleteReport = async (req, res) => {
  res.send('Delete report')
}

module.exports = {
  allReports,
  getReport,
  newReport,
  editReport,
  deleteReport
}