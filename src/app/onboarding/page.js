'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { completedOnboarding } from '@/utils/actions';

export default function OnboardingPage() {
	const [error, setError] = useState('');

	const { user } = useUser();

	const router = useRouter();

	const handleSubmit = async () => {
		const formData = new FormData();

		const res = await completedOnboarding(formData);

		if (res?.message) {
			await user?.reload();
			router.push(`/profile`);
		}

		if (res?.error) {
			setError(res?.error);
		}
	};

	return (
		<div>
			<h1>Please create an account, before continuing</h1>

			<form action={handleSubmit}>
				<div>
					<label>Choose an username</label>
					<input name="username" type="text" required />
				</div>

				<div>
					<label>Share something about yourself</label>
					<input name="bio" type="text" required />
				</div>

				{error && <p className="text-orange-700">{error}</p>}

				<button type="submit">Create Account</button>
			</form>
		</div>
	);
}
