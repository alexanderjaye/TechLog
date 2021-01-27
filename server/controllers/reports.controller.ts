
import * as reports from '../models/reports.models/reports.models';
import { Request, Response, NextFunction } from 'express';
import { report } from 'process';

export const allReports = async (req: Request, res: Response): Promise<void> => {
  try {
    const reply = await reports.allReports();
    res.status(200).send(reply);
  } catch (err) {
    console.log('Return all reports error', err);
    res.status(500).send('Return all reports error');
  }
};

export const getReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const reportId: number = Number(id);
    console.log('GET - IN reportID', reportId)
    const reply = await reports.getReport(reportId);
    console.log(reply);
    res.status(200).send(reply);
  } catch (err) {
    console.log('Return single report error', err);
    res.status(500).send('Return single report error');
  }
};

export const newReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, tags, steps, images } = req.body;
    const reply = await reports.newReport(title, description, tags, steps, images);
    res.status(201).send(reply);
  } catch (err) {
    console.log('Create new report error', err);
    res.status(500).send('Create new report error');
  }
};

export const editReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const { _id, title, description, tags, steps } = req.body;
    const reply = await reports.editReport(_id, title, description, tags, steps);
    res.status(200).send(reply);     //Was using 204 but no res body :(
  } catch (err) {
    console.log('Edit report error', err);
    res.status(500).send('Edit report error');
  }
};

export const deleteReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const reply = await reports.deleteReport(id);
    res.status(200).send(reply);
  } catch (err) {
    console.log('Delete report error', err);
    res.status(500).send('Delete report error');
  }
};
