import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { LoginUserCommand } from '../impl';
import { AuthDbContextService } from '@libs/orm/prisma-auth/auth-db-context.service';
import { RpcException } from '@nestjs/microservices';
import { LoginResponse, LoginServiceTypes } from '@libs/proto-schema';
import { validPassword } from '@libs/common';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
	private logger = new Logger(this.constructor.name);
	constructor(private readonly authDbContext: AuthDbContextService) {}

	async execute(command: LoginUserCommand): Promise<LoginResponse> {
		this.logger.log(`Async ${command.constructor.name}...`);
		const { cmd } = command;

		this.logger.log(`Command... ${JSON.stringify(cmd)}`);
		try {
			const user = await this.authDbContext.user.findFirst({
				where: { email: cmd.params?.email },
			});

			if (!user) {
				throw new NotFoundException('Login credentials is incorrect!');
			}

			if (cmd.service === LoginServiceTypes.Password) {
				const isValidPw = validPassword(cmd.params?.password, user.password);

				if (!isValidPw) {
					throw new BadRequestException('Login credentials is incorrect!');
				}
			}

			return {
				//@ts-ignore
				user,
				session: undefined,
			};
		} catch (error) {
			this.logger.log(error);
			throw new RpcException(error.message);
		}
	}
}
