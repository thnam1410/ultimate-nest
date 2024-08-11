import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { corsOptions, setupSwagger } from '@libs/common';
import { VersioningType } from '@nestjs/common';
async function bootstrap() {
	const app = await NestFactory.create(ApiGatewayModule);

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
}
bootstrap();
