import z, { ZodRawShape } from 'zod';

export function validateConfig<T extends ZodRawShape>(
	config: Record<string, unknown>,
	schema: z.ZodObject<T>,
) {
	const { success, data, error } = schema.safeParse(config);

	if (success) return data;

	throw new Error(error.toString());
}
