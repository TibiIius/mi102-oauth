import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { exit } from 'process';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    await this.$connect().catch((e) => {
      exit(1);
    });
  }

  async enableShutdownHooks(app: INestApplication): Promise<void> {
    // Needed for proper shutdown
    // this.$on('beforeExit', async () => {
    //   await app.close();
    // });
  }
}
