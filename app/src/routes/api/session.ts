import { apiHost, cookieDomain } from '$lib/config';
import type { RequestHandler } from '@sveltejs/kit';
import fetch from 'node-fetch';
import https from 'https';
https.globalAgent.options.rejectUnauthorized = false;

export const post: RequestHandler = async ({ headers }) => {
	const result = await fetch(`${apiHost}/session`, {
		method: 'post',
		headers
	}).then(async (res) => {
		const body = await res.json();
		const session = body.session;
		return {
			headers: {
        'Access-Control-Allow-Credentials': 'true',
				'set-cookie': `session=${session}; path=/; domain=${cookieDomain}; HttpOnly`
			},
			body
		};
	});
	return result;
};
