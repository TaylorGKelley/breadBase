import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Recipe must have a name'],
    unique: true,
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
