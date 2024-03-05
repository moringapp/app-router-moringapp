import { jobFragment } from "../graphql/fragment";
import GraphQL from "../graphql/graphql";
import { IAddJob, IChangeJobStatus, IJob, JobInterface } from "./interface";

class Job implements JobInterface {
  constructor(private graphql: GraphQL) {}

  async addJob({
    taskId,
    locationId,
    street,
    size,
    description,
    the_date,
    the_time,
  }: IAddJob): Promise<{ message: string; error: any }> {
    const { data, error } = await this.graphql.mutation(`#graphql
        mutation {
            createJob(
            task_id: "${taskId}"
            location_id: "${locationId}"
            street: "${street}"
            size: "${size}"
            description: "${description}"
            the_date: "${the_date}"
            the_time: "${the_time}"
            ) {
            message
            error
            }
        }
    `);

    return {
      message: data?.createJob?.message || "",
      error: error,
    };
  }

  async getJobs(): Promise<{ error: any; jobs: IJob[] }> {
    const { data, error } = await this.graphql.query(`#graphql
  { 
    me{
      jobs{ ${jobFragment} }
    }
  }
      `);

    return {
      error: error,
      jobs: data?.me?.jobs || [],
    };
  }

  async findJobById(id: string): Promise<{ error: any; job: IJob }> {
    const { data, error } = await this.graphql.query(`#graphql
  { 
    job(id: "${id}"){
        ${jobFragment}
    }
  }
      `);

    return {
      error: error,
      job: data?.job || {},
    };
  }

  async changeJobStatus({
    id,
    status,
    userStatus,
    beeStatus,
  }: IChangeJobStatus): Promise<{ error: string; job: IJob }> {
    const { data, error } = await this.graphql.mutation(`#graphql
    mutation{
        updateJob(
          job_id:"${id}", 
          ${userStatus ? `user_confirm_job_is_done: ${userStatus}` : ""}
          ${beeStatus ? `bee_confirm_job_is_done: ${beeStatus}` : ""}
          ${status ? `status: ${status}` : ""}
          ){
          error
          message
          job{
            ${jobFragment}
          }
        }
      }`);

    return {
      error: data?.updateJob?.error || "",
      job: data?.updateJob?.job || {},
    };
  }
}
