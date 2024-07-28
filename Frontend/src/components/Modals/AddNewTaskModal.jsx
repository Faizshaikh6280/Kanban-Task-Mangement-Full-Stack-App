import Modal from '../../ui/Modals';
import AddNewTaskWindow from './AddNewTaskWindow';

function AddNewTaskModal() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="add-new-task">
          <button className="add-task text-white px-8 py-4 rounded-full bg-primary shadow-sm">
            +Add New Task
          </button>
        </Modal.Open>
        <Modal.Window name={'add-new-task'}>
          <AddNewTaskWindow />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddNewTaskModal;
