import { useParams } from 'react-router-dom';
import { BOARD as BOARD_DATA, TASKS } from '../../dev-data/index.js';
import { useBoard } from '../../hooks/api/useBoard.js';
import { groupTasksByStatus } from '../../utils/index.js';
import AddNewCoulmnModal from '../Modals/AddNewCoulmnModal.jsx';
import Column from './Column';

function Board() {
  const { boardname } = useParams();
  const groupedTasks = groupTasksByStatus(TASKS);
  const { isLoading, board, error } = useBoard(boardname);

  if (isLoading) return <p className="text-center w-full">Loading...</p>;

  return (
    <div className="p-9 h-full coulmns">
      {board?.coulmns.map((coulmn) => (
        <Column
          key={coulmn._id}
          coulmn={coulmn}
          tasks={groupedTasks[coulmn.name.toLowerCase()] || []}
        />
      ))}

      <AddNewCoulmnModal />
    </div>
  );
}

export default Board;
