import slugify from 'slugify';
import boardModel from '../models/boardModel.js';

export const createBoard = async function (req, res, next) {
  try {
    const { name, userId } = req.body;
    const boardSlug = slugify(name, { lower: true });

    const board = await boardModel.findOne({ slug: boardSlug, userId });

    if (board) {
      throw new Error('Board name already exists');
    }

    const newBoard = await boardModel.create({
      name,
      userId,
    });
    res.status(200).json({
      status: 'success',
      newBoard,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
    console.log('Error in createBoard 💥', error);
  }
};

export const getBoard = async function (req, res, next) {
  try {
    const { userId } = req.query;
    const board = await boardModel
      .findOne({ slug: req.params?.name?.toLowerCase().split(' ')[0], userId })
      .populate('coulmns');

    if (!board) throw new Error('Board does not exists');

    res.status(200).json({
      status: 'success',
      board,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
    // res.send(error.message);
    console.log('Error in getBoard 💥', error);
  }
};

export const getAllBoards = async function (req, res, next) {
  try {
    const { userId } = req.query;
    const boards = await boardModel.find({ userId }).select('name slug');
    res.status(200).json({
      status: 'success',
      boards,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
    console.log('Error in getAllBoards 💥', error);
  }
};
