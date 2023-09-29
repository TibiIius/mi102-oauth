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
import { CreateTodoDto } from '../../../common/dto/create-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  createForUser(
    // Header provided by `nest-keycloak-connect`, exposing the user token's claims, enabling us to securely get the user's ID via the `sub` claim
    @AuthenticatedUser() user,
    @Body() createTodoDto: CreateTodoDto,
  ) {
    return this.todosService.createForUser(user.sub, createTodoDto);
  }

  @Get()
  findAllForUser(@AuthenticatedUser() user) {
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
