import type { Player } from "../types/Player";

type Props = {
  players: Player[];
  correctPrice: number;
};

export default function RoundResult({ players, correctPrice }: Props) {
  return (
    <div>
      <h2>Kierroksen tulos</h2>

      <p>Oikea hinta: {correctPrice} €</p>

      <ul>
        {players.map(p => (
          <li key={p.id}>
            {p.codename}: {p.guess} €
          </li>
        ))}
      </ul>
    </div>
  );
}