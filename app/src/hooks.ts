import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';
import type { Handle } from '@sveltejs/kit';
import type { ServerResponse } from '@sveltejs/kit/types/hooks';
import { prerendering } from '$app/env';
import { apiHost } from '$lib/config';

export const handle: Handle = async ({ request, render }) => {
	const cookies = cookie.parse(request.headers.cookie || '');
	request.locals.userid = cookies.userid || uuid();
  const authHeader = request.headers.authorization || '';
  if (authHeader.toLowerCase().includes('bearer')) {
    request.locals.idToken = authHeader.split(' ')[1];
  }

	// either authorization header or session cookie must be present and valid
	let authorized = false;
	if (prerendering) authorized = true;
	const whitelist = ['/signin', '/signin/password-reset', '/api/session'];

	try {
		const result = await fetch(`${apiHost}/auth`, {headers: request.headers}).then(r => r.json());
		authorized = result.user !== undefined;
	} catch(e) {
		console.error(e);
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
	// if (authorized && whitelist.includes(request.path)) {
	// 	const response: ServerResponse = {
	// 		status: 302,
	// 		headers: {
	// 			location: '/console'
	// 		}
	// 	};
	// 	return response;
	// }

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
