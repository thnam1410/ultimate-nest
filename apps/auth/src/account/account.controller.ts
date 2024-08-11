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
} from '@libs/proto-schema';
import { Controller, Get, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { LoginUserCommand, RegisterUserCommand } from './cqrs';
import { GetUserByIdQuery } from './cqrs/query/impl';

@Controller('account')
@AuthServiceControllerMethods()
export class AccountController implements AuthServiceController {
	private logger = new Logger(this.constructor.name);
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
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
}
