import React, {
  Children,
  cloneElement,
  createContext,
  useContext,
  useState,
} from 'react';
import { HiXMark } from 'react-icons/hi2';
import { createPortal } from 'react-dom';
import useOuterClick from '../hooks/useOuterClick.js';
// Create a Context
const ModelContext = createContext();

// create a parent component
function Modal({ children }) {
  const [openName, setOpenName] = useState('');
  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModelContext.Provider
      value={{
        close,
        open,
        openName,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
}

// Create Child Component

function Open({ opens: opensWindowName, children }) {
  const { open } = useContext(ModelContext);

  const addClickEvent = (child) => {
    return cloneElement(child, { onClick: () => open(opensWindowName) });
  };

  if (Array.isArray(children) || children.type === React.Fragment) {
    return (
      <>
        {Children.map(children, (child) =>
          React.isValidElement(child) ? addClickEvent(child) : child
        )}
      </>
    );
  } else {
    return React.isValidElement(children) ? addClickEvent(children) : children;
  }
}

function Window({ children, name }) {
  const { close, openName } = useContext(ModelContext);
  const ref = useOuterClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="absolute inset-0 backdrop-blur-sm bg-custom-bg-main/30 flex flex-col items-center justify-center ">
      <div
        className="text-custom-text-2 p-10 shadow-lg rounded-lg bg-custom-bg-secondary  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-auto max-h-[95vh]"
        ref={ref}
      >
        <button onClick={close} className="absolute top-10 right-[2rem]">
          <HiXMark className="text-4xl" />
        </button>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}
//4.Adding child component as a property of parent component.
Modal.Open = Open;
Modal.Window = Window;
export default Modal;
