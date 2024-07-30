import { Link, useParams } from 'react-router-dom';
import Logo from '../../ui/Logo';

import { BsGrid1X2 } from 'react-icons/bs';
import { MdSunny } from 'react-icons/md';
import { BsMoonStarsFill } from 'react-icons/bs';
import { BsEyeSlash } from 'react-icons/bs';
import { useThemeMode } from '../../contexts/DarkModeContext';
import { useRef } from 'react';
import AddNewBoardModal from '../Modals/AddNewBoardModal';
import { useBoards } from '../../hooks/api/useBoards';

function Sidebar() {
  const { boardname } = useParams();
  const { isLoading, boards } = useBoards('1');
  const { toggleMode, isDarkMode } = useThemeMode();
  const ref = useRef();
  function handleChange() {
    toggleMode();
  }

  return (
    <div
      className="sidebar py-8 flex flex-col bg-custom-bg-secondary text-custom-text-2 border-r-slate-600 border-r-[1px] pt-9 pr-8 relative"
      ref={ref}
    >
      <div className="pl-8">
        <Logo />
      </div>
      {!isLoading && (
        <>
          <div className="mt-16 tracking-[3px] uppercase text-xl pl-8">
            All boards({boards.length})
          </div>
          <ul className="boards-list mt-6 flex flex-col gap-6 overflow-y-auto py-4 scroll-smooth">
            {boards.map((board) => {
              return (
                <Link
                  key={board._id}
                  to={`/${board.slug}`}
                  className={`py-4 w-full rounded-tr-full rounded-br-full pl-8 flex gap-4 items-center cursor-pointer ${
                    board.slug === boardname
                      ? 'bg-primary text-white'
                      : 'text-custom-text-2'
                  } `}
                >
                  <BsGrid1X2 className="text-[1.7rem]" />{' '}
                  <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                    {board.name}
                  </span>
                </Link>
              );
            })}
          </ul>

          <AddNewBoardModal />

          <div className="bottom px-9 mt-auto bottom-14 w-full">
            <div className="bg-custom-bg-main px-4 py-5 rounded-md flex gap-6 justify-center items-center">
              <MdSunny
                className={`cursor-pointer text-3xl ${
                  !isDarkMode && 'text-primary'
                }`}
              />
              <label className="switch" htmlFor="checkbox">
                <input type="checkbox" id="checkbox" onChange={handleChange} />
                <div className="slider round"></div>
              </label>
              <BsMoonStarsFill
                className={`cursor-pointer text-2xl ${
                  isDarkMode && 'text-primary'
                }`}
              />
            </div>
            <div
              className="hide-sidebar flex items-center mt-6 gap-4 select-none cursor-pointer"
              onClick={() => {
                const main = document.querySelector('.main');
                const header = document.querySelector('.header');

                header.classList.add('hidesidebar');
                main.classList.add('hidesidebar');
                ref.current.classList.add('hidesidebar');
              }}
            >
              <BsEyeSlash className="text-3xl" />
              <span className="text-2xl">Hide Sidebar</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Sidebar;
