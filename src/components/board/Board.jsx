import './board.css';
import Square from '../square/Square'
import { useState } from "react";

const Board = () => {
  // set empty array called squares using useState so that it can be changed later
  // (initial state =[null,null,null,...null])
  const [squares, setSquares] = useState(Array(9).fill(null));
  // set default next player (X) (use boolean, no need function)
  const [xIsNext, setXIsNext] = useState(true);

  function whoIsWinner(){
  // check if there's winner
  // square[n] combinations decide winner
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

    // check squares value if they match the combination of game end
    for ( let i = 0; i < combinations.length; i++ ){
      // Destructuring（分割代入:配列の中身をまとめて変数に取り出す書き方）
      const [a, b, c] = combinations[i];
      // value of square[a] is not empty
      // value of squares[a]=squares[b]=squares[c] (a,b,c-> places of square)
      if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
        return  squares[a];
      }
    }
    // check if draw |Array.every((x)x=>x===2);
    // if every square has value, return draw.
    if (squares.every((square) => square !== null)){
      return "Draw"
    }
    // otherwise no winner
    return null;
  }

  // set variable status to display winner or next player
  let status;
  // set variable winner to store the result of whoIsWinner
  const winner = whoIsWinner();

  // display draw, winner, or next player
  // if value of winner equals "Draw"
  if (winner === "Draw"){
    status = <h2><span>{winner}!</span></h2>
    //if winner seems truthy (X or O //not null, undefined...)
  } else if (winner){
    status = <h2><span>Winner is  {winner} !</span></h2>;
  } else {
    status = <h2>Next Player is <span>{xIsNext ? 'X': 'O'}</span></h2>
  }

  // define function to handle the game
  function handleClick(n){
    console.log("handleClick called!", n);
    // if squares[n] is already clicked || either one winned -> end the game
    if (squares[n] !== null || whoIsWinner()){
      return;
    }
    // else (for empty squares) flip the clicked square
    // copy previous array and set it as nextSquares (to create new one)
    const nextSquares = squares.slice();
    // update the value of n's square
    nextSquares[n] = xIsNext ? "X" : "O";
    // update the newly created array
    setSquares(nextSquares);
    // set next player in turn for the next move
    setXIsNext(!xIsNext);
  }

  //define function to reset the game
  function resetSquares(){
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <>
      <div>
        {status}
      </div>
      <div className="board-container">
        {/* onSquareClick (which calls function handleClick) is given to Square as props,
            value of squares[n] is given to Square as props value */}
        <div>
          <Square onSquareClick={() => handleClick(0)} value={squares[0]} />
          <Square onSquareClick={() => handleClick(1)} value={squares[1]} />
          <Square onSquareClick={() => handleClick(2)} value={squares[2]} />
        </div>
        <div>
          <Square onSquareClick={() => handleClick(3)} value={squares[3]} />
          <Square onSquareClick={() => handleClick(4)} value={squares[4]} />
          <Square onSquareClick={() => handleClick(5)} value={squares[5]} />
        </div>
        <div>
          <Square onSquareClick={() => handleClick(6)} value={squares[6]} />
          <Square onSquareClick={() => handleClick(7)} value={squares[7]} />
          <Square onSquareClick={() => handleClick(8)} value={squares[8]} />
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
