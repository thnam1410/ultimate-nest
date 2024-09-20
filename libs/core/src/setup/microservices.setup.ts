import { KAFKA_CONFIG } from '@libs/common';
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
			url: '0.0.0.0:50051',
			package: packageName,
			protoPath: join(`./proto/${protoPath}`),
		},
	};
}

type KafkaServiceName = keyof (typeof KAFKA_CONFIG)['services'];

export function getKafkaConsumerSetup(
	service: KafkaServiceName,
): NestMicroserviceOptions & MicroserviceOptions {
	const { clientId, groupId } = KAFKA_CONFIG.services[service];
	return {
		transport: Transport.KAFKA,
		options: {
			client: {
				clientId,
				brokers: [KAFKA_CONFIG.host],
			},
			consumer: {
				groupId,
			},
		},
	};
}
