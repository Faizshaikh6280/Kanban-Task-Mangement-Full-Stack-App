import React from 'react';
import AddNewColumnWindow from './AddNewColumnWindow';
import Modal from '../../ui/Modals';

function AddNewCoulmnModal() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="add-new-column">
          <div className="w-[20rem] bg-custom-bg-secondary rounded-lg cursor-pointer flex items-center justify-center mt-16 h-[95%]">
            <p className="text-4xl font-semibold"> +New Column</p>
          </div>
        </Modal.Open>
        <Modal.Window name={'add-new-column'}>
          <AddNewColumnWindow />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddNewCoulmnModal;
