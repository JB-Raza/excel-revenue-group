import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { isFirebaseConfigured, siteConfig } from "@/lib/site";

let dbInstance: Firestore | null = null;

function getFirebaseApp(): FirebaseApp {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured.");
  }
  if (getApps().length > 0) {
    return getApp();
  }
  return initializeApp(siteConfig.firebase);
}

/** Lazy Firestore client — only initialized when Firebase env vars exist. */
export function getDb(): Firestore {
  if (!dbInstance) {
    dbInstance = getFirestore(getFirebaseApp());
  }
  return dbInstance;
}

export { isFirebaseConfigured };
