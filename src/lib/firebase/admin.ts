import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let app: App;

// Ambil env dulu
const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

// Validasi wajib (biar nggak silent error)
if (!projectId || !clientEmail || !privateKey) {
  throw new Error("Firebase Admin environment variables belum lengkap");
}

if (!getApps().length) {
  app = initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey: privateKey.replace(/\\n/g, "\n"),
    }),
  });
} else {
  app = getApps()[0];
}

export const adminDb = getFirestore(app);
