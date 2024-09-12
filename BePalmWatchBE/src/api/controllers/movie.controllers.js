import Movie from "../models/Movie.model.js";

export const getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    return next(error);
  }
};

export const getMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);

    return res.status(200).json(movie);
  } catch (error) {
    return next(error);
  }
};

export const updateMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const modifiedMovie = new Movie(req.body);
    
    modifiedMovie._id = id;
    
    const updatedMovie = await Movie.findByIdAndUpdate(id, modifiedMovie, {
      new: true,
    });
    
    return res.status(200).json(updatedMovie);
  } catch (error) {
    return next(error);
  }
};
