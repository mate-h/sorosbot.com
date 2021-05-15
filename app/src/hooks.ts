import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';
import type { Handle } from '@sveltejs/kit';
import { app } from '$lib/firebase';
import type { ServerResponse } from '@sveltejs/kit/types/hooks';
const auth = app.auth();

export const handle: Handle = async ({ request, render }) => {
	const cookies = cookie.parse(request.headers.cookie || '');
	request.locals.userid = cookies.userid || uuid();
  const authHeader = request.headers.authorization || '';
  if (authHeader.toLowerCase().includes('bearer')) {
    request.locals.idToken = authHeader.split(' ')[1];
  }

	// either authorization header or session cookie must be present and valid
	let authorized = false;
	const whitelist = ['/signin', '/signin/password-reset'];

	// primary auth through authorization header
	try {
		if (request.locals.idToken) {
			request.locals.user = await auth.verifyIdToken(request.locals.idToken);
			authorized = request.locals.user !== undefined;
		}
	}
	catch (e) {
		console.error(e);
	}

	// secondary auth through session cookie
	if (!request.locals.user) {
		try {
			const session = cookies.session;
			if (session) {
				request.locals.user = await auth.verifySessionCookie(session);
				authorized = request.locals.user !== undefined;
			}
		}
		catch (e) {
			console.error(e);
		}
	}

	if (!authorized && !whitelist.includes(request.path)) {
		const response: ServerResponse = {
			status: 302,
			headers: {
				location: '/signin'
			}
		};
		return response;
	}
	else if (whitelist.includes(request.path)) {
		const response: ServerResponse = {
			status: 302,
			headers: {
				location: '/console'
			}
		};
		return response;
	}

	// TODO https://github.com/sveltejs/kit/issues/1046
	if (request.query.has('_method')) {
		request.method = request.query.get('_method').toUpperCase();
	}

	const response = await render(request);

	if (!cookies.userid) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers['set-cookie'] = `userid=${request.locals.userid}; Path=/; HttpOnly`;
	}

	return response;
};
