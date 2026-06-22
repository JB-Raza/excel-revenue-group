/**
 * Generates / maintains the rolling window of bookable slots in `Available_Slots`.
 * Runs with the Firebase Admin SDK (bypasses security rules).
 *
 *   npm run slots:generate   → top up the next ROLLING_DAYS days, prune past dates
 *   npm run slots:reset       → wipe Available_Slots + Bookings (+ legacy) then generate
 *
 * Credentials (first match wins):
 *   - FIREBASE_SERVICE_ACCOUNT  : JSON string (used by the GitHub Action)
 *   - GOOGLE_APPLICATION_CREDENTIALS : path to a service account file
 *   - ./serviceAccount.json     : local file (gitignored)
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  cert,
  initializeApp,
  type Credential,
  type ServiceAccount,
} from "firebase-admin/app";
import {
  FieldValue,
  getFirestore,
  type Firestore,
} from "firebase-admin/firestore";
import {
  TIMEZONE,
  buildSlotsForDate,
  enumerateDates,
  etTodayIso,
  slotDocId,
} from "./slot-config";

const ROLLING_DAYS = 60;
const AVAILABLE = "Available_Slots";
const BOOKINGS = "Bookings";
const LEGACY = "Schedule_Dates";
const BATCH_LIMIT = 400;

function loadCredential(): Credential {
  const inline = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (inline) {
    return cert(JSON.parse(inline) as ServiceAccount);
  }
  const path =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ??
    resolve(process.cwd(), "serviceAccount.json");
  if (existsSync(path)) {
    return cert(JSON.parse(readFileSync(path, "utf8")) as ServiceAccount);
  }
  throw new Error(
    "No Firebase service account found. Set FIREBASE_SERVICE_ACCOUNT, " +
      "GOOGLE_APPLICATION_CREDENTIALS, or add ./serviceAccount.json.",
  );
}

async function deleteCollection(db: Firestore, name: string): Promise<number> {
  const snap = await db.collection(name).get();
  if (snap.empty) return 0;
  let batch = db.batch();
  let ops = 0;
  let total = 0;
  for (const docSnap of snap.docs) {
    batch.delete(docSnap.ref);
    ops += 1;
    total += 1;
    if (ops >= BATCH_LIMIT) {
      await batch.commit();
      batch = db.batch();
      ops = 0;
    }
  }
  if (ops > 0) await batch.commit();
  return total;
}

async function main() {
  const reset = process.argv.includes("--reset");
  initializeApp({ credential: loadCredential() });
  const db = getFirestore();

  if (reset) {
    const a = await deleteCollection(db, AVAILABLE);
    const b = await deleteCollection(db, BOOKINGS);
    const l = await deleteCollection(db, LEGACY);
    console.log(`Reset: removed ${a} slot(s), ${b} booking(s), ${l} legacy doc(s).`);
  }

  const today = etTodayIso();
  const dates = enumerateDates(today, ROLLING_DAYS);

  // One read of the future window so we only create missing slots
  // (never overwrite a slot that's already booked/flagged).
  const existing = await db.collection(AVAILABLE).where("date", ">=", today).get();
  const existingIds = new Set(existing.docs.map((d) => d.id));

  let batch = db.batch();
  let ops = 0;
  let created = 0;
  for (const date of dates) {
    for (const slot of buildSlotsForDate(date)) {
      const id = slotDocId(date, slot.timeFrom, slot.timeTo);
      if (existingIds.has(id)) continue;
      batch.set(db.collection(AVAILABLE).doc(id), {
        date,
        dayOfWeek: slot.dayOfWeek,
        timeFrom: slot.timeFrom,
        timeTo: slot.timeTo,
        isAvailable: true,
        timezone: TIMEZONE,
        createdAt: FieldValue.serverTimestamp(),
      });
      ops += 1;
      created += 1;
      if (ops >= BATCH_LIMIT) {
        await batch.commit();
        batch = db.batch();
        ops = 0;
      }
    }
  }
  if (ops > 0) await batch.commit();

  // Prune past-date slots so the collection stays bounded.
  const past = await db.collection(AVAILABLE).where("date", "<", today).get();
  const pruned = await (async () => {
    if (past.empty) return 0;
    let b = db.batch();
    let n = 0;
    let total = 0;
    for (const d of past.docs) {
      b.delete(d.ref);
      n += 1;
      total += 1;
      if (n >= BATCH_LIMIT) {
        await b.commit();
        b = db.batch();
        n = 0;
      }
    }
    if (n > 0) await b.commit();
    return total;
  })();

  console.log(
    `Done. Created ${created} new slot(s) across ${dates.length} day(s) from ${today} (ET). Pruned ${pruned} past slot(s).`,
  );
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
