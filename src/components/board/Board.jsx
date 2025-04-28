import './board.css';
import Square from '../square/Square'
import { useState } from "react";

const Board = () => {
  // set empty array called squares using useState so that it can be changed later
  const [squares, setSquares] = useState([Array(9).fill(null)]);

  // define function to handle the game
  function handleClick(){
    // if either one winned|| if already clicked, end the game

    // else flip the clicked square

  }


  return (
    <>
      <div>
        Player:
      </div>
      <div className="board-container">
        <div>
        <Square
          onClick={() => handleClick}
          value={squares[0]}
        />
        <Square/>
        <Square/>
        </div>
        <div>
        <Square/>
        <Square/>
        <Square/>
        </div>
        <div>
        <Square/>
        <Square/>
        <Square/>
        </div>
    </div>
    <div>
      <button className='reset-button'>Reset</button>
    </div>
    </>

  )
}

export default Board
