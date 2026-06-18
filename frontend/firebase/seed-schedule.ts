/**
 * Seeds Firestore collection `Schedule_Dates` with Mon–Fri template slots.
 * Run: npm run seed:schedule
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { initializeApp } from "firebase/app";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { buildWeeklyScheduleTemplates } from "./schedule-slots";

function loadEnvFile() {
  const envPath = resolve(process.cwd(), ".env");
  const raw = readFileSync(envPath, "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

function docId(dayOfWeek: string, timeFrom: string, timeTo: string) {
  return `${dayOfWeek}-${timeFrom.replace(":", "")}-${timeTo.replace(":", "")}`;
}

async function main() {
  loadEnvFile();

  const app = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  });

  const db = getFirestore(app);
  const col = collection(db, "Schedule_Dates");

  const existing = await getDocs(col);
  console.log(`Clearing ${existing.size} existing document(s) in Schedule_Dates…`);
  await Promise.all(existing.docs.map((snap) => deleteDoc(doc(db, "Schedule_Dates", snap.id))));

  const templates = buildWeeklyScheduleTemplates();
  console.log(`Writing ${templates.length} weekly template slot(s)…`);

  for (const row of templates) {
    const id = docId(row.dayOfWeek, row.timeFrom, row.timeTo);
    await setDoc(doc(db, "Schedule_Dates", id), row);
    console.log(`  ${row.dayOfWeek} ${row.timeFrom}–${row.timeTo}`);
  }

  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
