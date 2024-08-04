import boardModel from '../models/boardModel.js';
import coulmnModel from '../models/coulmnModel.js';
import subtaskModel from '../models/subtaskModel.js';
import taskModel from '../models/taskModel.js';

export const createColumn = async function (req, res, next) {
  try {
    const { name, color, boardSlug, userId } = req.body;

    const board = await boardModel
      .findOne({ slug: boardSlug, userId })
      .populate('coulmns');

    if (!board) {
      throw new Error('Board does not exists');
    }

    const columnNames = board.coulmns.map((el) => el.name);

    if (columnNames.includes(name)) {
      throw new Error('Coulmn name already exists with this board.');
    }

    const newColumn = await coulmnModel.create({
      name,
      color,
    });

    // once column has been created add this column into respective board.
    board.coulmns.push(newColumn._id);
    await board.save();

    res.status(200).json({
      status: 'success',
      newColumn,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
    console.log('Error in createCoulmn 💥', error);
  }
};

export const createManyColumns = async function (req, res, next) {
  try {
    const { columns, boardId } = req.body;
    // const { name, color, boardId } = req.body;
    const board = await boardModel.findById(boardId);

    if (!board) {
      throw new Error('Board does not exists');
    }

    let columnsPromises = [];

    columns.forEach((el) => {
      columnsPromises.push(
        coulmnModel.create({
          name: el.name,
          boardId: el.boardId,
          color: el.color,
        })
      );
    });

    const columnsResults = await Promise.all(columnsPromises);

    columnsResults.forEach((column) => {
      board.coulmns.push(column._id);
    });

    await board.save();

    res.status(200).json({
      status: 'success',
      board,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
    console.log('Error in createCoulmn 💥', error);
  }
};

export const deleteColumn = async function (req, res, next) {
  try {
    const { columnId } = req.params;
    const { boardId, userId } = req.query;

    // first remove column from board.
    const board = await boardModel.findById(boardId);
    const column = await coulmnModel.findById(columnId);

    if (!board) throw new Error('Board not found!');
    board.coulmns.filter((colId) => colId !== columnId);
    await board.save();

    // delete all tasks & subtasks having status of this column.
    const tasks = await taskModel.find({
      $and: [
        { boardSlug: board.slug },
        { userId: userId },
        { status: column.name },
      ],
    });

    // delete all subtasks of each task.
    const subtasksDeletePromises = [];
    const tasksDeletePromise = [];

    tasks.map((task) => {
      tasksDeletePromise.push(taskModel.findByIdAndDelete(task._id));
      task.subTasks.map((sub) =>
        subtasksDeletePromises.push(subtaskModel.findByIdAndDelete(sub))
      );
    });
    // delete all subtasks & task.
    await Promise.all(subtasksDeletePromises);
    await Promise.all(tasksDeletePromise);

    // delete column itself.;
    await coulmnModel.findByIdAndDelete(columnId);

    res.status(200).json({
      status: 'success',
      board,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
    console.log('Error in deleteColumn 💥', error);
  }
};
