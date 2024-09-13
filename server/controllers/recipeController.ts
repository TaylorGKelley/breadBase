import { Request, Response } from 'express';
import Recipes from '../models/recipeModel';
import { ProtectedUser } from '../types/User';

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
  try {
    const recipe = await Recipes.findById(req.params.id);

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
      status: `Failed to retrieve data at: ${req.originalUrl} with id ${req.params.id}`,
    });
  }
};

export const createRecipe = async (req: Request, res: Response) => {
  try {
    const newRecipe = await Recipes.create({
      ...req.body,
      bakery: (req.user as ProtectedUser).associatedBakery,
    });

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
  try {
    const updatedRecipe = await Recipes.findByIdAndUpdate(
      req.params.id,
      { ...req.body, bakery: (req.user as ProtectedUser).associatedBakery },
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      status: 'Recipe updated',
      data: {
        recipe: updatedRecipe,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: `Failed to update item of id:'${req.params.id}' with error,`,
      error: (error as Error).message,
    });
  }
};

export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipes.findByIdAndDelete(req.params.id);

    if (!recipe) {
      throw new Error('Could not find recipe using the provided ID.');
    }

    res.status(200).json({
      status: 'Recipe deleted',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: `Failed to delete item of id:'${req.params.id}' with error,`,
      error: (error as Error).message,
    });
  }
};
