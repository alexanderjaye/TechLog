
import * as mongoose from 'mongoose';
import { reportsConnection } from '../connections';

const Schema = mongoose.Schema;

export interface reportType extends mongoose.Document {
  reportId: number;
  title: string;
  description: string;
  tags: string[];
  steps?: string[];
  images?: string[];
}

const Report: mongoose.Schema = new Schema({

  reportId: {
    type: Number,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  tags: {
    type: [String],
    required: true
  },

  steps: {
    type: [String],
    required: false
  },

  images: {
    type: [String],
    required: false
  }

}, { autoCreate: true });

export const reportModel: mongoose.Model<reportType> = reportsConnection.model('report', Report);
