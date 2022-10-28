import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './schemas/job.schema';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    create(createJobDto: CreateJobDto): Promise<Job>;
    findAll(): Promise<Job[]>;
    findOne(id: string): Promise<Job>;
    update(id: string, updateJobDto: UpdateJobDto): Promise<Job & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delete(id: string): Promise<Job>;
}
