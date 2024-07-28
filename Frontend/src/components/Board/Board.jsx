import { BOARD as BOARD_DATA, TASKS } from '../../dev-data/index.js';
import { groupTasksByStatus } from '../../utils/index.js';
import AddNewCoulmnModal from '../Modals/AddNewCoulmnModal.jsx';
import Column from './Column';

function Board() {
  const groupedTasks = groupTasksByStatus(TASKS);
  return (
    <div className="p-9 h-full coulmns">
      {BOARD_DATA.coulmns.map((coulmn) => (
        <Column
          key={coulmn._id}
          coulmn={coulmn}
          tasks={groupedTasks[coulmn.name]}
        />
      ))}

      <AddNewCoulmnModal />
    </div>
  );
}

export default Board;
