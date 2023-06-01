import RecipeModel from '../models/Recipe.js';

export const getAll = async (req, res) => {
  try {
    const recipes = await RecipeModel.find();

    res.json(recipes);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить рецепты',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const recipeId = req.params.id;

    const recipe = await RecipeModel.findOne({ _id: recipeId });

    if (!recipe) {
      return res.status(404).json({
        message: 'Рецепт не найден',
      });
    }

    res.json(recipe);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить рецепт',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const recipeId = req.params.id;

    const recipe = await RecipeModel.findOneAndDelete({ _id: recipeId });

    if (!recipe) {
      return res.status(404).json({
        message: 'удалось удалить рецепт',
      });
    }
    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось удалить рецепт',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new RecipeModel({
      name: req.body.name,
      description: req.body.description,
      ingridients: req.body.ingridients,
      coockingTime: req.body.coockingTime,
      imageUrl: req.body.imageUrl,
    });

    const recipe = await doc.save();

    res.json(recipe);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать рецепт',
    });
  }
};

export const update = async (req, res) => {
  try {
    const recipeId = req.params.id;
    await RecipeModel.updateOne(
      { _id: recipeId },
      {
        name: req.body.name,
        description: req.body.description,
        ingridients: req.body.ingridients,
        coockingTime: req.body.coockingTime,
        imageUrl: req.body.imageUrl,
      },
    );

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось обновить рецепт',
    });
  }
};
