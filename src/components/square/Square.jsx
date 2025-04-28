import './square.css';

const Square = ({handleClick, value}) => {

  return (
      <button className="square-button" onClick={handleClick}>
        {value}
      </button>
  );
}

export default Square
