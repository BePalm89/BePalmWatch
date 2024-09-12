import express from 'express';
import { getAllMovies, getMovieById, updateMovie } from '../controllers/movie.controllers.js';

const router = express.Router();

router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.put('/:id', updateMovie);

export default router;