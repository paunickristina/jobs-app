import { Model } from 'mongoose';
import { Job, JobDocument } from './schemas/job.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
export declare class JobsService {
    private jobModel;
    constructor(jobModel: Model<JobDocument>);
    create(createJobDto: CreateJobDto): Promise<Job>;
    findAll(): Promise<Job[]>;
    findOne(id: string): Promise<Job>;
    update(id: string, updateJobDto: UpdateJobDto): Promise<Job & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delete(id: string): Promise<Job>;
}
