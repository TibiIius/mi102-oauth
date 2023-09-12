import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import {
  AuthGuard,
  KeycloakConnectModule,
  PolicyEnforcementMode,
  TokenValidation,
} from 'nest-keycloak-connect';
import { TodosModule } from './todos/todos.module';
import { PrismaModule } from './utils/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    TodosModule,
    ConfigModule.forRoot({ isGlobal: true }),
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080', // might be http://localhost:8080/auth for older keycloak versions
      realm: 'FHKiel',
      clientId: 'nest-todo-api',
      secret: 'pAWrsGP2FVEyVujfOoTU8nekeGWIs0D5',
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE, // optional
      tokenValidation: TokenValidation.ONLINE, // optional
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
