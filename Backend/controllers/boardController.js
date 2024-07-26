import boardModel from '../models/boardModel.js';

export const createBoard = async function (req, res, next) {
  try {
    const { name, userId } = req.body;

    const board = await boardModel.findOne({ name, userId });
    if (board) {
      throw new Error('Board name already exists');
    }

    const newBoard = await boardModel.create({
      name,
      userId,
    });
    res.status(200).json({
      status: 'success',
      data: {
        newBoard,
      },
    });
  } catch (error) {
    res.send(error.message);
    console.log('Error in createBoard 💥', error);
  }
};

export const getBoard = async function (req, res, next) {
  try {
    const board = await boardModel
      .findOne({ name: req.params.name })
      .populate('coulmns');
    if (!board) throw new Error('Board does not exists');

    res.status(200).json({
      status: 'success',
      data: {
        board,
      },
    });
  } catch (error) {
    res.send(error.message);
    console.log('Error in getBoard 💥', error);
  }
};
