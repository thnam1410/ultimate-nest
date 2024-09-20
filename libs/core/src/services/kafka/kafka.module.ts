import { DynamicModule, Global, Module } from '@nestjs/common';
import { Kafka, KafkaConfig } from 'kafkajs';
import { KafkaService } from './kafka.service';
import { ConfigModule } from '@nestjs/config';

export const KAFKA_CONFIG_TOKEN: Readonly<string> = 'KAFKA_CONFIG';

@Global()
@Module({
	providers: [],
})
export class KafkaModule {
	// static register(config: KafkaConfig): DynamicModule {
	// 	return {
	// 		module: KafkaModule,
	// 		providers: [
	// 			{
	// 				provide: KAFKA_CONFIG_TOKEN,
	// 				useValue: config,
	// 			},
	// 			KafkaService,
	// 		],
	// 		exports: [KafkaService],
	// 	};
	// }
	// static registerAsync(): DynamicModule {
	// 	return {
	// 		module: KafkaModule,
	// 		imports: [ConfigModule],
	// 		providers: [
	// 			KafkaService,
	// 			{
	// 				provide: KAFKA_CONFIG_TOKEN,
	// 				useFactory: configProvider.useFactory,
	// 				inject: ,
	// 			},
	// 		],
	// 		exports: [KafkaService],
	// 	};
	// }
}
