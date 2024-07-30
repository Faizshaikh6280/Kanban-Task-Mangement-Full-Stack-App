import boardModel from '../models/boardModel.js';
import coulmnModel from '../models/coulmnModel.js';

export const createColumn = async function (req, res, next) {
  try {
    const { name, color, boardSlug } = req.body;
    const board = await boardModel.findOne({ slug: boardSlug });

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
