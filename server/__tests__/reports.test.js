// Internal Modules
const app = require('../app.js');
const Report = require('../models/reports.models/reports.schema');
const { generateReportId } = require('../models/reports.models/reports.models');

// Mock Data 
// Package Dependencies
const supertest = require('supertest');

const request = supertest(app); // simulates http request

const routes = {
  reports: '/reports'
}

//============REPORTS ROUTES==============

// GET /allreports
describe('============REPORTS ROUTES==============', () => {

  describe('Route -> GET /reports (all)', () => {

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
      const response = await request.get(routes.reports);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      done();
    });

    it('if db populated, should return an array of Reports', async (done) => {
      
      const reportMock = await Report.create(mocks.report);

      const mockId = reportMock._id.toString();

      const response = await request.get(routes.reports); // response is mocked
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
      await request.get(routes.reports);
      expect(findSpy).toHaveBeenCalledTimes(1);
      done();
    });
  
  });

  //get
  describe('Route -> GET /reports/:id', () => {

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
      const response = await request.get(`${routes.reports}/${mock.report.reportId}`);
      expect(response.status).toBe(200);
      expect(response.body._id).toEqual(newReportMock._id.toString());
      done();
    });

    it('should return a single report', async (done) => {
      const response = await request.get(`${routes.reports}/${mock.report.reportId}`);
      expect(Array.isArray(response.body)).toBe(false);
      done();
    });

    it('should call Report.findOne once', async (done) => {
      const spyFindOne = jest.spyOn(Report, 'findOne');
      await request.get(`${routes.reports}/${mock.report.reportId}`);
      expect(spyFindOne).toHaveBeenCalledTimes(1);
      done();

    });
  });

  describe('ROUTE -> POST /reports', () => {

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
      response = await request.post(routes.reports).send(mock.report);
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

  describe('Route -> PUT /reports', () => {

    const mock = {
      report: {
        reportId: generateReportId(), 
        title: 'This Should Be Replaced', 
        description: 'my desc', 
        tags: ['help'],
        steps: ['do this'], 
        images: []
      },
      updatedReport: {
        title: 'PatchTestTitle', 
        description: 'new desc', 
        tags: ['help'],
        steps: ['do this'], 
        images: [],
        _id: ''
      }
    };

    it('should update an existing report in the db & send', async (done) => {
      const savedReport = await Report.create(mock.report);
      mock.updatedReport._id = savedReport._id.toString();

      const response = await request.put(routes.reports).send(mock.updatedReport);
      expect(response.body._id).toEqual(savedReport._id.toString());

      const updateSearch = await Report.findOne({ _id: response.body._id});
      expect(updateSearch.title).toBe(mock.updatedReport.title);
      done();
    });

    it('should call the update function once', async (done) => {
      const spyUpdate = jest.spyOn(Report, 'findByIdAndUpdate');
      const savedReport = await Report.create(mock.report);
      mock.updatedReport._id = savedReport._id.toString();
      const response = await request.put(routes.reports).send(mock.updatedReport);
      expect(spyUpdate).toBeCalledTimes(1);
      done();
    });

    it('should not create a new report if one does not exist', async () => {
      const savedReport = await Report.create(mock.report);
      
      const deletedReport = await Report.findByIdAndDelete({ _id: savedReport._id.toString() });
      
      const response = await request.put(routes.reports).send(mock.updatedReport);

    });
  });

  describe('Route -> DELETE /report/:id', () => {

    const mock = {
      report: {
        reportId: generateReportId(), 
        title: 'This Should Be Replaced', 
        description: 'my desc', 
        tags: ['help'],
        steps: ['do this'], 
        images: []
      },
      safeReport: {
        reportId: generateReportId(), 
        title: 'This Report Should Not Be Deleted', 
        description: 'my desc', 
        tags: ['help'],
        steps: ['do this'], 
        images: []
      }
    };

    let savedReport;

    beforeEach(async () => {
      savedReport = await Report.create(mock.report);
    })

    it('should delete an existing report in the db', async (done) => {
      const response = await request.delete(`${routes.reports}/${savedReport._id}`);
      const search = await Report.find({ _id: savedReport._id });
      expect(search.length).toBe(0);
      done();

    });

    it('should call the delete function once ONLY', async (done) => {
      spyDelete = jest.spyOn(Report, 'findByIdAndDelete');
      const response = await request.delete(`${routes.reports}/${savedReport._id}`);
      expect(spyDelete).toBeCalledTimes(1);
      done();
    });

    it('should not delete a report with a different id to parameter', async (done) => {
      const safeReport = await Report.create(mock.safeReport); // save report not to be deleted
      await request.delete(`${routes.reports}/${savedReport._id}`); // call delete route
      const safeReportSearch = await Report.find({ _id: safeReport._id }); // find safe-report
      const deleteReportSearch = await Report.findOne({ _id: savedReport._id });
      
      expect(safeReportSearch[0].title).toBe(mock.safeReport.title);
      expect(deleteReportSearch).toBe(null);
      done();
    });

    it('should return the deleted report', async (done) => {
      const response = await request.delete(`${routes.reports}/${savedReport._id}`);
      expect(response.body._id).toBe(savedReport._id.toString());
      done();
    });
  });

  describe('Integrated Tests', () => {
    const mocks = {
      report: { 
        title: 'Integrated Test', 
        description: 'my desc', 
        tags: ['help'],
        steps: ['do this'], 
        images: []
      }
    };

    it('should be able to post and get reports', async (done) => {
      const postResponse = await request.post(routes.reports).send(mocks.report);
      const getAllResponses = await request.get(routes.reports);
      const filteredResponse = getAllResponses.body.find((res) => {
        return res._id === postResponse.body._id;
      });
      const getSingleResponse = await request.get(`${routes.reports}/${filteredResponse.reportId}`);
      expect(getSingleResponse.body).toEqual(filteredResponse);
      done();
    });

    it('')
  });
});