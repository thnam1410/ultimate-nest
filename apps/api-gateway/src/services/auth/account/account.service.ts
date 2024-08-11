import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as Auth from '@libs/proto-schema';
import { AuthRpcClientService } from '@libs/core';
import { lastValueFrom } from 'rxjs';
@Injectable()
export class AccountService {
	logger = new Logger(this.constructor.name);

	constructor(private readonly authRpcClient: AuthRpcClientService) {}

	public async validateOrCreateUser(
		logCmd: Auth.LoginRequest,
		regCmd: Auth.CreateRequest,
	): Promise<Auth.User | undefined> {
		let user: Auth.User | null = null;
		await this.loginCmd(logCmd)
			.then((value) => {
				if (value) {
					user = value.user ?? null;
				}
			})
			.catch((reason) => {
				this.logger.error(reason);
			});

		if (user) return user;

		try {
			await this.createUser(regCmd);
			const result = await this.loginCmd(logCmd);
			return result.user;
		} catch (e) {
			this.logger.error(e);

			throw new UnauthorizedException(e.message);
		}
	}

	public async validateUser(
		input: Auth.LoginRequest,
	): Promise<Auth.User | undefined> {
		try {
			const result = await this.loginCmd(input);
			return result.user;
		} catch (e) {
			this.logger.error(e);
			throw new UnauthorizedException(e.message);
		}
	}

	public async getUser(input: Auth.ReadRequest): Promise<Auth.ReadResponse> {
		try {
			const response = await lastValueFrom(this.authRpcClient.svc.read(input));
			return response;
		} catch (e) {
			this.logger.error(e);
			throw new Error(e.message);
		}
	}

	private async createUser(
		input: Auth.CreateRequest,
	): Promise<Auth.CreateResponse> {
		this.logger.log('Create User...');
		try {
			const response = await lastValueFrom(
				this.authRpcClient.svc.create(input),
			);
			this.logger.log(response);
			return response;
		} catch (e) {
			this.logger.log(e);
			throw new Error(e.message);
		}
	}

	private async loginCmd(
		input: Auth.LoginRequest,
	): Promise<Auth.LoginResponse> {
		this.logger.log('Login User...');
		try {
			const response = await lastValueFrom(this.authRpcClient.svc.login(input));
			this.logger.log(response);
			return response;
		} catch (e) {
			this.logger.log(e);
			throw new Error(e.message);
		}
	}
}
