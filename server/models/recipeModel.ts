import { Schema, model, InferSchemaType } from 'mongoose';

const schemaDefinition = {
  title: { type: String, required: true },
} as const;

const schema = new Schema(schemaDefinition);

const RecipeModel = model('Recipe', schema);
export type RecipeModelType = InferSchemaType<typeof schemaDefinition>;

export default RecipeModel;
