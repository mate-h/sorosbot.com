import { jsonResponse } from "$lib/response";
import type { RequestHandler } from "@sveltejs/kit";
import { app } from '$lib/firebase';
const auth = app.auth();

const maxCookieExpiry = 2*604800000;
export const post: RequestHandler = async ({ headers }) => {
  let idToken: string;
  const authHeader = headers.authorization;
  if (authHeader.toLowerCase().includes('bearer')) {
    idToken = authHeader.split(' ')[1];
  }
  let user, customToken, session;
  try {
    user = await auth.verifyIdToken(idToken);
    session = await auth.createSessionCookie(idToken, { expiresIn: maxCookieExpiry });
  } catch (e) {
    console.log(e);
    return jsonResponse(401, "Unauthorized");
  }
  const r = jsonResponse(200, {user, customToken, idToken, session});
  return {
    ...r,
    headers: {
      ...r.headers,
      'set-cookie': `session=${session}; Path=/; HttpOnly`
    }
  }
}