import React, { useState } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { TASK_PLACEHOLDER } from '../../dev-data';
import SelectCategory from '../../ui/SelectCategory';

function AddNewTaskWindow() {
  const [subtasks, setSubtasks] = useState([{ value: '' }]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const columnCategory = ['todo', 'doing', 'done'];

  function handleInputChange(value, indx) {
    setSubtasks((subtasks) => {
      const newSubtasks = [...subtasks];
      newSubtasks[indx] = {
        ...newSubtasks[indx],
        value,
      };
      return newSubtasks;
    });
  }

  return (
    <div className="flex flex-col gap-7 w-[35rem] md:w-[50rem]">
      <h1 className="text-custom-text-1 text-3xl font-semibold">
        Add New Task
      </h1>

      <form action="" className="flex flex-col gap-7">
        <div className="tite-input flex flex-col gap-3 ">
          <label
            htmlFor="title"
            className="text-2xl text-custom-text-1 font-semibold tracking-wider"
          >
            Title
          </label>
          <input
            required
            type="text"
            placeholder="e.g Take coffe break"
            id="title"
            className="border border-custom-text-2 p-3 rounded-md w-full bg-transparent placeholder:text-2xl placeholder:text-custom-text-2/5 tracking-wide  outline-none"
          />
        </div>

        <div className="description-input flex flex-col gap-3 ">
          <label
            htmlFor="description"
            className="text-2xl text-custom-text-1 font-semibold tracking-wider"
          >
            Description
          </label>
          <textarea
            rows={7}
            placeholder="e.g It's always good to take a break, A bit of break can charge a batter a lot!"
            id="title"
            className="border border-custom-text-2  p-3 rounded-md w-full bg-transparent placeholder:text-2xl placeholder:text-custom-text-2/5 tracking-wider resize-none  outline-none"
          />
        </div>

        <div className="subtasks-input flex flex-col gap-3 ">
          <label
            htmlFor="subtasks"
            className="text-2xl text-custom-text-1 font-semibold tracking-wider"
          >
            Subtasks
          </label>
          {subtasks.map((_, indx) => {
            const randomIndex = Math.floor(
              Math.random() * TASK_PLACEHOLDER.length
            );
            return (
              <div className="flex justify-between items-center" key={indx}>
                <input
                  type="text"
                  placeholder={`${TASK_PLACEHOLDER[randomIndex]}`}
                  id="subtasks"
                  className="border border-custom-text-2 px-3 p-2 rounded-md w-[92%] bg-transparent placeholder:text-2xl placeholder:text-custom-text-2/5 tracking-wide  outline-none"
                  value={subtasks[indx].value}
                  onChange={(e) => handleInputChange(e.target.value, indx)}
                />
                <HiXMark
                  className="text-5xl cursor-pointer font-extrabold"
                  onClick={() => {
                    setSubtasks((subtasks) => {
                      const newSubtasks =
                        subtasks.filter((_, Elindx) => Elindx !== indx) || [];
                      console.log(indx, newSubtasks);
                      return newSubtasks;
                    });
                  }}
                />
              </div>
            );
          })}
          <button
            onClick={() => setSubtasks((prev) => [...prev, { value: '' }])}
            className="px-4 py-4 rounded-full dark:text-primary text-2xl cursor-pointer dark:bg-custom-text-1 mt-4 font-semibold bg-custom-text-2 text-slate-50"
          >
            + Add New Subtask
          </button>
        </div>

        <div className="category">
          <h2 className="text-custom-text-1 font-semibold mb-2 text-2xl">
            Status
          </h2>
          <SelectCategory
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            columnCategory={columnCategory}
          />
        </div>
        <button className="px-4 py-4 rounded-full text-slate-50 text-2xl cursor-pointer bg-primary mt-4 font-bold">
          Create New Task
        </button>
      </form>
    </div>
  );
}

export default AddNewTaskWindow;
