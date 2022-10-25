import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JobDocument = Job & Document;

@Schema({timestamps: true})
export class Job {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  seniority: string;

  @Prop({ required: true })
  description: string;
}

export const JobSchema = SchemaFactory.createForClass(Job);
