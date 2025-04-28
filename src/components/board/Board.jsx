import './board.css';
import Square from '../square/Square'
import { useState } from "react";

const Board = () => {
  // set empty array called squares using useState so that it can be changed later
  // (initial state =[null,null,null,...null])
  const [squares, setSquares] = useState(Array(9).fill(null));
  // set default next player (X) (use boolean, no need function)
  const [xIsNext, setXIsNext] = useState(true);

  // check squares value if they match the combination of game end
  function whoIsWinner(){
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
      // Destructuring（分割代入:配列の中身をまとめて変数に取り出す書き方）
      const [a, b, c] = combinations[i];
      // value of square[a] is not empty
      // value of squares[a]=squares[b]=squares[c] (a,b,c-> places of square)
      if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
        return  squares[a];
      }
    }
    // otherwise no winner
    return null;
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

  return (
    <>
      <div>
        <h2>Player: {xIsNext ? 'X': 'O'}</h2>
      </div>
      <div className="board-container">
        <div>
          <Square onClick={() =>  { console.log('Square 0 clicked'); handleClick(0); }} value={squares[0]} />
          <Square onClick={() => handleClick(1)} value={squares[1]} />
          <Square onClick={() => handleClick(2)} value={squares[2]} />
        </div>
        <div>
          <Square onClick={() => handleClick(3)} value={squares[3]} />
          <Square onClick={() => handleClick(4)} value={squares[4]} />
          <Square onClick={() => handleClick(5)} value={squares[5]} />
        </div>
        <div>
          <Square onClick={() => handleClick(6)} value={squares[6]} />
          <Square onClick={() => handleClick(7)} value={squares[7]} />
          <Square onClick={() => handleClick(8)} value={squares[8]} />
        </div>
      </div>
      <div>
        <button className='reset-button'>Reset</button>
      </div>
    </>
  )
}

export default Board;
