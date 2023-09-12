import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async createForUser(userId: string, createTodoDto: CreateTodoDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    await this.prisma.todo.create({
      data: {
        text: createTodoDto.text,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
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

  async removeForUser(userId: string, id: number) {
    return await this.prisma.todo.delete({
      where: {
        userId,
        id,
      },
    });
  }
}
