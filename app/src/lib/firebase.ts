import { browser } from '$app/env';
import * as admin from 'firebase-admin';

export let app: admin.app.App;
export let firestore: FirebaseFirestore.Firestore;
try {
  app = admin.initializeApp();
  firestore = app.firestore();
}
catch(e) {
  //
}