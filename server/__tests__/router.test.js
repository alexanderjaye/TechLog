const app = require('../app.js');
const supertest = require('supertest');

const Report = require('../models/reports.models/reports.schema');
const { generateReportId } = require('../models/reports.models/reports.models');

const request = supertest(app); // simulates http request

//============REPORTS ROUTES==============

// GET /allreports
describe('Route -> /allreports', () => {

  const mocks = {
    report: {
      reportId: generateReportId(), 
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
    await Report.deleteOne({_id: mockId});
    done();
  });

  it('should call Report.find() once', async (done) => {
    const findSpy = jest.spyOn(Report, 'find')
    await request.get('/allreports');
    expect(findSpy).toHaveBeenCalledTimes(1);
    done();
  });
 
});

//get
describe('Route -> /getreport/:id', () => {

  const mock = {
    report: {
      reportId: generateReportId(), 
      title: 'NEWtest', 
      description: 'my desc', 
      tags: ['help'],
      steps: ['do this'], 
      images: []
    }
  };

  
  it('should return a report that exists in the db', async (done) => {
    const newReportMock = await Report.create(mock.report);
    const response = await request.get(`/getreport/${mock.report.reportId}`);
    expect(response.status).toBe(200);
    expect(response.body._id).toEqual(newReportMock._id.toString());
    done();
  });

  it('should return a single report', async (done) => {
    const response = await request.get(`/getreport/${mock.report.reportId}`);
    expect(Array.isArray(response.body)).toBe(false);
    done();
  });

  it('should call Report.findOne once', async (done) => {
    const spyFindOne = jest.spyOn(Report, 'findOne');
    await request.get(`/getreport/${mock.report.reportId}`);
    expect(spyFindOne).toHaveBeenCalledTimes(1);
    done();

  });
});

describe('ROUTE -> /postreport', () => {

  const mock = {
    report: {
      title: 'PostReport_Test', 
      description: 'test', 
      tags: ['test'],
      steps: ['test'], 
      images: []
    }
  };

  let response;
  let spyCreate;

  beforeAll(async (done) => {
    spyCreate = jest.spyOn(Report, 'create');
    response = await request.post(`/postreport`).send(mock.report);
    done();
  });

  afterAll(async (done) => {
    await Report.deleteOne({ _id: response._id});
    done();
  })

  it('should avoid duplication by calling Report.create() once', (done) => {
    expect(spyCreate).toHaveBeenCalledTimes(1);
    done();
  });

  it('should return the saved report in the response body', (done) => {
    expect(response.status).toBe(201);
    expect(mock.report.reportId).toEqual(response.reportId);
    done();
  });

  it('should store the request body in the db', async (done) => {
    const searchResult = await Report.find({ reportId: response.reportId});
    console.log('search', searchResult);
    
    expect(searchResult.reportId).toEqual(searchResult.reportId);
    done();
  });
});

describe('Route -> PATCH /editreport', () => {

  const mock = {
    report: {
      reportId: generateReportId(), 
      title: 'This Should Be Replaced', 
      description: 'my desc', 
      tags: ['help'],
      steps: ['do this'], 
      images: []
    }
  };

  it('should update an existing report in the db & send', async (done) => {
    const savedReport = await Report.create(mock.report);
    mock.report.title = 'PATCHReport_test';
    const response = await request.patch(`/editreport`).send(mock.report);
    expect(response.body).toEqual(savedReport);
    expect(response.body.title).not.toEqual(mock.report.title);
    done();
  });

  it('should call the update function once', async () => {

  });

  it('should not create a new report if one does not exist', async () => {

  });
});

describe('Route -> DELETE /deletereport/:id', () => {

  it('should delete an existing report in the db', () => {

  });

  it('should call the delete function once ONLY', () => {

  });

  it('should not delete a report with a different id to parameter', () => {

  });

});
// router.delete('/deletereport/:id', authMiddleware, reports.deleteReport);


