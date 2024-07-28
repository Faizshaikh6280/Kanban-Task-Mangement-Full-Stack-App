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
      .findOne({ slug: req.params?.name?.toLowerCase().split(' ')[0] })
      .populate('coulmns');

    if (!board) throw new Error('Board does not exists');
    console.log('called');

    res.status(200).json({
      status: 'success',
      board,
    });
  } catch (error) {
    res.send(error.message);
    console.log('Error in getBoard 💥', error);
  }
};

export const getAllBoards = async function (req, res, next) {
  try {
    const boards = await boardModel.find().select('name slug');
    res.status(200).json({
      status: 'success',
      data: {
        boards,
      },
    });
  } catch (error) {
    res.send(error.message);
    console.log('Error in getAllBoards 💥', error);
  }
};
