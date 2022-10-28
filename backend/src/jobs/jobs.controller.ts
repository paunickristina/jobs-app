import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './schemas/job.schema';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  async create(@Body() createJobDto: CreateJobDto) {
    const job = await this.jobsService.create(createJobDto);
    return job;
  }

  @Get()
  async findAll(): Promise<Job[]> {
    return this.jobsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Job> {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    const job = await this.jobsService.update(id, updateJobDto);
    return job;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Job> {
    return this.jobsService.delete(id);
  }
}
