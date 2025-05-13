import './App.css';
import Board from './components/board/Board'
import { useEffect, useRef } from "react";
import Typed from 'typed.js';

const App = () => {
  //Type.js
  const typedRef = useRef(null);
  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        'Highest score wins! Line up 3 to earn a 50-point bonus.',
        '得点の多い方が勝ち! 3つ並べるとボーナス50点'
        ],
      typeSpeed: 120,
      loop:true

    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <div>
      <div className="container">
        <h1 className="title">Score Match XO</h1>
        <div className="description">
          <p ref={typedRef}></p>
        </div>
        <div className="game-container">
          <Board/>
        </div>
      </div>
    </div>
  )
}

export default App;
