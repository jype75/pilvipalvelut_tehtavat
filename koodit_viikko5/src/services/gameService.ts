import type { Session } from "../types/Session";

// Kierroksen ratkaisu
export function resolveRound(session: Session): Session {
  const correct = session.correctPrice;
  if (correct === null) return session;

  let bestPlayerId: string | null = null;
  let bestDiff = Infinity;

  for (const [playerId] of Object.entries(session.scores)) {
    const guess = session.guesses?.[playerId];
    if (guess == null) continue;

    const diff = Math.abs(guess - correct);

    if (diff < bestDiff) {
      bestDiff = diff;
      bestPlayerId = playerId;
    }
  }

  if (!bestPlayerId) return session;

  return {
    ...session,
    scores: {
      ...session.scores,
      [bestPlayerId]: (session.scores[bestPlayerId] ?? 0) + 1
    },
    status: "loppu"
  };
}