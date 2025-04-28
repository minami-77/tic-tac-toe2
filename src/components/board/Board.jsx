import './board.css';
import Square from '../square/Square'

const Board = () => {


  return (
    <>
      <div>
        Player:
      </div>
      <div className="board-container">
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
        <div>
        <Square/>
        <Square/>
        <Square/>
        </div>
    </div>
    <div>
      <button>Reset</button>
    </div>
    </>

  )
}

export default Board
