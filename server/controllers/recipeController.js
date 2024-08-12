import catchAsync from '../utils/catchAsync.js';

export const getAllRecipes = catchAsync(async (req, res) => {
  try {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
      error,
    });
  }
});

export const getRecipeById = catchAsync(async (req, res) => {
  try {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
      error,
    });
  }
});
