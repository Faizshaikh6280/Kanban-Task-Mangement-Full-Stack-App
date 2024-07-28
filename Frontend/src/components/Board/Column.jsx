import Task from './Task';

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

      {tasks.length > 0 ? (
        <ul className="mt-9 flex flex-col gap-8">
          {tasks.map((task) => (
            <Task task={task} key={task._id} />
          ))}
        </ul>
      ) : (
        <div className="h-full flex items-center">
          <span> Add new task to your list😉</span>
        </div>
      )}
    </div>
  );
}

export default Column;
