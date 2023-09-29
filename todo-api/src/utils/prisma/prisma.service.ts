import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { exit } from 'process';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);
  async onModuleInit(): Promise<void> {
    await this.$connect().catch((e) => {
      this.logger.error(
        'Error setting up the database connection',
        e instanceof Error ? e.stack : e,
      );
      exit(1);
    });
  }
}
