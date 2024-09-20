import { AppConfigs, userFromRequest } from '@libs/common';
import {
	Controller,
	Get,
	Inject,
	Logger,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UseAppGuard } from '../../guards/at.guard';
import { GoogleAuthGuard } from '../../guards/google.guard';
import { AuthService } from './auth.service';
import { UseRefreshTokenGuard } from '../../guards/rt.guard';
import { EventBus } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
	private readonly logger = new Logger(this.constructor.name);
	private readonly PAGE_URL?: string;

	constructor(
		private readonly configService: ConfigService<AppConfigs>,
		private readonly authService: AuthService,
		private readonly eventBus: EventBus,
	) {
		this.PAGE_URL = this.configService.get('app.pageUrl', {
			infer: true,
		});
	}

	@UseGuards(GoogleAuthGuard)
	@Get('/google/callback')
	async googleRedirect(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
		const tokens = await this.authService.issueTokens({
			userId: userFromRequest(req).id,
		});
		return tokens;
	}

	@ApiOkResponse()
	@ApiBearerAuth()
	@UseAppGuard()
	@Get('me')
	async me(@Req() req: Request) {
		return { user: userFromRequest(req) };
	}

	@ApiOkResponse()
	@ApiBearerAuth()
	@UseRefreshTokenGuard()
	@Get('refresh')
	async refresh(@Req() req: Request) {
		const user = userFromRequest(req);
		this.logger.log(user);

		const tokens = await this.authService.refreshToken(
			user.id,
			user.refreshToken,
		);
		return tokens;
	}

	@Get('test')
	async test() {
		return await this.authService.test();
	}
}
