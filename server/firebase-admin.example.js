/**
 * Firebase Admin SDK — server-side only (Node.js).
 * Use in a backend (Express, Cloud Functions, etc.). Never in the browser.
 *
 * 1. Install: npm install firebase-admin
 * 2. Service account key: either
 *    - Copy your key to server/keys/serviceAccountKey.json (recommended), or
 *    - Set env var to the key path, e.g.:
 *      FIREBASE_SERVICE_ACCOUNT_PATH="C:\Users\Tejasvi Jois\Downloads\sstemple-be2a6-firebase-adminsdk-fbsvc-f606f42e20.json"
 * 3. Require this file from your server entry (e.g. server/index.js)
 */
const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

const keyPath =
  process.env.FIREBASE_SERVICE_ACCOUNT_PATH ||
  process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  path.join(__dirname, "keys", "serviceAccountKey.json");

const serviceAccount = JSON.parse(fs.readFileSync(keyPath, "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sstemple-be2a6-default-rtdb.firebaseio.com",
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };
