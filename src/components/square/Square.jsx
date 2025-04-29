import './square.css';

const Square = ({onClick, value}) => {
  return (
      <button className="square-button" onClick={onClick}>
        {value}
      </button>
  );
}

export default Square;
