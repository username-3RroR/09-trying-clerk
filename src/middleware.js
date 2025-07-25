import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([`/profile(.*)`]);

const isOnboardingRoute = createRouteMatcher([`/onboarding`]);

export default clerkMiddleware(async (auth, req) => {
	const { userId, sessionClaims, redirectToSignIn } = await auth();

	// if the user is not signed in and route is protected, redirect to sign-in
	if (!userId && isProtectedRoute(req)) {
		return redirectToSignIn({ returnBackUrl: req.url });
	}

	// catch and redirect users who do not have onboarding completed
	if (userId && !sessionClaims?.metadata?.onboardingComplete) {
		return new URL(`/onboarding`, req.url);
	}

	// if user is signed in and on a protected route, let them access it
	if (userId && isProtectedRoute(req)) {
		return auth.next();
	}

	// if (isProtectedRoute(req)) {
	// 	await auth.protect();
	// }
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		// Always run for API routes
		'/(api|trpc)(.*)',
	],
};
