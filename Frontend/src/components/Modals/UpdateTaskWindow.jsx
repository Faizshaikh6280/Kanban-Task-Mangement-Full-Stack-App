import { useState } from 'react';
import SelectCategory from '../../ui/SelectCategory';

const columnCategory = ['todo', 'doing', 'done'];
const sortTasks = function (tasks) {
  return tasks.sort((a, b) => {
    if (a.isDone === b.isDone) {
      return 0;
    }
    return a.isDone ? -1 : 1;
  });
};

function UpdateTaskWindow({ task }) {
  const [subtasks, setSubtasks] = useState(sortTasks(task.subtasks));
  const [selectedCategory, setSelectedCategory] = useState(task.status);

  const completedSubtasks = subtasks.filter((sub) => sub.isDone).length;

  function handleCheckboxChange(index) {
    setSubtasks((original) => {
      const newSubtasks = [...original];
      newSubtasks[index] = {
        ...newSubtasks[index],
        isDone: !newSubtasks[index].isDone,
      };
      return newSubtasks;
    });
  }
  return (
    <div className="flex flex-col gap-6 min-w-[30rem]">
      <h1 className="title text-custom-text-1 text-3xl font-semibold max-w-[80%] leading-10">
        {task.title}
      </h1>
      <p className="description text-xl text-custom-text-2 leading-7">
        {task.description}
      </p>
      <ul>
        <p className="text-custom-text-1 font-semibold text-2xl tracking-wide mb-4">
          Subtasks ({completedSubtasks} of {task.subtasks.length})
        </p>
        {subtasks.map((subtask, index) => {
          return (
            <li
              className="flex gap-4 items-center p-3 rounded-md bg-custom-bg-main mb-4"
              key={index}
            >
              <input
                type="checkbox"
                id={subtask._id}
                checked={subtask.isDone}
                onChange={() => handleCheckboxChange(index)}
                className="accent-primary"
              />
              <label
                htmlFor={subtask._id}
                className={`${
                  subtask.isDone ? 'line-through' : ''
                } text-custom-text-2 text-[1.5rem]`}
              >
                {subtask.subtaskname}
              </label>
            </li>
          );
        })}
      </ul>
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
      <button className="px-4 py-4 rounded-full text-slate-50 text-2xl cursor-pointer bg-primary mt-4">
        Update Task
      </button>
    </div>
  );
}

export default UpdateTaskWindow;
