function Column({ coulmn, tasks }) {
  return (
    <div>
      <div className="title flex gap-3 items-center min-w-[32rem]">
        <span
          className={`w-6 h-6 rounded-full block`}
          style={{ backgroundColor: `${coulmn.color}` }}
        />
        <span className="uppercase text-2xl tracking-widest">
          {coulmn.name} ({tasks?.length})
        </span>
      </div>

      <ul className="mt-9 flex flex-col gap-8">
        {tasks.map((task) => {
          const completedSubtasks = task.subtasks.filter(
            (el) => el.isDone
          ).length;
          return (
            <li
              className={`px-6 py-8 bg-custom-bg-secondary rounded-lg text-custom-text-1 cursor-default`}
              key={task._id}
            >
              <h1>{task.title}</h1>
              <p className="text-custom-text-2 text-2xl mt-2">
                {completedSubtasks} of {task.subtasks.length} subtasks
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Column;
