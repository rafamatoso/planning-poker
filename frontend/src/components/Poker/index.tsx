import { useEffect, useState } from "react";
import socket from "../../socket";
import { IVote } from "./interfaces";

const VOTE_NUMBERS = ["1", "2", "3", "5", "8", "13", "21", "34"];

const Poker = () => {
  const [votes, setVotes] = useState<IVote>({});

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
  };

  return (
    <div className="w-dvw flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Planning Poker</h2>

      <div className="flex gap-4">
        {VOTE_NUMBERS.map((num) => (
          <button
            key={num}
            onClick={() => sendVote(num)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            {num}
          </button>
        ))}
      </div>

      <h3 className="text-xl font-semibold text-gray-700 mt-8">Votos:</h3>
      <ul className="bg-white shadow-md rounded-lg p-4 mt-4 w-80">
        {Object.entries(votes).map(([id, { username, vote }]) => (
          <li key={id} className="text-gray-800">
            <strong>{username}</strong>: {vote}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Poker;
