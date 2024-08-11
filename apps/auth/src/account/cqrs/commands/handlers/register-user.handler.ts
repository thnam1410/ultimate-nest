import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { RegisterUserCommand } from '../impl';
import { CreateResponse, LoginServiceTypes } from '@libs/proto-schema';
import { AuthDbContextService } from '@libs/orm/prisma-auth/auth-db-context.service';
import { RpcException } from '@nestjs/microservices';
import { AuthServiceType } from '@prisma/db-auth';
import { generateVerificationCode } from '@libs/common';
import { JwtService } from '@nestjs/jwt';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
	implements ICommandHandler<RegisterUserCommand>
{
	private logger = new Logger(this.constructor.name);

	constructor(
		private readonly eventBus: EventBus,
		private readonly jwtService: JwtService,
		private readonly authDbContext: AuthDbContextService,
	) {}

	async execute(command: RegisterUserCommand): Promise<CreateResponse> {
		this.logger.log(`Async ${command.constructor.name}...`);
		const { cmd } = command;

		try {
			/** Check if user exist with email */
			const userExist = await this.authDbContext.user.findFirst({
				where: { email: cmd.email },
				select: { id: true },
			});

			if (userExist) {
				throw new RpcException('User already exist with this email!');
			}

			let hashPassword: string | null = null;
			let activationLink: string | undefined = undefined;
			let verified: boolean = true;
			if (cmd.service !== LoginServiceTypes.Password) {
				verified = false;
				const pinCode = generateVerificationCode(6);

				const payload = { email: cmd.email, code: pinCode };
				activationLink = this.jwtService.sign(payload, { expiresIn: '1h' });
			}

			this.logger.log('Start create user...');

			await this.authDbContext.user.create({
				data: {
					email: cmd.email,
					firstName: cmd.firstName,
					lastName: cmd.lastName,
					password: hashPassword,
					verified,
					authService: this.toUserAuthService(cmd.service),
				},
			});

			return { activationLink };
		} catch (err) {
			this.logger.error(err);
			throw new RpcException(err);
		}
	}

	private toUserAuthService(service: LoginServiceTypes) {
		switch (service) {
			case LoginServiceTypes.Password:
				return AuthServiceType.Local;
			case LoginServiceTypes.Facebook:
				return AuthServiceType.Facebook;
			case LoginServiceTypes.Google:
				return AuthServiceType.Google;
			default:
				throw new RpcException('Invalid login service');
		}
	}
}
