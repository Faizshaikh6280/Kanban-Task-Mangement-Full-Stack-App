import { useState } from 'react';
import SelectCategory from '../../ui/SelectCategory';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useUpdateTask } from '../../hooks/api/useUpdateTask';

const sortTasks = function (tasks) {
  return tasks.sort((a, b) => {
    if (a.isDone === b.isDone) {
      return 0;
    }
    return a.isDone ? -1 : 1;
  });
};

function UpdateTaskWindow({ task }) {
  const { boardname } = useParams();
  const { data: board } = useQuery({ queryKey: [`${boardname}`] });
  const columnCategory = board.coulmns.map((el) => el.name);
  const [subtasks, setSubtasks] = useState(sortTasks(task.subTasks));

  const [selectedCategory, setSelectedCategory] = useState(task.status);
  const [changed, setChanged] = useState([]);
  const completedSubtasks = subtasks.filter((sub) => sub.isDone).length;

  const { isUpdating, updateTaskMutation } = useUpdateTask();

  function handleCheckboxChange(index) {
    setSubtasks((original) => {
      const newSubtasks = [...original];
      newSubtasks[index] = {
        ...newSubtasks[index],
        isDone: !newSubtasks[index].isDone,
      };
      return newSubtasks;
    });
    if (!changed.includes(index)) {
      setChanged((prev) => [...prev, index]);
    } else {
      setChanged((prev) => prev.filter((el) => el !== index));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const elems = subtasks
      .filter((_, indx) => changed.includes(indx))
      .map((el) => {
        return { _id: el._id, isDone: el.isDone };
      });

    updateTaskMutation(
      {
        taskId: task._id,
        subtasks: elems,
        status: selectedCategory === task.status ? '' : selectedCategory,
      },
      {
        onSuccess: () => {
          document.documentElement.click();
        },
      }
    );
  }

  return (
    <div className="flex flex-col gap-6 min-w-[30rem]">
      <h1 className="title text-custom-text-1 text-3xl font-semibold max-w-[80%] leading-10">
        {task.title}
      </h1>
      <p className="description text-xl text-custom-text-2 leading-7">
        {task.description}
      </p>
      <form action="" onSubmit={handleSubmit}>
        <ul>
          <p className="text-custom-text-1 font-semibold text-2xl tracking-wide mb-4">
            Subtasks ({completedSubtasks} of {task.subTasks.length})
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
            onChangeCategory={(e) => setSelectedCategory(e.target.value)}
            columnCategory={columnCategory}
          />
        </div>
        <button className="px-4 w-full py-4 rounded-full text-slate-50 text-2xl cursor-pointer bg-primary mt-4">
          {isUpdating ? 'Updating...' : 'Update Task'}
        </button>
      </form>
    </div>
  );
}

export default UpdateTaskWindow;
