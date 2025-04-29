import './square.css';
// get props {onSquareClick, value} from Board to display value when clicked
// Square button with onClick -> props:onSquareClick is called -> onSquareClick calls function handleClick
const Square = ({onSquareClick, value}) => {
  return (
      <button className="square-button" onClick={onSquareClick}>
        {value}
      </button>
  );
}

export default Square;
