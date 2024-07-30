import { useParams } from 'react-router-dom';
import { useBoard } from '../../hooks/api/useBoard.js';
import { groupTasksByStatus } from '../../utils/index.js';
import AddNewCoulmnModal from '../Modals/AddNewCoulmnModal.jsx';
import Column from './Column';
import { useTasks } from '../../hooks/api/useTasks.js';
import { useBoardContext } from '../../contexts/CurretBoardContext.jsx';
import { useEffect } from 'react';

function Board() {
  const { boardname } = useParams();
  const { isLoading, board } = useBoard(boardname);
  const { tasks, isLoading: isLoadingTasks } = useTasks('1');
  const { setCurrentBoard } = useBoardContext();

  const groupedTasks = groupTasksByStatus(tasks);

  useEffect(
    function () {
      if (board) {
        setCurrentBoard(board);
      }
    },
    [board]
  );
  if (isLoading || isLoadingTasks)
    return <p className="text-center w-full">Loading...</p>;

  return (
    <div className="p-9 h-full coulmns">
      {board && (
        <>
          {board.coulmns.map((coulmn) => (
            <Column
              key={coulmn._id}
              coulmn={coulmn}
              tasks={groupedTasks[coulmn.name.toLowerCase()] || []}
            />
          ))}
          <AddNewCoulmnModal />
        </>
      )}
    </div>
  );
}

export default Board;
