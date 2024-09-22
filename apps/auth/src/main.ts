import { getMicroServiceTransport } from '@libs/core';
import { ULTIMATE_NEST_ACCOUNT_PACKAGE_NAME } from '@libs/proto-schema';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

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
