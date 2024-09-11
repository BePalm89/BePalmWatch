import express from 'express';
import { getAllMovies } from '../controllers/movie.controllers.js';

const router = express.Router();

router.get('/', getAllMovies);

export default router;