'use server';

import { db } from './conn';

import { auth } from '@clerk/nextjs/server';

export const completedOnboarding = async () => {
	const { userId } = await auth();

	const { username, bio } = Object.fromEntries(formData);

	try {
		await db.query(
			`INSERT INTO users (username, bio, clerk_id) VALUES ($1, $2, $3)`,
			[username, bio, userId]
		);
	} catch (err) {
		return {
			error: 'Please create an account or sign in before continuing',
		};
	}
};
