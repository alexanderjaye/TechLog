const app = require('../app.js');
const supertest = require('supertest');

const Report = require('../models/reports.models/reports.schema');
const request = supertest(app); // simulates http request



describe('Route -> /allreports', () => {

  const mocks = {
    report: {
      reportId: 23456234, 
      title: 'NEWtest', 
      description: 'my desc', 
      tags: ['help'],
      steps: ['do this'], 
      images: []
    }
  };
 

  it('should return an array', async (done) => {
    const response = await request.get('/allreports');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    done();
  });

  it('if db populated, should return an array of Reports', async (done) => {
    
    const reportMock = await Report.create(mocks.report);

    const mockId = reportMock._id.toString();

    const response = await request.get('/allreports'); // response is mocked
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({_id: mockId})
      ])
    );
    await Report.delete({_id: mockId});
    done();
  });

  it('should call Report.find() once', async (done) => {
    Report.find = jest.fn();
    const response = await request.get('/allreports');
    expect(Report.find).toHaveBeenCalledTimes(1);
    done();
  });
 
});

describe('Route -> /getreport/:id', () => {

  it('should return a single report', async () => {
    
  });

  it('should return a report that exists in the db', () => {
    
  });
});

// router.get('/getreport/:id', reports.getReport);

// router.post('/postreport', reports.newReport);

// router.patch('/editreport', authMiddleware, reports.editReport);

// router.delete('/deletereport/:id', authMiddleware, reports.deleteReport);


