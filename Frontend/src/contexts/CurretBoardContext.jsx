import React, { createContext, useContext, useState } from 'react';

const BoardContext = createContext();

function CurrentBoardProvider({ children }) {
  const [currentBoard, setCurrentBoard] = useState('');
  return (
    <BoardContext.Provider
      value={{
        currentBoard,
        setCurrentBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export function useBoardContext() {
  const context = useContext(BoardContext);
  if (!context) throw new Error('Board Context is used outside of provider.');
  return context;
}

export default CurrentBoardProvider;
