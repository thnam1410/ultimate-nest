import { Module } from '@nestjs/common';
import { AuthRpcClientService } from './clients/auth-rpc-client.service';
import { ClientsModule } from '@nestjs/microservices';
import { generateGrpcClientRegister } from './grpc-client-register';
import { AppService } from '@libs/core/constants';

const clients = [AuthRpcClientService];
@Module({
	imports: [
		ClientsModule.register(generateGrpcClientRegister([AppService.AUTH])),
	],
	providers: clients,
	exports: clients,
})
export class GrpcModule {}
