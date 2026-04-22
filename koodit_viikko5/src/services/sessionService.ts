import { db } from "../firebase";
import {
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  getDoc,
  serverTimestamp
} from "firebase/firestore";
import type { Session } from "../types/Session";

const SESSION_ID = "gameSession112233";

// Luo session
export async function createSessionIfNotExists(userName: string) {
  const ref = doc(db, "gameSessions", SESSION_ID);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    const session: Session = {
      id: SESSION_ID,
      sessionName: "Hintavisa",
      status: "odotetaan",
      currentRound: 1,
      currentGame: null,
      correctPrice: null,
      guesses: {},
      scores: {},
      createdAt: serverTimestamp(),
      createdBy: userName
    };

    await setDoc(ref, session);
    return session;
  }

  return snap.data() as Session;
}

// Lisätään pelaaja
export async function addPlayerToSession(userId: string) {
  const ref = doc(db, "gameSessions", SESSION_ID);
  const snap = await getDoc(ref);

  if (!snap.exists()) return;

  const data = snap.data() as Session;

  if (data.scores?.[userId] !== undefined) return;

  await updateDoc(ref, {
    [`scores.${userId}`]: 0
  });
}

// Päivitetään
export async function updateSession(partial: Partial<Session>) {
  const ref = doc(db, "gameSessions", SESSION_ID);
  await updateDoc(ref, partial);
}

// Reaalisynkkaus
export function subscribeToSession(callback: (s: Session) => void) {
  return onSnapshot(doc(db, "gameSessions", SESSION_ID), (snap) => {
    if (!snap.exists()) return;

    callback(snap.data() as Session);
  });
}