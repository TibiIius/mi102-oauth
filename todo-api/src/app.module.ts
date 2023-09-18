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
      authServerUrl: 'http://localhost:8080',
      realm: 'FHKiel',
      clientId: 'nest-todo-api',
      secret: 'pAWrsGP2FVEyVujfOoTU8nekeGWIs0D5',
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE, // Don't check for any defined resources in Keycloak as we don't use this feature
      // tokenValidation: TokenValidation.ONLINE, // Performs token validation against the Keycloak instance directly (contra: resource intensive)
      tokenValidation: TokenValidation.OFFLINE, // Uses the public keys exposed by the Keycloak instance to validate tokens (contra: stateless, i.e. can't check for tokens invalidated by logout)
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
