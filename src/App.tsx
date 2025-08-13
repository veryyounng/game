import React, { useState } from 'react';
import './style.css';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState('X');
  const winner = checkWinner(board);

  const handleClick = (i: number) => {
    if (board[i] || winner) return;

    const newBoard = [...board];
    newBoard[i] = turn;
    setBoard(newBoard);
    setTurn(turn === 'X' ? 'O' : 'X');
  };

  const restart = () => {
    setBoard(Array(9).fill(null));
    setTurn('X');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // 전체 화면 높이 기준
      }}
    >
      <h1>Tic Tac Toe</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 100px)',
          gridGap: '5px',
          margin: '20px auto',
        }}
      >
        {board.map((val, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            style={{
              width: '100px',
              height: '100px',
              fontSize: '36px',
            }}
          >
            {val}
          </button>
        ))}
      </div>
      <h2>{winner ? `Winner: ${winner}` : `Next Player: ${turn}`}</h2>
      <button onClick={restart}>Restart</button>
    </div>
  );
};

function checkWinner(board: (string | null)[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export default App;
