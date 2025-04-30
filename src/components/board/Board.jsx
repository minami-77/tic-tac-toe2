import './board.css';
import Square from '../square/Square'
import { useState } from "react";

const Board = () => {
  // set an array for point of each squares, using useState so that it can be changed later
  const [pointOfSquares, setPointOfSquares] = useState([10,10,10,0,0,0,-10,-10,-10]);
  // set an array for player who get each squares,using useState so that it can be changed later [X, O, null,...]
  const [playerGetSquares, setPlayerGetSquares] = useState(Array(9).fill(null));
  // set variable for default next player (X) (use boolean, no need function)
  const [xIsNext, setXIsNext] = useState(true);
  // set variable to astore initial score of the players
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);

  function bonusPoint(){
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

    // check playerGetSquares[n](a,b,c-> places of square) if they match the combination
    for ( let i = 0; i < combinations.length; i++ ){
      // Destructuring（分割代入:配列の中身をまとめて変数に取り出す書き方）
      const [a, b, c] = combinations[i];
      // playerGetSquares[a] is not empty and playerGetSquares[a]=[b]=[c]
      if(playerGetSquares[a] && playerGetSquares[a]===playerGetSquares[b] && playerGetSquares[a]===playerGetSquares[c]){
        return  playerGetSquares[a];
      }
    }
    // if every square has value, return 'no bonus point'.
    if (playerGetSquares.every((square) => square !== null)){
      return "No bonus point"
    }
    // otherwise no winner
    return null;
  }

  // set variable status to display winner or next player
  let status;
  // set variable winner to store the result of whoIsWinner
  const bonus = bonusPoint();

  // display draw, winner, or next player
  // if value of winner equals "No bonus point"
  if (bonus === "No bonus point"){
    return;
    //if winner seems truthy (X or O //not null, undefined...)
  } else if (bonus){
    status = <h2><span>{bonus} !</span></h2>;
  } else {
    status = <h2>Next Player is <span>{xIsNext ? 'X': 'O'}</span></h2>
  }

  // define function to handle the game
  function handleClick(n){
    console.log("handleClick called!", n);
    // if all playerGetSquares are already got -> end the game
    if (playerGetSquares[n] !== null){
      return;
    }
    // else (for empty squares) flip the clicked square
    // copy previous array and set it as nextPlayerGetSquares (to create new one)
    const nextPlayerGetSquares = playerGetSquares.slice();
    // set variable for current player and give it a value X or O
    const currentPlayer = xIsNext ? "X" : "O";
    // update the nextPlayerGetSquares with current player
    nextPlayerGetSquares[n] = currentPlayer;
    // update the newly created array
    setPlayerGetSquares(nextPlayerGetSquares);
    // calculate the score of X,O
    const point = pointOfSquares[n]
    if(xIsNext){
      setScoreX(scoreX + point);
    } else{
      setScoreO(scoreO + point);
    }
    // set next player in turn for the next move
    setXIsNext(!xIsNext);
  }

  //define function to reset the game
  function resetSquares(){
    setPointOfSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <>
      <div>
        Player1:{scoreX} - Player2: {scoreO}
      </div>
      <div>
        {status}
      </div>
      <div className="board-container">
        {/* onSquareClick (which calls function handleClick) is given to Square as props,
            value of squares[n] is given to Square as props value */}
        <div>
          <Square onSquareClick={() => handleClick(0)} point={pointOfSquares[0]} player={playerGetSquares[0]} />
          <Square onSquareClick={() => handleClick(1)} point={pointOfSquares[0]} player={playerGetSquares[0]} />
          <Square onSquareClick={() => handleClick(2)} point={pointOfSquares[0]} player={playerGetSquares[0]} />
        </div>
        <div>
          <Square onSquareClick={() => handleClick(3)} point={pointOfSquares[0]} player={playerGetSquares[0]} />
          <Square onSquareClick={() => handleClick(4)} point={pointOfSquares[0]} player={playerGetSquares[0]} />
          <Square onSquareClick={() => handleClick(5)} point={pointOfSquares[0]} player={playerGetSquares[0]} />
        </div>
        <div>
          <Square onSquareClick={() => handleClick(6)} point={pointOfSquares[0]} player={playerGetSquares[0]} />
          <Square onSquareClick={() => handleClick(7)} point={pointOfSquares[0]} player={playerGetSquares[0]} />
          <Square onSquareClick={() => handleClick(8)} point={pointOfSquares[0]} player={playerGetSquares[0]} />
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
