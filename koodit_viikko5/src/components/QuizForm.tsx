import { useState } from "react";
import type { Player } from "../types/Player";
import RoundResult from "./RoundResult";

type Props = {
  players: Player[];
  currentUserId: string;
  correctPrice?: number | null;
  onSubmitGuess: (guess: number) => void;
};

export default function QuizForm({
  players,
  currentUserId,
  correctPrice,
  onSubmitGuess
}: Props) {
  const [guess, setGuess] = useState("");

  // Tulosnäkymä
  if (correctPrice !== null && correctPrice !== undefined) {
    return (
      <RoundResult
        players={players}
        correctPrice={correctPrice}
      />
    );
  }

  // Arvausnäkynmä
  return (
    <div>
      <h2>Arvaa tuotteen hinta</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitGuess(Number(guess));
          setGuess("");
        }}
      >
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Arvaa hinta (€)"
          required
        />

        <button type="submit">
          Arvaa ({currentUserId})
        </button>
      </form>
    </div>
  );
}