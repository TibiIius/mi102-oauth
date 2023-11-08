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
      authServerUrl:
        process.env.KEYCLOAK_AUTH_SERVER_URL || 'http://localhost:8080', // The base URL of the Keycloak server, defaults to localhost under Keycloaks default port
      realm: process.env.KEYCLOAK_AUTH_SERVER_REALM || 'FHKiel',
      clientId: process.env.CONFIDENTIAL_CLIENT_ID || 'nest-todo-api',
      secret:
        process.env.CONFIDENTIAL_CLIENT_SECRET ||
        'pAWrsGP2FVEyVujfOoTU8nekeGWIs0D5',
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE, // Don't check for any defined resources in Keycloak as we don't use this feature
      // tokenValidation: TokenValidation.ONLINE, // Performs token validation against the Keycloak instance directly (contra: resource intensive)
      tokenValidation: TokenValidation.OFFLINE, // Uses the public keys exposed by the Keycloak instance to validate tokens (contra: stateless, i.e. can't check for tokens invalidated by logout)
    }),
  ],
  providers: [
    // Simple guard provided by `nest-keycloak-connect`, securing all routes under the app module (i.e. all routes) by checking for a valid access token in the Authorization header of the HTTP request
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
