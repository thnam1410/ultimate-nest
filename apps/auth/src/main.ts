import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { getKafkaConsumerSetup, getMicroServiceTransport } from '@libs/core';
import { ULTIMATE_NEST_ACCOUNT_PACKAGE_NAME } from '@libs/proto-schema';
import { LoginUserHandler } from './account/cqrs/commands/handlers/login-user.handler';
import { AccountController } from './account/account.controller';
import { AccountModule } from './account/account.module';

async function bootstrap() {
	const app = await NestFactory.create(AuthModule);

	app.connectMicroservice<MicroserviceOptions>({
		...getMicroServiceTransport(
			'auth.proto',
			ULTIMATE_NEST_ACCOUNT_PACKAGE_NAME,
		),
	});

	// app.connectMicroservice(getKafkaConsumerSetup('auth'));

	await app.startAllMicroservices();
	await app.listen(3001);
}
bootstrap();
