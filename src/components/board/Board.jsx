import './board.css';
import Square from '../square/Square'
import { useState, useEffect, useRef } from "react";
import BarChart from '../barChart/BarChart';
// import Typed from 'typed.js';


const Board = () => {
  // Initialize variables
  // Popup display for Game Start
  const [gameStarted, setGameStarted] = useState(false);
  // set player's name
  const [playerNames, setPlayerNames] = useState({ X: "", O: "" });
  // set an array for point of each squares, using useState so that it can be changed later
  const [pointOfSquares, setPointOfSquares] = useState(()=>shufflePoints());
  // set an array for player who get each squares,using useState so that it can be changed later [X, O, null,...]
  const [playerOfSquares, setPlayerOfSquares] = useState(Array(9).fill(null));
  // set variable for default next player (X) (use boolean, no need function)
  const [xIsNext, setXIsNext] = useState(true);
  // store initial score of the players
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  // status (game continue or end)
  const [status, setStatus] = useState("Next Player is X");
  // message contents of bonus
  const [bonus, setBonus] = useState(null);
  // hide or show (bonus)
  const [bonusPopup, setBonusPopup] = useState(false);
  // bonus has given before or not
  const bonusHasGivenTo = useRef({ X: false, O: false });
  // hide or show (result)
  const [result, setResult] = useState(false);


  // Define function to shuffle points on squares
  function shufflePoints(){
    return [50,30,20,10,10,-10,-20,-30,-50].sort(()=> Math.random() - 0.5);
  }

  // Define function to handle the game
  function handleClick(n){
    // End : if nth square is filled, cannot update the square
    if (playerOfSquares[n] !==null){
      return;
    }

    //  Continue :copy previous array and set it as nextPlayerGetSquares (to create new one)
    const nextPlayerOfSquares = playerOfSquares.slice();
    // set variable for current player and give it a value X or O
    const currentPlayer = xIsNext ? "X" : "O";
    // update the nth nextPlayerGetSquare(copied one) with current player
    nextPlayerOfSquares[n] = currentPlayer;
    // update the newly created array(copied one)
    setPlayerOfSquares(nextPlayerOfSquares);
    // Set next player in turn for the next move
    setXIsNext(!xIsNext);
    // Call calculation function
    calculatePointsAndBonus(nextPlayerOfSquares, currentPlayer, n);

    console.log("[handleClick] clicked index:", n);
    console.log("[handleClick] currentPlayer:", currentPlayer);
    console.log("[handleClick] nextPlayerOfSquares:", nextPlayerOfSquares);
    console.log("[handleClick]",bonusPopup);
  }


  //Define function for calculation
  function calculatePointsAndBonus(squares, currentPlayer, index){
    // get point written in current square
    const basePoint = pointOfSquares[index] || 0;
    // call bonusCombination function
    const bonusPlayer = bonusCombination(squares, currentPlayer);
    // condition of bonus
    const isBonus = bonusPlayer === currentPlayer;
    // set bonus point
    const bonusPoint = isBonus ? 50 : 0;
    const totalPoint = basePoint + bonusPoint;

    console.log("[calculatePointsAndBonus] squares:", squares);
    console.log(`[calculatePointsAndBonus] currentPlayer: ${currentPlayer}`);
    console.log(`[calculatePointsAndBonus] basePoint: ${basePoint}, bonus: ${bonusPoint}, total: ${totalPoint}`);

    if (isBonus) {
      setBonusPopup(true);
      setBonus(`${bonusPlayer==="X" ? playerNames["X"]!=="" ? playerNames["X"] :"Player1" : playerNames["O"]!=="" ? playerNames["O"] :"Player2"} got ${bonusPoint} bonus point!!`);
      bonusHasGivenTo.current[currentPlayer] = true;

      // 2秒後にポップアップを非表示に
      setTimeout(() => {
        setBonusPopup(false);
      }, 2000);

    } else {
      setBonusPopup(false);
      setBonus(null);
    }

    if (currentPlayer === "X") {
      setScoreX(prev => prev + totalPoint);
    } else {
      setScoreO(prev => prev + totalPoint);
    }
  }


  // Define function to add bonus point (need argument)
  function bonusCombination(squares, currentPlayer){
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

    console.log(`[bonusCombination] squares: ${squares}`);
    console.log(`[bonusCombination] currentPlayer${currentPlayer}`);

    // set [a,b,c] as places of squares and check if they match the combination
    // Destructuring（分割代入:配列の中身をまとめて変数に取り出す書き方）
    for ( let i = 0; i < combinations.length; i++ ){
      const [a, b, c] = combinations[i];
      console.log(`[bonusCombination] squares[a,b,c]: ${squares[a]},${squares[b]},${squares[c]}`);

      // squares[a] is not empty and squares[a]=[b]=[c]='X or 'O'
      if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
        if(!bonusHasGivenTo.current[squares[a]]){
          console.log(`[bonusCombination] Bonus combination!->${squares[a]}`);
          // bonusHasGivenTo.current[squares[a]] = true;
          return squares[a];
        }
      }
    }

    // otherwise return null
    return null;
  }

  // Update game status
  useEffect(()=>{
    // set variable to store condition of end end (all squares are filled with players)
    const gameEnd = playerOfSquares.every(player =>player !== null);

    // if continue the game
    if(!gameEnd){
      //setStatus with next player
      setStatus(`Next Player is ${xIsNext ? playerNames["X"]!=="" ? playerNames["X"] :"Player1"  : playerNames["O"]!=="" ? playerNames["O"] :"Player2"}`);
      return;
    }

    // if the game is Over
    // set initial value of winner (it can be reassign in this function)
    let winner = null;
    if (scoreX > scoreO){
      winner = playerNames["X"]!=="" ? playerNames["X"] :"Player1";
    } else if (scoreO > scoreX) {
      winner = playerNames["O"]!=="" ? playerNames["O"] :"Player2";
    } else {
      winner = "Draw";
    }
    //setStatus with winner or draw
    const status = winner ==="Draw" ? "Draw" : `${winner} won! `;
    setStatus(status);
    setResult(true);

    //第2引数
  }, [playerOfSquares, playerNames, scoreX, scoreO, xIsNext]);


  //Reset the game
  function resetSquares(){
    setGameStarted(false);
    setPlayerNames({ X: "", O: "" });
    const shuffled = shufflePoints();
    setPointOfSquares(shuffled);
    setPlayerOfSquares(Array(9).fill(null));
    setScoreX(0);
    setScoreO(0);
    setXIsNext(true);
    setBonusPopup(false);
    setResult(false);
    bonusHasGivenTo.current = { X: false, O: false };
  }

  // //Type.js
  // useEffect(() => {
  //   const typed = new Typed(typedRef.current, {
  //     strings: [
  //       'Highest score wins! Line up 3 to earn a 30-point bonus.',
  //       '得点の多い方が勝ち! 3つ並べるとボーナス30点'
  //       ],
  //     typeSpeed: 100,
  //     loop:true

  //   });

  //   return () => {
  //     // Destroy Typed instance during cleanup to stop animation
  //     typed.destroy();
  //   };
  // }, []);


  // UI Contents of Board.jsx
  return (
    <>
      <div className="status">
        <p className={xIsNext ? "green" : "pink"}>{status}</p>
      </div>

      <div className="board-info">

      {/* Game Start Popup*/}
      <div className ={`start-container ${gameStarted ? '':'show'}`}>
      <p>Enter Player's Name to Start!</p>
        <div className="input-container">
          <div>
            <p className="green">Player 1</p>
            <input
                type="text"
                name="playerNames1"
                placeholder='Player1: Name'
                value = {playerNames["X"]}
                onChange={(event) => setPlayerNames({...playerNames, X : event.target.value})}
            />
          </div>
          <div>
            <p className="pink">Player 2</p>
            <input
                type="text"
                name="playerNames2"
                placeholder='Player2: Name'
                value = {playerNames["O"]}
                onChange={(event) => setPlayerNames({...playerNames, O : event.target.value})}
            />
          </div>
          {console.log(playerNames)}
        </div>

        <button className="start-button" onClick={()=>{setGameStarted(true)}}>Game Start</button>
      </div>

        {/* Game */}
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


          <div className='score-board'>
            <div className='x-score'>
              <p>{playerNames["X"]!=="" ? playerNames["X"] :"Player1"} : {scoreX} Points</p><BarChart score={scoreX} player={'X'}/>
            </div>
            <div className='o-score'>
              <p>{playerNames["O"]!=="" ? playerNames["O"] :"Player2"} : {scoreO} Points</p><BarChart score={scoreO}  player={'O'}/>
            </div>

            {/* Bonus Popup message */}
            <div className ={`bonus-message ${bonusPopup? 'show':''}`} >
              <p>{bonus}</p>
            </div>

            {/* Result Popup message */}
            <div className={`result ${result? 'show': ''}`}>
              <p>{status}</p>
              <div className="result-details">
                <p className="details-x"> {playerNames["X"]!=="" ? playerNames["X"] :"Player1"} : {scoreX} points</p>
                <p className="details-o"> {playerNames["O"]!=="" ? playerNames["O"] :"Player2"} : {scoreO} points</p>
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
