import { CoreModule } from '@libs/core';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ApiGatewayController } from './api-gateway.controller';
import { AuthModule } from './services/auth/auth.module';

@Module({
	imports: [JwtModule.register({ global: true }), AuthModule, CoreModule],
	controllers: [ApiGatewayController],
	providers: [],
})
export class ApiGatewayModule {}
