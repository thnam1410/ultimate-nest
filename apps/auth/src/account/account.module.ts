import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountCommandHandlers } from './cqrs/commands/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { AccountQueryHandlers } from './cqrs/query/handlers';

@Module({
	imports: [CqrsModule],
	providers: [...AccountCommandHandlers, ...AccountQueryHandlers],
	controllers: [AccountController],
})
export class AccountModule {}
