import { app } from '$lib/firebase';
import { jsonResponse } from "$lib/response";
const auth = app.auth();

export const get: RequestHandler = async () => {
  const r = await auth.setCustomUserClaims("IKpogbQyk0SomPrWY3VAwdK5SGv1", { admin: true });
  const user = await auth.getUser('IKpogbQyk0SomPrWY3VAwdK5SGv1');
  return jsonResponse(200, user);
}