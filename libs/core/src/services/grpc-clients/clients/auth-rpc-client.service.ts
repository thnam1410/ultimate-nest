import { AppService } from '@libs/core/constants';
import { AUTH_SERVICE_NAME, AuthServiceClient } from '@libs/proto-schema';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class AuthRpcClientService implements OnModuleInit {
	public svc: AuthServiceClient;

	constructor(@Inject(AppService.AUTH) private rpcClient: ClientGrpc) {}

	onModuleInit() {
		this.svc = this.rpcClient.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
	}
}
