import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/database.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: '123',
      },
    });

    await this.prisma.todo.create({
      data: {
        text: 'test',
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  async findAllForUser() {
    return await this.prisma.todo.findMany({
      where: {
        userId: '123',
      },
    });
  }

  async findOneForUser(id: number) {
    return await this.prisma.todo.findFirst({
      where: {
        userId: '123',
        id,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.todo.delete({
      where: {
        userId: '123',
        id,
      },
    });
  }
}
