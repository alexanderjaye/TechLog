const { response } = require('express');

const router = require('express').Router();
const reports = require('./controllers/reports.controller');

//Reports routes
router.get('/allreports', reports.allReports);

router.get('/getreport/:id', reports.getReport);

router.post('/postreport', reports.newReport);

router.patch('/editreport/:id', reports.editReport);

router.delete('/deletereport/:id', reports.deleteReport);

module.exports = router;
