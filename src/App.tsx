import React, { useState, useEffect } from 'react';
import './style.css';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState('X');
  const winner = checkWinner(board);
  const isAIMode = true; // 나중에 모드 선택 기능으로 확장 가능
  const [gameMode, setGameMode] = useState<'AI' | '2P' | null>(null);

  useEffect(() => {
    const winner = checkWinner(board);

    if (winner) {
      setScore((prev) => ({
        ...prev,
        [winner]: prev[winner as 'X' | 'O'] + 1,
      }));
    } else if (board.every((cell) => cell !== null)) {
      setScore((prev) => ({
        ...prev,
        draw: prev.draw + 1,
      }));
    }
  }, [board]);

  const handleClick = (i: number) => {
    if (board[i] || winner) return;

    const newBoard = [...board];
    newBoard[i] = turn;
    setBoard(newBoard);

    const nextTurn = turn === 'X' ? 'O' : 'X';
    setTurn(nextTurn);

    // AI 모드일 때만 AI 작동
    if (gameMode === 'AI' && nextTurn === 'O') {
      setTimeout(() => {
        makeAIMove(newBoard);
      }, 500);
    }
  };

  const makeAIMove = (currentBoard: (string | null)[]) => {
    if (checkWinner(currentBoard)) return;

    const emptyIndices = currentBoard
      .map((val, idx) => (val === null ? idx : null))
      .filter((val): val is number => val !== null);

    if (emptyIndices.length === 0) return;

    const randomIndex =
      emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

    const updatedBoard = [...currentBoard];
    updatedBoard[randomIndex] = 'O';
    setBoard(updatedBoard);
    setTurn('X');
  };

  const restart = () => {
    setBoard(Array(9).fill(null));
    setTurn('X');
    setGameMode(null);
  };

  const [score, setScore] = useState({
    X: 0,
    O: 0,
    draw: 0,
  });

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn('X');
    setScore({ X: 0, O: 0, draw: 0 });
    setGameMode(null);
  };

  if (gameMode === null) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          gap: '20px',
        }}
      >
        <h1>Tic Tac Toe</h1>

        <button
          onClick={() => setGameMode('AI')}
          style={{
            backgroundColor: '#ffc5d9',
            border: 'none',
            borderRadius: '20px',
            padding: '12px 24px',
            fontSize: '20px',
            cursor: 'pointer',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#ffb1cd';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#ffc5d9';
          }}
        >
          🤖 1인 플레이
        </button>

        <button
          onClick={() => setGameMode('2P')}
          style={{
            backgroundColor: '#ffc5d9',
            border: 'none',
            borderRadius: '20px',
            padding: '12px 24px',
            fontSize: '20px',
            cursor: 'pointer',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#ffb1cd';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#ffc5d9';
          }}
        >
          👥 2인 플레이
        </button>
      </div>
    );
  }

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
              backgroundColor: '#ffc5d9', // 파스텔톤 분홍색
              border: 'none', // 테두리 없음
              borderRadius: '20px', // 동글동글한 모서리
              cursor: 'pointer',
              boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)', // 살짝 그림자
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = '#ffb1cd';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = '#ffc5d9';
            }}
          >
            {val}
          </button>
        ))}
      </div>
      <h2>
        {winner
          ? gameMode === 'AI'
            ? winner === 'X'
              ? '이기셨습니다!'
              : '졌습니다...'
            : `Winner: ${winner}`
          : board.every((cell) => cell !== null)
          ? gameMode === 'AI'
            ? '무승부입니다.'
            : 'Draw!'
          : `Next Player: ${turn}`}
      </h2>

      <button
        onClick={restart}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          fontSize: '18px',
          backgroundColor: '#ffc5d9',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.1)',
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLButtonElement).style.backgroundColor = '#ffb1cd';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.backgroundColor = '#ffc5d9';
        }}
      >
        Restart
      </button>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          marginTop: '10px',
          fontSize: '18px',
        }}
      >
        <div>❌ X: {score.X}</div>
        <div>⭕ O: {score.O}</div>
        <div>🤝 무승부: {score.draw}</div>
      </div>
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
