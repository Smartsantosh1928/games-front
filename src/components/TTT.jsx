import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

const socket = io('http://localhost:3000');

export function TTT() {
    
  const { matchId } = useParams();
  const [requested, setRequested] = useState(false);
  const [gameId, setGameId] = useState('');
  const [players, setPlayers] = useState([]);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    socket.emit('joinGame', matchId);
  },[])

  useEffect(() => {

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('gameStart', ({ gameId, players }) => {
      console.log('Game started : ', gameId, players);
      setGameId(gameId);
      setPlayers(players);
    });

    socket.on('moveMade', ({ board, index, player }) => {
      setBoard(board);
      setCurrentPlayer(player === 0 ? 1 : 0);
    });

    socket.on("gameFull",() => {
        alert('Game is full')
        Window.location.href = 'http://localhost:5173'
    })

    socket.on('gameOver', ({ winner, draw }) => {
      if (draw) {
        setWinner('Draw!');
      } else {
        setWinner(`Player ${winner + 1} wins!`);
      }
    });
        
    socket.on("restartRequested",() => {
        console.log('Restart request received');
        console.log('Requested : ', requested);
        if (window.confirm('Opponent wants to restart the game. Do you agree?')) {
            socket.emit('restartGame', matchId);
        }
    })

    socket.on("gameRestarted",(board) => {
        console.log('Game restarted : ', board);
        setBoard(Array(9).fill(null));
        setCurrentPlayer(0);
        setWinner(null);
    })

    return () => {
      // Clean up listeners when component unmounts
      socket.off('gameStart');
      socket.off('moveMade');
      socket.off('gameOver');
    };
  }, []);

    const handleJoinGame = () => {
        const gameId = prompt('Enter Game ID:');
        socket.emit('joinGame', gameId);
    };

  const handleMakeMove = (index) => {
    if (!winner && board[index] === null && currentPlayer === players.indexOf(socket.id)) {
      socket.emit('makeMove', { gameId, index });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        {!matchId ? (    
        <div className="flex flex-col items-center">
          <p className="text-3xl font-semibold mb-4">Tic Tac Toe</p>
          <button
            onClick={handleJoinGame}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg"
          >
            Join Game
          </button>
        </div>
        ) : (

        <div className="flex flex-col items-center">
          <div className="grid grid-cols-3 gap-2 mb-4">
            {board.length==9 && board.map((cell, index) => (
              <div
                key={index}
                onClick={() => handleMakeMove(index)}
                className="bg-gray-200 w-16 h-16 flex items-center justify-center text-4xl cursor-pointer"
              >
                {cell !== null ? (cell === 0 ? 'X' : 'O') : '-'}
              </div>
            ))}
          </div>
          <p className="text-xl font-semibold">
            {winner ? (
                <div className='flex justify-center items-center gap-10'>
                <p>winner</p>
                <button
                    onClick={() => {
                        setRequested(!requested)
                        socket.emit('restartRequest', gameId)
                    }}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg">
                    Play Again
                </button>
                <button
                    onClick={() => {
                        socket.emit('leaveGame', gameId)
                        window.location.href = 'http://localhost:5173'
                    }}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg">
                    Leave Game
                </button>
                </div>
            ) : `Player ${currentPlayer + 1}'s turn`}
          </p>
        </div>
      )}
    </div>
  );
  
}

export default TTT;
