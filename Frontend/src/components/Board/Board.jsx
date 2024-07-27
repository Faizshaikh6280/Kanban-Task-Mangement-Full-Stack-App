import { BOARD as BOARD_DATA, TASKS } from '../../dev-data/index.js';
import { groupTasksByStatus } from '../../utils/index.js';
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
      <div className="w-[20rem] bg-custom-bg-secondary rounded-lg cursor-pointer flex items-center justify-center mt-16">
        <p className="text-4xl font-semibold"> +New Coulmn</p>
      </div>
    </div>
  );
}

export default Board;
