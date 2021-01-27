import { reportModel as Reports, reportType } from './reports.schema';
import { DocumentQuery } from 'mongoose';


export const allReports = (): DocumentQuery<reportType[], reportType, {}> => {
  const reply = Reports.find({});
  return reply;
}

export const getReport = (reportId: number): DocumentQuery<reportType | null, reportType, {}> => {
  const reply = Reports.findOne({ reportId });
  return reply;
}

export const generateReportId = (rounds: number = 1): number => {
  let uid: string = '';
  while (rounds > 0) {
    uid += Math.random().toString(10).substring(2, 10);
    rounds -= 1;
  }
  return Number(uid);
};

export const newReport = async (title: string, description: string, tags: string[], steps: string[], images: string[]): Promise<reportType> => {

  const reportId = generateReportId(); // new reportID
  let isUnique = false;
  let existingReportId: reportType | null;
  while (!isUnique) {
    existingReportId = await Reports.findOne({ reportId }); // check unique
    if (!existingReportId) isUnique = true;
  }
  const createdReport = await Reports.create({ reportId, title, description, tags, steps, images });
  return createdReport;
}

//TODO sort out _id and reportID
export const editReport = (_id: string, title: string, description: string, tags: string[], steps: string[]): DocumentQuery<reportType | null, reportType, {}> => {
  const reply = Reports.findByIdAndUpdate(_id, { title, description, tags, steps });
  return reply;
}

export const deleteReport = (id: string): DocumentQuery<reportType | null, reportType, {}> => {
  const reply = Reports.findByIdAndDelete({ _id: id })
  return reply;
}


