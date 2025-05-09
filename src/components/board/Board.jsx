import './board.css';
import Square from '../square/Square'
import { useState, useEffect, useRef } from "react";
import BarChart from '../barChart/BarChart';

const Board = () => {
  // Initialize variables

  // define function to shuffle points on squares
  function shufflePoints(){
    return [30,20,10,10,10,-10,-20,-20,-30].sort(()=> Math.random() - 0.5);
  }
  // set an array for point of each squares, using useState so that it can be changed later
  const [pointOfSquares, setPointOfSquares] = useState(()=>shufflePoints());
  // set an array for player who get each squares,using useState so that it can be changed later [X, O, null,...]
  const [playerOfSquares, setPlayerOfSquares] = useState(Array(9).fill(null));
  // set variable for default next player (X) (use boolean, no need function)
  const [xIsNext, setXIsNext] = useState(true);
  // set variable to store initial score of the players
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  // set variable for status (game continue or end)
  const [status, setStatus] = useState("Next Player is X");
  // set variable for bonus status
  const [bonusGiven, setBonusGiven] = useState(null);
  // set variable for message to hide or show (bonus,result)
  const [message, setMessage] = useState('');
  // set variable for result message
  const [result, setResult] = useState('');
  //set variable for bonus has given before or not
  const bonusHasGivenTo = useRef({ X: false, O: false });


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
        console.log("bonus added!");
        return squares[a];
      }
    }
    // otherwise return null
    return null;
  }

  // Define function to handle the game
  function handleClick(n){
    // End : if nth square is filled, cannot update the square
    if (playerOfSquares[n] !==null){
      return;
    }

    // Continue :for empty squares
    // copy previous array and set it as nextPlayerGetSquares (to create new one)
    const nextPlayerOfSquares = playerOfSquares.slice();
    // set variable for current player and give it a value X or O
    const currentPlayer = xIsNext ? "X" : "O";
    // update the nth nextPlayerGetSquare(copied one) with current player
    nextPlayerOfSquares[n] = currentPlayer;
    // update the newly created array(copied one)
    setPlayerOfSquares(nextPlayerOfSquares);
    //if matched bonus combination, set variable for bonus player
    const bonusPlayer = bonusPoint(nextPlayerOfSquares);

  // Calculate points of X and O
    // set variable to store points
    const point = pointOfSquares[n];
    const bonus = 30;
    let totalPoint = point;
    // set LOCAL variable to check the player get bonus now (setState cannot be reflected immediately)
    const isBonusNow = bonusPlayer !== null && bonusPlayer === currentPlayer && !bonusHasGivenTo[currentPlayer]

    // if bonus, set useState for display message
    if (isBonusNow){
      totalPoint += bonus;
      setMessage('show');
      setBonusGiven(`${bonusPlayer} got ${bonus} bonus point!!`);
      // useRef
      bonusHasGivenTo.current[currentPlayer] = true;
    } else {
      setBonusGiven(null);
      setMessage('');
    }

    // calculation with /without bonus
    if (currentPlayer === 'X') {
      setScoreX(prev => prev + totalPoint);
    } else {
      setScoreO(prev => prev + totalPoint);
    }

    // Set next player in turn for the next move
    setXIsNext(!xIsNext);

  }

  // Display Bonus message
  useEffect(() => {
    if (bonusGiven) {
      setMessage('show'); // className="show" にするとフェードイン
      const timer = setTimeout(() => {
        setMessage(''); // クラスを消す＝display:noneに切り替わるようCSSを設計
        setBonusGiven(null);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [bonusGiven]);

  // Update game status
  // with useEffect(()=>{1.実行させたい副作用関数},[2.実行タイミングを制御する依存データ配列])
  useEffect(()=>{
    // set variable to store condition of end end (all squares are filled with players)
    const gameEnd = playerOfSquares.every(player =>player !== null);

    // if continue the game
    if(!gameEnd){
      //setStatus with next player
      setStatus(`Next Player is ${xIsNext ? `X` : `O`}`);
      return;
    }
    // if the game is Over
    // set initial value of winner (it can be reassign in this function)
    let winner = null;
    if (scoreX > scoreO){
      winner = "X";
    } else if (scoreO > scoreX) {
      winner = "O";
    } else {
      winner = "Draw";
    }
    //setStatus with winner or draw
    const status = winner ==="Draw" ? "Draw" : `${winner} won !`;
    setStatus(status);
    setMessage('hide');
    setResult('show');
    //第2引数
  }, [playerOfSquares, scoreX, scoreO, xIsNext]);

  //Reset the game
  function resetSquares(){
    // set variable to store shuffled points
    const shuffled = shufflePoints();
    setPointOfSquares(shuffled);
    setPlayerOfSquares(Array(9).fill(null));
    setScoreX(0);
    setScoreO(0);
    setXIsNext(true);
    setMessage('');
    setResult('');
    bonusHasGivenTo.current = { X: false, O: false };
  }

  // UI Contents of Board.jsx
  return (
    <>
      <div className="board-info">

        <div className="board-container">
          {/* onSquareClick (which calls function handleClick) is given to Square as props,
              value of squares[n] is given to Square as props value */}
          <div className="row">
            <Square onSquareClick={() => handleClick(0)} point={pointOfSquares[0]} player={playerOfSquares[0]} />
            <Square onSquareClick={() => handleClick(1)} point={pointOfSquares[1]} player={playerOfSquares[1]} />
            <Square onSquareClick={() => handleClick(2)} point={pointOfSquares[2]} player={playerOfSquares[2]} />
          </div>
          <div className="row">
            <Square onSquareClick={() => handleClick(3)} point={pointOfSquares[3]} player={playerOfSquares[3]} />
            <Square onSquareClick={() => handleClick(4)} point={pointOfSquares[4]} player={playerOfSquares[4]} />
            <Square onSquareClick={() => handleClick(5)} point={pointOfSquares[5]} player={playerOfSquares[5]} />
          </div>
          <div className="row">
            <Square onSquareClick={() => handleClick(6)} point={pointOfSquares[6]} player={playerOfSquares[6]} />
            <Square onSquareClick={() => handleClick(7)} point={pointOfSquares[7]} player={playerOfSquares[7]} />
            <Square onSquareClick={() => handleClick(8)} point={pointOfSquares[8]} player={playerOfSquares[8]} />
          </div>
        </div>


        <div className="info-container">
          <div className={`status ${message}`}>
            <p>{status}</p>
          </div>
          <div className='score-board'>
              <div className='x-score'>
                <p>X : {scoreX} Points</p><BarChart score={scoreX} player={'X'}/>
              </div>
              <div className='o-score'>
                <p>O : {scoreO} Points</p><BarChart score={scoreO}  player={'O'}/>
              </div>
              {console.log(scoreX,scoreO)}

{/* ここに書く必要が？？？他の場所でもいい？ */}
              <div className ={`bonus-message ${message}`} >
                <p>Tic-Tac-Toe!</p>
                <p>{bonusGiven}</p>
                {/* {console.log(bonusGiven)} */}
              </div>

{/* ここでいいの？ */}
              <div className={`result ${result}`}>
                <p>{status}</p>
                <div className="result-details">
                  <p className="details-x"> X : {scoreX} points</p>
                  <p className="details-o">O : {scoreO} points</p>
                  <div>
                    {/* when clicked, call resetSquare function */}
                    <button className='reset-button' onClick={resetSquares}>Try Again</button>
                  </div>
                </div>
              </div>
          </div>


          <div>
            {/* when clicked, call resetSquare function */}
            <button className='reset-button' onClick={resetSquares}>Reset</button>
          </div>
        </div>

      </div>
    </>
  )
}

export default Board;
