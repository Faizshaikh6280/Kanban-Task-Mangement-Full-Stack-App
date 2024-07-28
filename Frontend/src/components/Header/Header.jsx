import { useRef } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import AddNewTaskModal from '../Modals/AddNewTaskModal';
function Header() {
  const ref = useRef();
  return (
    <div
      className="header bg-custom-bg-secondary text-custom-text-2  border-b-slate-600 border-b-[1px] pt-9 px-8 flex justify-between items-start"
      ref={ref}
    >
      <h1 className="boardname text-4xl text-custom-text-1 font-semibold">
        Platform Launch
      </h1>
      <div className="right flex gap-4 items-center">
        <AddNewTaskModal />
        <BsThreeDotsVertical
          className="text-3xl cursor-pointer"
          onClick={() => {
            const main = document.querySelector('.main');
            const sidebar = document.querySelector('.sidebar');

            ref.current.classList.toggle('hidesidebar');
            sidebar.classList.toggle('hidesidebar');
            main.classList.toggle('hidesidebar');
          }}
        />
      </div>
    </div>
  );
}

export default Header;
