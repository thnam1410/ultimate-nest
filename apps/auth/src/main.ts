import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { getMicroServiceTransport } from '@libs/core';
import { ULTIMATE_NEST_ACCOUNT_PACKAGE_NAME } from '@libs/proto-schema';

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		AuthModule,
		{
			...getMicroServiceTransport(
				'auth.proto',
				ULTIMATE_NEST_ACCOUNT_PACKAGE_NAME,
			),
		},
	);

	await await app.listen();
}
bootstrap();
