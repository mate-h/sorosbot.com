import { jsonResponse } from "$lib/response";
import type { RequestHandler } from "@sveltejs/kit";
import fetch from 'node-fetch';
// This import loads the firebase namespace along with all its type information.
import { app } from '$lib/firebase';
const auth = app.auth();
const apiKey = process.env['FIREBASE_API_KEY'];

export const post: RequestHandler = async ({ body }) => {
  // auth
  const data = JSON.parse(body as string);
  let user, customToken, session, idToken;
  try {
    user = await auth.getUserByEmail(data.email);
    customToken = await auth.createCustomToken(user.uid, user.customClaims);

    const res = await fetch(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${apiKey}`, {
      method: 'POST',
      body: JSON.stringify({
        token: customToken,
        returnSecureToken: true
      })
    }).then(r => r.json());
    idToken = res.idToken;
    
    session = await auth.createSessionCookie(idToken, { expiresIn: 2*604800000 });
  } catch (e) {
    console.log(e);
    return jsonResponse(401, "");
  }
  return jsonResponse(200, {user, customToken, idToken, session});
}