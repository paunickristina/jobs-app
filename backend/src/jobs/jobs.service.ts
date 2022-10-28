import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job, JobDocument } from './schemas/job.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: Model<JobDocument>) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const createdJob = await this.jobModel.create(createJobDto);
    return createdJob;
  }

  async findAll(): Promise<Job[]> {
    return this.jobModel.find().exec();
  }

  async findOne(id: string): Promise<Job> {
    return this.jobModel.findOne({ _id: id }).exec();
  }
  
  async update(id: string, updateJobDto: UpdateJobDto) {
    const updatedJob = await this.jobModel.findOne({ _id: id }).exec();
    if (updateJobDto.name) {
      updatedJob.name = updateJobDto.name;
    }
    if (updateJobDto.location) {
      updatedJob.location = updateJobDto.location;
    }
    if (updateJobDto.seniority) {
      updatedJob.seniority = updateJobDto.seniority;
    }
    if (updateJobDto.description) {
      updatedJob.description = updateJobDto.description;
    }
    updatedJob.save();
    return updatedJob;
  }

  async delete(id: string): Promise<Job> {
    return this.jobModel.findByIdAndRemove({ _id: id }).exec();
  }
}
