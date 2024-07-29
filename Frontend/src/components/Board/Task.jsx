import UpdateTaskModal from '../Modals/UpdateTaskModal';

function Task({ task }) {
  const completedSubtasks = task.subTasks.filter((el) => el.isDone).length;
  return (
    <li
      className={`px-6 py-8 bg-custom-bg-secondary rounded-lg text-custom-text-1 cursor-default`}
      key={task._id}
    >
      <h1>{task.title}</h1>
      <p className="text-custom-text-2 text-2xl mt-2">
        {completedSubtasks} of {task.subTasks.length} subtasks
      </p>

      <UpdateTaskModal task={task} />
    </li>
  );
}

export default Task;
