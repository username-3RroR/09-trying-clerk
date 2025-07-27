import { db } from '@/utils/conn';

import { auth } from '@clerk/nextjs/server';
import { connect } from '@/utils/connect';
import { useRouter } from 'next/navigation';

export default async function ProfilePage() {
	const res = await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [
		userId,
	]);

	const userInfo = res.rows;

	const userActive = res.rows.length > 0;

	if (!userActive) {
		router.push(`/onboarding`);
	}

	if (userActive) {
		return (
			<div>
				<h1>Welcome back, {userInfo.username}</h1>
			</div>
		);
	}
}
