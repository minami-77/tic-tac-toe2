import './board.css';
import Square from '../square/Square'
import { useState } from "react";

const Board = () => {
  // Initialize variables

  // define function to shuffle points on squares
  function shufflePoints(){
    return [10,10,10,0,0,0,-10,-10,-10].sort(()=> Math.random() - 0.5);
  }
  // set an array for point of each squares, using useState so that it can be changed later
  const [pointOfSquares, setPointOfSquares] = useState(()=>shufflePoints());
  // set an array for player who get each squares,using useState so that it can be changed later [X, O, null,...]
  const [playerGetSquares, setPlayerGetSquares] = useState(Array(9).fill(null));
  // set variable for default next player (X) (use boolean, no need function)
  const [xIsNext, setXIsNext] = useState(true);
  // set variable to store initial score of the players
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  // set variable for status (game continue or end)
  const [status, setStatus] = useState("Next Player is X");

  // Define function to add bonus point (need argument)
  function bonusPoint(squares){
  // square[n] combinations for tic-tac-toe
    const combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for ( let i = 0; i < combinations.length; i++ ){
      // set [a,b,c] as places of squares and check if they match the combination
      // Destructuring（分割代入:配列の中身をまとめて変数に取り出す書き方）
      const [a, b, c] = combinations[i];
      // squares[a] is not empty and squares[a]=[b]=[c]='X or 'O'
      if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
        return squares[a];
      }
    }
    // otherwise return null
    return null;
  }

  // Define function to handle the game
  function handleClick(n){
    if (playerGetSquares.every((square)=>square!==null)){
      return;
    }
    // When continue the game (for empty squares)
    // copy previous array and set it as nextPlayerGetSquares (to create new one)
    const nextPlayerGetSquares = playerGetSquares.slice();
    // set variable for current player and give it a value X or O
    const currentPlayer = xIsNext ? "X" : "O";
    // update the nth nextPlayerGetSquare(copied one) with current player
    nextPlayerGetSquares[n] = currentPlayer;
    // update the newly created array(copied one)
    setPlayerGetSquares(nextPlayerGetSquares);

  // Calculate points of X and O
  // set variables for calculation
    const point = pointOfSquares[n];
    const bonusPlayer = bonusPoint(nextPlayerGetSquares);
    const bonus = 10;
    if(xIsNext){
      setScoreX(prev => prev + point + (bonusPlayer === 'X' ? bonus : 0));

    } else{
      setScoreO(prev => prev + point + (bonusPlayer === 'O' ? bonus : 0));
    }

    // When Game is Over
    // set variable to store condition of end end (all playerGetSquares are filled)
    const gameEnd = playerGetSquares.every(player =>player !== null);
    // set initial value of winner
    let winner = null;
    // winner
    if (gameEnd){
      if (scoreX > scoreO){
        winner = "X";
      } else if (scoreO > scoreX) {
        winner = "O";
      } else {
        winner = "Draw";
      }
    }

    // manage the status (game over or game continue)
    if (gameEnd){
      const statusEnd = winner==="Draw"? "Draw": `Winner is${winner}`;
      setStatus(statusEnd);
    }else{
      const statusContinue = `NextPlayer is ${xIsNext ? 'X' : 'O'}`;
      setStatus(statusContinue);
    }

    // Set next player in turn for the next move
    setXIsNext(!xIsNext);
  }

  //define function to reset the game
  function resetSquares(){
    // set variable to store shuffled points
    const shuffled = shufflePoints();
    setPointOfSquares(shuffled);
    setPlayerGetSquares(Array(9).fill(null));
    setScoreX(0);
    setScoreO(0);
    setXIsNext(true);
  }

  // UI Contents of Board.jsx
  return (
    <>
      <div className='score-board'>
        <div className='x-score'>
          <h2>X : {scoreX}</h2>
        </div>
        <div className='o-score'>
          <h2>O : {scoreO}</h2>
        </div>
      </div>
      <div>
        <h2>{status}</h2>
      </div>
      <div className="board-container">
        {/* onSquareClick (which calls function handleClick) is given to Square as props,
            value of squares[n] is given to Square as props value */}
        <div>
          <Square onSquareClick={() => handleClick(0)} point={pointOfSquares[0]} player={playerGetSquares[0]} />
          <Square onSquareClick={() => handleClick(1)} point={pointOfSquares[1]} player={playerGetSquares[1]} />
          <Square onSquareClick={() => handleClick(2)} point={pointOfSquares[2]} player={playerGetSquares[2]} />
        </div>
        <div>
          <Square onSquareClick={() => handleClick(3)} point={pointOfSquares[3]} player={playerGetSquares[3]} />
          <Square onSquareClick={() => handleClick(4)} point={pointOfSquares[4]} player={playerGetSquares[4]} />
          <Square onSquareClick={() => handleClick(5)} point={pointOfSquares[5]} player={playerGetSquares[5]} />
        </div>
        <div>
          <Square onSquareClick={() => handleClick(6)} point={pointOfSquares[6]} player={playerGetSquares[6]} />
          <Square onSquareClick={() => handleClick(7)} point={pointOfSquares[7]} player={playerGetSquares[7]} />
          <Square onSquareClick={() => handleClick(8)} point={pointOfSquares[8]} player={playerGetSquares[8]} />
        </div>
      </div>
      <div>
        {/* when clicked, call resetSquare function */}
        <button className='reset-button' onClick={resetSquares}>Reset</button>
      </div>
    </>
  )
}

export default Board;
