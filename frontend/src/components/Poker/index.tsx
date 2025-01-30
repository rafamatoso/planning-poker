import { useEffect, useState } from "react";
import socket from "../../socket";
import { IVote } from "./interfaces";

const VOTE_NUMBERS = ["1", "2", "3", "5", "8", "13", "21", "34"];

const Poker = () => {
  const [votes, setVotes] = useState<IVote>({});
  const [selectedVote, setSelectedVote] = useState<string | null>(null); // Estado para o número selecionado

  useEffect(() => {
    socket.on("updateVotes", (data) => {
      setVotes(data);
    });

    return () => {
      socket.off("updateVotes");
    };
  }, []);

  const sendVote = (value: string) => {
    socket.emit("vote", value);
    setSelectedVote(value);
  };

  return (
    <div className="w-dvw flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Planning Poker</h2>

      <div className="flex gap-4">
        {VOTE_NUMBERS.map((num) => (
          <button
            key={num}
            onClick={() => sendVote(num)}
            className={`min-w-[60px] px-4 py-2 rounded-lg shadow-md transition-all duration-200 ${
              selectedVote === num
                ? "bg-white border-2 border-black text-black font-bold hover:bg-gray-200"
                : "bg-blue-500 text-white hover:bg-blue-700"
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mt-8">Votos:</h3>

      <ul className="bg-white shadow-md rounded-lg px-4 py-2 mt-4 w-80 min-h-10">
        {Object.entries(votes).map(([id, { username, vote }]) => (
          <li key={id} className="text-gray-800">
            <strong>{username}</strong>: <strong>{vote}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Poker;
