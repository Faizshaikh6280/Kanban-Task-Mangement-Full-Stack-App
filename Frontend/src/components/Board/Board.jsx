import { useParams } from 'react-router-dom';

function Board() {
  const { boardname } = useParams();

  return <div>{boardname}</div>;
}

export default Board;
