import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'nest-keycloak-connect';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
