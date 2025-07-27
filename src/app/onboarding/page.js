import { db } from '@/utils/conn';

import { auth } from '@clerk/nextjs/server';

import { handleSubmit } from '@/utils/actions';
import UserInfo from '@/components/UserInfo';

export default async function OnboardingPage() {
	const { userId } = await auth();

	const handleUserInfo = async (formData) => {
		'use server';

		const res = await handleSubmit(formData);

		if (res?.message) {
			await user?.reload();
			router.push(`/`);
		}

		if (res?.error) {
			setError(res?.error);
		}
	};

	return (
		<div>
			<UserInfo action={handleUserInfo} textBtn={`Create Account`} />
		</div>
	);
}
