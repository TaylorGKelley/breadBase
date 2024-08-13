import { Request, Response } from 'express';
import Recipes from '../models/recipeModel';

export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await Recipes.find();

    res.status(200).json({
      message: 'success',
      data: {
        recipes,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: `Failed to retrieve data at: ${req.originalUrl}`,
    });
  }
};

export const getRecipeById = async (req: Request, res: Response) => {
  const recipeID = req.params.id;
  try {
    const recipe = await Recipes.findById(recipeID);

    if (!recipe) {
      throw new Error('Could not find recipe with that ID');
    }

    res.status(200).json({
      message: 'success',
      data: {
        recipe,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: `Failed to retrieve data at: ${req.originalUrl} with id ${recipeID}`,
    });
  }
};

export const createRecipe = async (req: Request, res: Response) => {
  try {
    const newRecipe = await Recipes.create(req.body);

    res.status(200).json({
      message: 'Recipe Created',
      data: {
        recipe: newRecipe,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: `Failed to create item with error,`,
      error: (error as Error).message,
    });
  }
};

export const updateRecipe = async (req: Request, res: Response) => {
  const recipeID = req.params.id;
  try {
    const updatedRecipe = await Recipes.findByIdAndUpdate(recipeID, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'Recipe updated',
      data: {
        recipe: updatedRecipe,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: `Failed to update item of id:'${recipeID}' with error,`,
      error: (error as Error).message,
    });
  }
};

export const deleteRecipe = async (req: Request, res: Response) => {
  const recipeID = req.params.id;
  try {
    const recipe = await Recipes.findByIdAndDelete(recipeID);

    if (!recipe) {
      throw new Error('Could not find recipe using the provided ID.');
    }

    res.status(200).json({
      status: 'Recipe deleted',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: `Failed to delete item of id:'${recipeID}' with error,`,
      error: (error as Error).message,
    });
  }
};
