import { Model } from 'mongoose';
import { Job, JobDocument } from './schemas/job.schema';
import { CreateJobDto } from './dto/create-job.dto';
export declare class JobsService {
    private jobModel;
    constructor(jobModel: Model<JobDocument>);
    create(createJobDto: CreateJobDto): Promise<Job>;
    findAll(): Promise<Job[]>;
    findOne(id: string): Promise<Job>;
    delete(id: string): Promise<Job>;
}
