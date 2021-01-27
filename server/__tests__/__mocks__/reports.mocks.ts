export class MockReport {
  reportId: number = 0; 
  title: string = '';
  description: string = 'test description';
  tags: string[] = ['tag1', 'tag2', 'tag3'];
  steps: string[] = ['step1', 'step2'];
  images: string[] = [];

  constructor (title?) {
    this.title = title || 'TEST';
    this.generateReportId();
  }

  generateReportId (rounds = 1) {
    let uid = '';
    while (rounds > 0) {
      uid += Math.random().toString(10).substring(2, 10);
      rounds -= 1;
    }
    this.reportId = Number(uid);
  };
}

export interface ReportSchema {
  reportId?: number;
  title: string;
  description: string;
  tags: string[];
  steps: string[];
  images: string[];
  _id?: string;
}
