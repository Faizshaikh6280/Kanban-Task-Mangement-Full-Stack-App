export const groupTasksByStatus = (tasks) => {
  if (!tasks) return;
  return tasks.reduce((groups, task) => {
    const { status } = task;
    if (!groups[status]) {
      groups[status.toLowerCase()] = [];
    }
    groups[status.toLowerCase()].push(task);
    return groups;
  }, {});
};
