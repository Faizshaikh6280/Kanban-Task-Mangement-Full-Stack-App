import React, { useState } from 'react';

function AddNewColumnWindow() {
  const [column, setCoulumn] = useState({ value: '', color: '#645fc6' });

  function handleInputChange(e) {
    setCoulumn((prev) => {
      return {
        ...prev,
        [e.target.name]: [e.target.value],
      };
    });
  }

  return (
    <div className="flex flex-col gap-7 w-[35rem] md:w-[50rem]">
      <h1 className="text-custom-text-1 text-3xl font-semibold">
        Add New Column
      </h1>

      <form action="" className="flex flex-col gap-7">
        <div className="tite-input flex flex-col gap-3 ">
          <label
            htmlFor="columnname"
            className="text-2xl text-custom-text-1 font-semibold tracking-wider"
          >
            Column Name
          </label>
          <input
            type="text"
            placeholder={`e.g. On Hold`}
            id="columnname"
            name="value"
            className="border h-[35px] border-custom-text-2 px-3 p-2 rounded-md w-full bg-transparent placeholder:text-2xl placeholder:text-custom-text-2/5 tracking-wide  outline-none"
            value={column.value}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="column-input flex flex-col gap-3 ">
          <label
            htmlFor="colors"
            className="text-2xl text-custom-text-1 font-semibold tracking-wider"
          >
            Column Color
          </label>
          <div className="w-fullflex gap-3">
            <input
              type="color"
              placeholder={'e.g. hotpink'}
              id="colors"
              name="color"
              className="border h-[35px] border-custom-text-2 px-3 p-2  rounded-md w-full bg-transparent placeholder:text-2xl placeholder:text-custom-text-2/5 tracking-wide  outline-none"
              value={column.color}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>

        <button className="px-4 py-4 rounded-full text-slate-50 text-2xl cursor-pointer bg-primary mt-4 font-bold">
          Create New Column
        </button>
      </form>
    </div>
  );
}

export default AddNewColumnWindow;
