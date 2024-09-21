import {
	AuthServiceController,
	AuthServiceControllerMethods,
	CreateRequest,
	CreateResponse,
	LoginRequest,
	LoginResponse,
	LogoutRequest,
	LogoutResponse,
	ReadRequest,
	ReadResponse,
	TestRequest,
	TestResponse,
} from '@libs/proto-schema';
import { Controller, Get, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { LoginUserCommand, RegisterUserCommand } from './cqrs';
import { GetUserByIdQuery } from './cqrs/query/impl';
import { Metadata } from '@grpc/grpc-js';
import { AuthDbContextService } from '@libs/orm/prisma-auth';

let cacheRandomOfPod: string | null = null;
@Controller('account')
@AuthServiceControllerMethods()
export class AccountController implements AuthServiceController {
	private logger = new Logger(this.constructor.name);

	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
		private a: AuthDbContextService,
	) {}

	async create(request: CreateRequest) {
		return await this.commandBus.execute(new RegisterUserCommand(request));
	}

	async login(request: LoginRequest) {
		return await this.commandBus.execute(new LoginUserCommand(request));
	}

	async read(request: ReadRequest) {
		return await this.queryBus.execute(new GetUserByIdQuery(request));
	}

	logout(
		request: LogoutRequest,
	): LogoutResponse | Observable<LogoutResponse> | Promise<LogoutResponse> {
		throw new Error('Method not implemented.');
	}

	async test(request: TestRequest, metadata?: Metadata): Promise<TestResponse> {
		if (cacheRandomOfPod) {
			return { data: cacheRandomOfPod };
		}
		const random = Math.random();

		cacheRandomOfPod = random.toString();
		return {
			data: cacheRandomOfPod,
		};
	}
}
