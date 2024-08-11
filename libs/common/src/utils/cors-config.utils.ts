import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const corsOptions: CorsOptions = {
	origin: '*',
	allowedHeaders: '*',
	// preflightContinue: true,
	credentials: true,
	optionsSuccessStatus: 200,
};
