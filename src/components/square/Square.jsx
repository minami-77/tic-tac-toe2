import './square.css';
// get props from Board to display value when clicked
const Square = ({onClick, value}) => {
  return (
      <button className="square-button" onClick={onClick}>
        {value}
      </button>
  );
}

export default Square;
