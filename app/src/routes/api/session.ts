import type { RequestHandler } from "@sveltejs/kit";
import fetch from 'node-fetch';

const apiHost = 'http://localhost:5000';
const cookieDomain = 'localhost';

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