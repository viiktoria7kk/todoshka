import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoStatus = 'todo' | 'done' | 'in progress';

@Schema()
export class Todo extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ default: 'todo', enum: ['todo', 'done', 'in progress'] })
  status: TodoStatus;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
