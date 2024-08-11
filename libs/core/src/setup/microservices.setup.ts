import { INestApplication, INestMicroservice, Logger } from '@nestjs/common';
import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export function getMicroServiceTransport(
	protoPath: string,
	packageName: string,
): NestMicroserviceOptions & MicroserviceOptions {
	return {
		transport: Transport.GRPC,
		options: {
			package: packageName,
			protoPath: join(
				process.cwd(),
				`/libs/proto-schema/src/proto/${protoPath}`,
			),
		},
	};
}
