import './App.css';
import Board from './components/board/Board'

const App = () => {
  return (
    <div>
      <div className="container">
        <h1>Tic-Tac-Toe</h1>
        <div className="game-container">
          <Board/>
        </div>
      </div>
    </div>
  )
}

export default App
