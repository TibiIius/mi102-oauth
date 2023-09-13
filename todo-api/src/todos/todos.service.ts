import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { CreateTodoDto } from '../../../common/dto/create-todo.dto';
import { TodoDto } from '../../../common/dto/todo-dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async createForUser(
    userId: string,
    createTodoDto: CreateTodoDto,
  ): Promise<TodoDto> {
    const { id, text } = await this.prisma.todo.create({
      data: {
        text: createTodoDto.text,
        userId,
      },
    });

    return {
      id,
      text,
    };
  }

  async findAllForUser(userId: string) {
    return await this.prisma.todo.findMany({
      where: {
        userId,
      },
    });
  }

  async findOneForUser(userId: string, id: number) {
    return await this.prisma.todo.findFirst({
      where: {
        userId,
        id,
      },
    });
  }

  async removeForUser(userId: string, id: number): Promise<TodoDto> {
    const { text } = await this.prisma.todo.delete({
      where: {
        userId,
        id,
      },
    });
    return {
      id,
      text,
    };
  }
}
