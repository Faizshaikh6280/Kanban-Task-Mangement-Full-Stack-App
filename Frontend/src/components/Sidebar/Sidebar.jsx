import { Link, useNavigate, useParams } from 'react-router-dom';
import Logo from '../../ui/Logo';

import { BsGrid1X2 } from 'react-icons/bs';
import { MdSunny } from 'react-icons/md';
import { BsMoonStarsFill } from 'react-icons/bs';
import { BsEyeSlash } from 'react-icons/bs';
import { useThemeMode } from '../../contexts/DarkModeContext';
import { useRef } from 'react';
import AddNewBoardModal from '../Modals/AddNewBoardModal';
import { useBoards } from '../../hooks/api/useBoards';
import { LuLogOut } from 'react-icons/lu';
import { useLogout } from '../../hooks/api/useLogout';
import { useAuthContext } from '../../contexts/AuthContext';
import { FaTrashCan } from 'react-icons/fa6';
import { useDeleteBoard } from '../../hooks/api/useDeleteBoard';
import { useBoardContext } from '../../contexts/CurretBoardContext';

function Sidebar() {
  const { authuser, setAuthuser } = useAuthContext();
  const { boardname } = useParams();
  const { isLoading, boards } = useBoards(authuser._id);
  const { toggleMode, isDarkMode } = useThemeMode();
  const { logoutMutation } = useLogout();
  const { isDeleting, deleteBoardMuation } = useDeleteBoard();
  const navigate = useNavigate();
  const ref = useRef();
  const { setCurrentBoard } = useBoardContext();
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
          <ul className="boards-list overflow-x-hidden  mt-6 flex flex-col gap-6 overflow-y-auto py-4 scroll-smooth">
            {boards.map((board, indx) => {
              return (
                <div
                  className="gap-3 board-item flex justify-between items-center"
                  key={board._id}
                >
                  <Link
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
                  <button disabled={isDeleting} className="borad-trash">
                    <FaTrashCan
                      title="delete board"
                      onClick={() => {
                        deleteBoardMuation({
                          boardId: board._id,
                          userId: authuser._id,
                        });
                        if (boardname === board.slug) {
                          navigate(`/${boards[indx + 1]?.slug || ''}`);
                          setCurrentBoard(boards[indx + 1] || null);
                        }
                      }}
                    />
                  </button>
                </div>
              );
            })}
          </ul>

          <AddNewBoardModal />

          <div className="bottom px-4 md:px-9 mt-auto bottom-14 w-full">
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
            <div className="flex justify-between items-baseline">
              <div
                className="hide-sidebar max-w-fit flex items-center mt-6 gap-4 select-none cursor-pointer"
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
              <LuLogOut
                className="text-3xl font-semibold cursor-pointer "
                onClick={() => {
                  logoutMutation(
                    {},
                    {
                      onSuccess: () => {
                        setAuthuser(null);
                        localStorage.setItem('authuser', null);
                      },
                    }
                  );
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Sidebar;
