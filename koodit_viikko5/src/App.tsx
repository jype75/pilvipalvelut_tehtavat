import { useState, useEffect } from "react";
import "./App.css";

import {
  createSessionIfNotExists,
  updateSession,
  subscribeToSession,
  addPlayerToSession
} from "./services/sessionService";

import { fetchRandomProduct } from "./services/productService";
import { resolveRound } from "./services/gameService";

import type { Session } from "./types/Session";

function App() {
  const [session, setSession] = useState<Session | null>(null);

    // koodinimi
  function generateCodename(): string {
    const adj = ["Hilpeä", "Pahis", "Kova", "Ahkera", "Paras", "Kone"];
    const tek = ["Timpuri", "Taikuri", "Leipuri", "Teräsmies", "Hippi", "Basisti"];

    const a = adj[Math.floor(Math.random() * adj.length)];
    const b = tek[Math.floor(Math.random() * tek.length)];
    const n = Math.floor(Math.random() * 1000);

    return `${a}${b}${n}`;
  }

  // pysyvä player id debud
  const [userId] = useState(() => {
    const existing = localStorage.getItem("playerId");
    if (existing) return existing;

    const newId = "player_" + Math.random().toString(36).slice(2, 9);
    localStorage.setItem("playerId", newId);
    return newId;
  }); 

  const [codename] = useState(() => generateCodename());

  // Liitytään peliin
  useEffect(() => {
    let unsub: (() => void) | null = null;

    async function init() {
      await createSessionIfNotExists("system");
      await addPlayerToSession(userId);

      unsub = subscribeToSession((s) => {
        setSession(s);
      });
    }

    init();

    return () => unsub?.();
  }, [userId]);

  // Aloitetaan peli
  async function startGame() {
    if (!session) return;

    const product = await fetchRandomProduct();

    await updateSession({
      ...session,
      status: "pelataan",
      currentGame: product.id,
      correctPrice: product.price,
      guesses: {}
    });
  }

  // Arvaus
  async function submitGuess() {
    if (!session) return;

    const input = document.getElementById(
      "guessInput"
    ) as HTMLInputElement;

    if (!input) return;

    const guess = Number(input.value);
    input.value = "";

    const updatedGuesses = {
      ...(session.guesses || {}),
      [userId]: guess
    };

    await updateSession({
      ...session,
      guesses: updatedGuesses
    });

    const totalPlayers = Object.keys(session.scores).length;
      const answeredCount =
      Object.keys(updatedGuesses).length;

    const allAnswered = answeredCount >= totalPlayers;

    if (allAnswered) {
      const resolved = resolveRound({
        ...session,
        guesses: updatedGuesses
      });

      await updateSession({
        ...resolved,
        guesses: updatedGuesses,
        status: "loppu"
      });
    }
  }

  if (!session) return <p>Ladataan peli...</p>;

  return (
    <div className="Container">
      <h1>Hintavisa</h1>

      <p>Pelaaja: {codename}</p>
      

      

      {/* ODOTTAA */}
      {session.status === "odotetaan" && (
        <>
          <p>Pelaajia: {Object.keys(session.scores).length}</p>

          <button
            onClick={startGame}
            disabled={Object.keys(session.scores).length < 2}
          >
            Aloita peli
          </button>
        </>
      )}

      {/* PELATAAN */}
      {session.status === "pelataan" && (
        <div style={{ marginTop: "20px" }}>
          <h2>Arvaa tuotteen hinta</h2>

          <input
            id="guessInput"
            type="number"
            placeholder="Syötä hinta"
            style={{
              padding: "8px",
              marginRight: "10px"
            }}
          />

          <button onClick={submitGuess}>Arvaa</button>
        </div>
      )}

      {/* LOPPU */}
      {session.status === "loppu" && (
        <div>
          <h2>Kierros päättyi</h2>

          <p>Oikea hinta: {session.correctPrice}</p>

          <button onClick={startGame}>Seuraava kierros</button>
        </div>
      )}
    </div>
  );
}

export default App;