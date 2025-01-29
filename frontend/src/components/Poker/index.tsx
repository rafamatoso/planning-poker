import { useEffect, useState } from "react";
import socket from "../../socket";

const Poker = () => {
  const [votes, setVotes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    socket.on("updateVotes", (data) => {
      setVotes(data);
    });

    return () => {
      socket.off("updateVotes");
    };
  }, []);

  const sendVote = (value: string) => {
    const newVotes = { ...votes, [`${socket.id}`]: value };
    socket.emit("vote", newVotes);
  };

  return (
    <div>
      <h2>Planning Poker</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        {["1", "2", "3", "5", "8", "13"].map((num) => (
          <button key={num} onClick={() => sendVote(num)}>
            {num}
          </button>
        ))}
      </div>

      <h3
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        Votos:
      </h3>
      {/* <ul> */}
      {Object.entries(votes).map(([id, vote]) => (
        <li key={id}>
          {id}: {vote}
        </li>
      ))}
      {/* </ul> */}
    </div>
  );
};

export default Poker;
