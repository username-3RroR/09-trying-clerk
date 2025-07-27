'use server';

import { db } from './conn';

import { auth } from '@clerk/nextjs/server';
import { RedirectToSignUp } from '@clerk/nextjs';

export const handleSubmit = async (formData) => {
	const { userId } = await auth();

	await db.query(`SELECT id FROM users WHERE clerk_id = $1`, [userId]);

	const { username, bio } = Object.fromEntries(formData);

	try {
		await db.query(
			`INSERT INTO users (username, bio, clerk_id) VALUES ($1, $2, $3)`,
			[username, bio, userId]
		);
	} catch (err) {
		throw new Error(
			'Please create an account or sign in before continuing'
		);
	}
	RedirectToSignUp();
};
