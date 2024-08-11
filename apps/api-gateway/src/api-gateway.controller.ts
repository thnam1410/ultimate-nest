import { Controller, Get, Logger } from '@nestjs/common';

@Controller()
export class ApiGatewayController {
	private logger = new Logger(this.constructor.name);

	constructor() {}

	@Get()
	getHello(): string {
		this.logger.log('Hi ...!');

		return `Welcome to Nam Truong's Ultimate NestJS`;
	}
}
