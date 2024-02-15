import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoDTO } from './todo.dto';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodos(): Promise<TodoDTO[]> {
    return await this.todoService.findAll();
  }

  @Post()
  async createTodo(@Body() createTodo: TodoDTO): Promise<TodoDTO> {
    return await this.todoService.create(createTodo);
  }

  @Put(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() updateTodo: TodoDTO,
  ): Promise<TodoDTO> {
    return await this.todoService.update(id, updateTodo);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string): Promise<TodoDTO> {
    return await this.todoService.delete(id);
  }
}
