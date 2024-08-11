import * as bcrypt from 'bcrypt';

export const generateHashedPassword: (password: string) => string = (
	password,
) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

export const validPassword = (
	password: string | undefined | null,
	passwordHash: string | undefined | null,
) => {
	if (!password || !passwordHash) {
		throw new Error('Password or passwordHash is not provided!');
	}
	return bcrypt.compareSync(password, passwordHash);
};
