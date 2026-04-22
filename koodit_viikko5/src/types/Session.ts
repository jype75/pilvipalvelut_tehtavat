export type SessionStatus = "odotetaan" | "pelataan" | "loppu";

export type Session = {
  id: string;
  sessionName: string;

  // Pelin tilanne
  status: SessionStatus;
  currentRound: number;

  currentGame: string | null;
  correctPrice: number | null;

  scores: Record<string, number>;

  guesses?: Record<string, number>;

  createdAt: any;
  createdBy: string;

};