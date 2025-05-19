import './square.css';
// get props {onSquareClick, point, player} from Board to display value when clicked
// Square button with onClick -> props:onSquareClick is called -> onSquareClick calls function handleClick
const Square = ({ onSquareClick, point, player, showPoint }) => {
  const color = player === 'X' ? 'x-green' : player === 'O' ? 'o-pink' : '';

  return (
    <button className={`square-button ${color}`} onClick={onSquareClick}>
      {showPoint ? point : '?'}
    </button>
  );
}

export default Square;
