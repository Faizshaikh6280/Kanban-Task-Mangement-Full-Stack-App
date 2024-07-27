import { useState } from 'react';

function UpdateTaskWindow({ task }) {
  const sortedTasks = task.subtasks.sort((a, b) => {
    if (a.isDone === b.isDone) {
      return 0;
    }
    return a.isDone ? -1 : 1;
  });
  const [subtasks, setSubtasks] = useState(sortedTasks);
  const columnCategory = ['todo', 'doing', 'done'];
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
    </div>
  );
}

export default UpdateTaskWindow;
