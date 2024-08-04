import { useDeleteColumn } from '../../hooks/api/useDeleteColumn';
import Task from './Task';
import { FaTrashCan } from 'react-icons/fa6';
import { useBoardContext } from '../../contexts/CurretBoardContext';
import { useAuthContext } from '../../contexts/AuthContext';

function Column({ coulmn, tasks }) {
  const { currentBoard } = useBoardContext();
  const {
    authuser: { _id: userId },
  } = useAuthContext();
  const { deleteColumnMutation, isDeleting } = useDeleteColumn();
  return (
    <div className="overflow-x-hidden column-item">
      <div className="title flex gap-3 justify-between items-center min-w-[32rem]">
        <div className="flex gap-3 items-center">
          <span
            className={`w-6 h-6 rounded-full block`}
            style={{ backgroundColor: `${coulmn.color}` }}
          />
          <span className="uppercase text-2xl tracking-widest">
            {coulmn.name} ({tasks?.length})
          </span>
        </div>

        <button
          disabled={isDeleting}
          className="column-trash"
          onClick={() => {
            deleteColumnMutation({
              columnId: coulmn._id,
              boardId: currentBoard._id,
              userId,
            });
          }}
        >
          <FaTrashCan title="delete column" />
        </button>
      </div>

      <ul className={`mt-9 flex flex-col gap-8`}>
        {tasks.map((task, index) => (
          <Task task={task} key={task._id} index={index} />
        ))}
      </ul>
    </div>
  );
}

export default Column;
