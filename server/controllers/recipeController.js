import Recipe from '../models/recipeModel.js';
import APIFeatures from '../utils/APIFeatures.js';

export const getAllRecipes = async (req, res, next) => {
  try {
    const features = new APIFeatures(Recipe.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const recipes = await features.query;

    res.status(200).json({
      status: 'success',
      data: {
        recipes,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

export const createRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        recipe,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed to submit data',
      error: error.message,
    });
  }
};

export const getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        recipe,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'Could not find tour by id',
      error: error.message,
    });
  }
};

export const updateRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        recipe,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed to update tour',
      message: error.message,
    });
  }
};

export const deleteRecipe = async (req, res, next) => {
  try {
    const recipe = Recipe.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed to delete recipe',
      message: error.message,
    });
  }
};
