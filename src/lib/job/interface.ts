export interface JobInterface {
  addJob(payload: IAddJob): Promise<{ message: string; error: string }>;
  getJobs(): Promise<{ error: any; jobs: IJob[] }>;
  findJobById(id: string): Promise<{ error: any; job: IJob }>;
  changeJobStatus(
    payload: IChangeJobStatus
  ): Promise<{ error: string; job: IJob }>;
}

export interface IChangeJobStatus {
  id: string;
  status?: number;
  userStatus?: 1 | 0;
  beeStatus?: 1 | 0;
}

export interface IAddJob {
  taskId: string;
  locationId: string;
  street: string;
  size: string;
  description: string;
  the_date: string;
  the_time: string;
}

export interface IJob {
  id: string;
  status: string;
  size: string;
  price: number;
  hours: number;
  street: string;
  description: string;
  the_date: string;
  the_time: string;
  payment_due_date: string;
  created_at: string;
}
