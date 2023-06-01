import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';

import * as RecipeController from './controllers/RecipeController.js';
import handleValidationErrors from './utils/handleValidationErrors.js';
import { recipesValidation } from './validation.js';

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DB OK'))
  .catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get('/recipe', RecipeController.getAll);
app.get('/recipe/:id', RecipeController.getOne);
app.post('/recipe', recipesValidation, handleValidationErrors, RecipeController.create);
app.delete('/recipe/:id', RecipeController.remove);
app.patch('/recipe/:id', recipesValidation, handleValidationErrors, RecipeController.update);

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});
