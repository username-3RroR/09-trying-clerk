import { db } from '@/utils/conn';

import { auth } from '@clerk/nextjs/server';
import { RedirectToSignUp } from '@clerk/nextjs';

import UserInfo from '@/components/UserInfo';

export default async function ProfilePage() {
	const { userId } = await auth();

	const res = await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [
		userId,
	]);

	const userInfo = res.rows;

	const userActive = res.rows.length > 0;

	async function handleNewSubmit(formData) {
		'use server';

		const { username, bio } = Object.fromEntries(formData);

		await db.query(
			`INSERT INTO users (username, bio, clerk_id) VALUES ($1, $2, $3)`,
			[username, bio, userId]
		);
	}

	if (!userActive) {
		return (
			<UserInfo
				action={handleNewSubmit}
				textBtn={`Create Account`}
				userId={userId}
			/>
		);
	}

	return (
		<div>
			<h1>Welcome back, {userInfo.username}</h1>
		</div>
	);
}
