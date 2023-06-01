import { body } from 'express-validator';

export const recipesValidation = [
  body('name', 'Ввeдите название рецепта').isLength({ min: 3 }).isString(),
  body('description', 'Добавьте описание рецепта').isLength({ min: 9 }).isString(),
  body('ingridients', 'Добавьте необходимые ингридиенты').isArray(),
  body('coockingTime', 'Добавьте время приготовления'),
  body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];
