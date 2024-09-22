import { corsOptions, setupSwagger } from '@libs/common';
import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
	const app = await NestFactory.create(ApiGatewayModule);
	app.useLogger(app.get(Logger));

	app.useGlobalInterceptors(new LoggerErrorInterceptor());

	app.enableCors(corsOptions);

	app.setGlobalPrefix('api');
	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: '1',
	});

	const document = SwaggerModule.createDocument(
		app,
		setupSwagger(
			'Ultimate Nest API Gateway',
			'API Gateway for Ultimate Nest',
			'1.0.0',
			'api-gateway',
		),
	);
	SwaggerModule.setup('swagger', app, document);

	await app.listen(3000);
	console.log('Swagger at: http://localhost:3000/swagger');
}
bootstrap();
