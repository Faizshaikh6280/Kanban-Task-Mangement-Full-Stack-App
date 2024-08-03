import Modal from '../../ui/Modals';
import UpdateTaskWindow from './UpdateTaskWindow';
//   const sortedTasks = task.subtasks.sort((a, b) => {
//     if (a.isDone === b.isDone) {
//       return 0;
//     }
//     return a.isDone ? -1 : 1;
//   });

function UpdateTaskModal({ task }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="updateTaskModal">
          <button className="mt-10 text-xl tracking-wide px-4 py-2 rounded-full bg-primary text-slate-50">
            Open task
          </button>
        </Modal.Open>
        <Modal.Window name="updateTaskModal">
          <UpdateTaskWindow task={task} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default UpdateTaskModal;
