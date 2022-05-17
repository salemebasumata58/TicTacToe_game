import React, { useState } from "react";
import { Winner } from "../Winner";
import Board from "./Board";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = Winner(history[stepNumber]);
  const xO = xIsNext ? "X" : "O";

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    if (winner || squares[i]) return;
    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : "Restart Game";
      return (
        
          <button key={move} onClick={() => jumpTo(move)}>{destination}</button>
        
      );
    });

  return (
    <div className="container">
      <h1 style={{color:"red"}}>Tic Tac Toe Game $</h1>
      <h3>{winner ? "Winner:  Player " + winner : "Next Player: " + xO}</h3>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div className="info-wrapper">
        <div>
          <h3 style={{color:"red"}}>History</h3><br />
          <br />{renderMoves()}
        </div>
        
      </div>
    </div>
  );
};

export default Game;