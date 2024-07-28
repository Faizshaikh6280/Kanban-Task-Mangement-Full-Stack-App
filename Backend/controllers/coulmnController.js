import boardModel from '../models/boardModel.js';
import coulmnModel from '../models/coulmnModel.js';

export const createColumn = async function (req, res, next) {
  try {
    const { name, color, boardId } = req.body;
    const board = await boardModel.findById(boardId).populate('coulmns');

    if (!board) {
      throw new Error('Board does not exists');
    }

    const columnNames = board.coulmns.map((el) => el.name);
    console.log(columnNames);

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
      data: {
        newColumn,
      },
    });
  } catch (error) {
    res.send(error.message);
    console.log('Error in createCoulmn 💥', error);
  }
};
