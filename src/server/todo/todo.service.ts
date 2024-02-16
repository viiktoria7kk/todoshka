import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './model/todo.model';
import { TodoDTO } from './dto/todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
  ) {}

  async findAll(): Promise<TodoDTO[]> {
    const todos = await this.todoModel.find().exec();
    return todos.map((todo) => this.convertToTodoDTO(todo));
  }

  async create(todo: TodoDTO): Promise<TodoDTO> {
    const createdTodo = new this.todoModel(todo);
    return await createdTodo.save();
  }

  async update(id: string, todo: TodoDTO): Promise<TodoDTO> {
    return await this.todoModel
      .findByIdAndUpdate(id, todo, { new: true })
      .exec();
  }

  async delete(id: string): Promise<TodoDTO> {
    return await this.todoModel.findByIdAndDelete(id).exec();
  }

  private convertToTodoDTO(todo: Todo): TodoDTO {
    return {
      id: todo.id,
      title: todo.title,
      status: todo.status,
    };
  }
}
