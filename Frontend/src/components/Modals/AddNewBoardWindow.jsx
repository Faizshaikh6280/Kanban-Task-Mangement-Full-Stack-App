import React, { useState } from 'react';
import { COLUMN_NAMES } from '../../dev-data';
import { HiXMark } from 'react-icons/hi2';

function AddNewBoardWindow() {
  const [columns, setCoulumns] = useState([{ value: '', color: '#645fc6' }]);

  function handleInputChange(e, indx) {
    setCoulumns((columns) => {
      const newColumns = [...columns];
      newColumns[indx] = {
        ...newColumns[indx],
        [e.target.name]: [e.target.value],
      };
      return newColumns;
    });
  }

  return (
    <div className="flex flex-col gap-7 w-[35rem] md:w-[50rem]">
      <h1 className="text-custom-text-1 text-3xl font-semibold">
        Add New Board
      </h1>

      <form action="" className="flex flex-col gap-7">
        <div className="tite-input flex flex-col gap-3 ">
          <label
            htmlFor="title"
            className="text-2xl text-custom-text-1 font-semibold tracking-wider"
          >
            Board Name
          </label>
          <input
            required
            type="text"
            placeholder="e.g Full Stack Learning"
            id="title"
            className="border border-custom-text-2 p-3 rounded-md w-full bg-transparent placeholder:text-2xl placeholder:text-custom-text-2/5 tracking-wide  outline-none"
          />
        </div>

        <div className="subtasks-input flex flex-col gap-3 ">
          <label
            htmlFor="columns"
            className="text-2xl text-custom-text-1 font-semibold tracking-wider"
          >
            Columns
          </label>
          {columns.map((_, indx) => {
            return (
              <div className="flex justify-between items-center" key={indx}>
                <div className="w-[92%] flex gap-3">
                  <input
                    type="text"
                    placeholder={`e.g. On Hold`}
                    id="columns"
                    name="value"
                    className="border h-[35px] border-custom-text-2 px-3 p-2 rounded-md w-1/2 bg-transparent placeholder:text-2xl placeholder:text-custom-text-2/5 tracking-wide  outline-none"
                    value={columns[indx].value}
                    onChange={(e) => handleInputChange(e, indx)}
                  />
                  <input
                    type="color"
                    placeholder={'e.g. hotpink'}
                    id="colors"
                    name="color"
                    className="border h-[35px] border-custom-text-2 px-3 p-2  rounded-md w-1/2 bg-transparent placeholder:text-2xl placeholder:text-custom-text-2/5 tracking-wide  outline-none"
                    value={columns[indx].color}
                    onChange={(e) => handleInputChange(e, indx)}
                  />
                </div>
                <HiXMark
                  className="text-5xl cursor-pointer font-extrabold"
                  onClick={() => {
                    setCoulumns((columns) => {
                      const newColumns =
                        columns.filter((_, Elindx) => Elindx !== indx) || [];
                      return newColumns;
                    });
                  }}
                />
              </div>
            );
          })}
          <button
            type="button"
            onClick={() =>
              setCoulumns((prev) => [...prev, { value: '', color: '#645fc6' }])
            }
            className="px-4 py-4 rounded-full dark:text-primary text-2xl cursor-pointer dark:bg-custom-text-1 mt-4 font-semibold bg-custom-text-2 text-slate-50"
          >
            + Add New Column
          </button>
        </div>

        <button className="px-4 py-4 rounded-full text-slate-50 text-2xl cursor-pointer bg-primary mt-4 font-bold">
          Create New Board
        </button>
      </form>
    </div>
  );
}

export default AddNewBoardWindow;
