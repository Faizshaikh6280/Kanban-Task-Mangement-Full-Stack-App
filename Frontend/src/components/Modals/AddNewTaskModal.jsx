import Modal from '../../ui/Modals';
import AddNewTaskWindow from './AddNewTaskWindow';

function AddNewTaskModal() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="add-new-task">
          <button className="add-task text-white px-8 py-4 rounded-full bg-primary shadow-sm hidden md:block">
            +Add New Task
          </button>
          <button className="add-task text-white w-24 h-16  rounded-full bg-primary shadow-sm  flex justify-center md:hidden text-5xl font-bold items-center">
            <span className="">+</span>
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
