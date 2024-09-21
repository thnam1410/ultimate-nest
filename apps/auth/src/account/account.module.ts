import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountCommandHandlers } from './cqrs/commands/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountQueryHandlers } from './cqrs/query/handlers';

@Module({
	imports: [CqrsModule],
	controllers: [AccountController],
	providers: [...AccountCommandHandlers, ...AccountQueryHandlers],
})
export class AccountModule {}
