export const generateVerificationCode = (length: number): string => {
	const characters = '0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		const index = Math.floor(Math.random() * characters.length);
		result += characters.charAt(index);
	}
	return result;
};
