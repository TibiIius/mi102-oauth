import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AuthenticatedUser } from 'nest-keycloak-connect';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  createForUser(
    @AuthenticatedUser() user,
    @Body() createTodoDto: CreateTodoDto,
  ) {
    return this.todosService.createForUser(user.sub, createTodoDto);
  }

  @Get()
  findAllForUser(@AuthenticatedUser() user) {
    console.log(user);
    return this.todosService.findAllForUser(user.sub);
  }

  @Get(':id')
  findOneForUser(
    @AuthenticatedUser() user,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.todosService.findOneForUser(user.sub, id);
  }

  @Delete(':id')
  removeForUser(
    @AuthenticatedUser() user,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.todosService.removeForUser(user.sub, id);
  }
}
