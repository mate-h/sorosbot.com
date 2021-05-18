import { apiHost, cookieDomain } from "$lib/config";
import type { RequestHandler } from "@sveltejs/kit";
import fetch from 'node-fetch';

export const post: RequestHandler = async ({ headers }) => {
  const result = await fetch(`${apiHost}/session`, {
    method: 'post',
    headers
  }).then(async res => {
    const body = await res.json();
    const session = body.session;
    return {
      headers: {
        'set-cookie': `session=${session}; Domain=${cookieDomain}; Path=/; HttpOnly`
      },
      body
    }
  });
  return result;
}