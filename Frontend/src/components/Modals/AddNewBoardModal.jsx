import { BsGrid1X2 } from 'react-icons/bs';
import Modal from '../../ui/Modals';
import AddNewBoardWindow from './AddNewBoardWindow';
function AddNewBoardModal() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="add-new-task">
          <button className="py-4 w-full rounded-tr-full rounded-br-full pl-8 flex gap-4 items-center cursor-pointer text-primary">
            <BsGrid1X2 className="text-[1.7rem]" />
            <span>+Create New Board</span>
          </button>
        </Modal.Open>
        <Modal.Window name={'add-new-task'}>
          <AddNewBoardWindow />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddNewBoardModal;
