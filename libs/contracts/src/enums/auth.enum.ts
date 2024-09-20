export const AuthServiceTypes = {
	Local: 'Local',
	Facebook: 'Facebook',
	Google: 'Google',
	Github: 'Github',
} as const;

export type AuthServiceTypes =
	(typeof AuthServiceTypes)[keyof typeof AuthServiceTypes];
