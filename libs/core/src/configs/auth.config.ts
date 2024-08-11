import {
	validateConfig,
	AppConfigs,
	FACEBOOK_CONFIG_SCHEMA,
	GOOGLE_CONFIG_SCHEMA,
} from '@libs/common';
import { registerAs } from '@nestjs/config';

export default registerAs<AppConfigs['auth']>('auth', () => {
	const google = validateConfig(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK_URL,
		},
		GOOGLE_CONFIG_SCHEMA,
	);
	return {
		google,
		facebook: validateConfig(
			{
				clientId: process.env.FACEBOOK_CLIENT_ID,
				clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
			},
			FACEBOOK_CONFIG_SCHEMA,
		),
	};
});
