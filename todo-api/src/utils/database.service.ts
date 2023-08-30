import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { exit } from 'process';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    await this.$connect().catch((e) => {
      exit(1);
    });

    try {
      await this.user.create({
        data: {
          id: '123',
          username: 'test',
        },
      });
    } catch {}
  }

  async enableShutdownHooks(app: INestApplication): Promise<void> {
    // Needed for proper shutdown
    // this.$on('beforeExit', async () => {
    //   await app.close();
    // });
  }
}
