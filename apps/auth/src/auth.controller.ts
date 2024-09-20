import { Controller, Get, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
	private logger = new Logger(this.constructor.name);
	constructor(private readonly authService: AuthService) {}

	@Get()
	getHello(): string {
		return this.authService.getHello();
	}
}
