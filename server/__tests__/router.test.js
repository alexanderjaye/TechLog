const app = require('../app.js');
const supertest = require('supertest');
const Report = require('../models/reports.models/reports.schema');

const request = supertest(app); // simulates http request

// const mongoose = require('mongoose')
// const databaseName = 'test'

// beforeAll(async () => {
//   const url = `mongodb://127.0.0.1/${databaseName}`
//   const dbConnection = await mongoose.createConnection(uri, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     useFindAndModify: false
    // });
// })

// 

describe('Route -> /allreports', () => {

  it('should return an array', async (done) => {
    const response = await request.get('/allreports');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    done();
  });

  it('if db populated, should return an array of Reports', async (done) => {
    
    const reportMock = await Report.create({
      reportId: 23456234, 
      title: 'NEWtest', 
      description: 'my desc', 
      tags: ['help'],
      steps: ['do this'], 
      images: []
    });

    const mockId = reportMock._id.toString();

    const response = await request.get('/allreports'); // response is mocked
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({_id: mockId})
      ])
    );
    done();
  });
});

// expect(obj).toEqual(
//   expect.objectContaining({
//     id: '111',
//     productName: 'Jest Handbook'
//   })
// );
// describe('Route -> postreport', () => {
  
//   // const testReport = new Report()

//   // it('should save a report to the database', async (done) => {
    
//   // });
// });


// router.get('/allreports', reports.allReports);

// router.get('/getreport/:id', reports.getReport);

// router.post('/postreport', reports.newReport);

// router.patch('/editreport', authMiddleware, reports.editReport);

// router.delete('/deletereport/:id', authMiddleware, reports.deleteReport);


