import mongoose from 'mongoose';

const RecipesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requaried: true,
    },
    description: {
      type: String,
      requaried: true,
    },
    ingridients: {
      type: Array,
      default: [],
      requaried: true,
    },
    coockingTime: {
      type: String,
      requaried: true,
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Recipe', RecipesSchema);
