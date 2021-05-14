import type { Response } from '@sveltejs/kit';

export function jsonResponse(status: number, body: string | Record<string, unknown>): Response {
	if (typeof body !== 'string') body = JSON.stringify(body);
	return {
		status,
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		},
		body
	};
}

export function htmlResponse(status: number, body: string): Response {
	return {
		status,
		headers: {
			'Content-Type': 'text/html; charset=utf-8'
		},
		body
	};
}

export function textResponse(status: number, body: unknown): Response {
	if (typeof body !== 'string') body = body.toString();
	return {
		status,
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		},
		body
	}
}