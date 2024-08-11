export type UserReq = {
	id: string;
	email: string;

	refreshToken?: string; // Generate by refresh token guard
};
