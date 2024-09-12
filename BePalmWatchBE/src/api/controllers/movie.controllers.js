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
    const updatedShowtime = req.body;

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    updatedShowtime.showtime.forEach((newShowtime) => {
      // Find it there is an existing showtime with the same date
      const existingShowtime = movie.showtime.find(
        (st) => st.date === newShowtime.date
      );

      if (existingShowtime) {
        // Check if there is an existing time

        newShowtime.times.forEach((newTime) => {
          const existingTime = existingShowtime.times.find(
            (timeEntry) => timeEntry.time === newTime.time
          );

          if (existingTime) {
            // update the tickets array
            newTime.tickets.forEach((ticket) => {
              //Check if the tickets already exist to avoid duplication
              const existingTicket = existingTime.tickets.find(
                (t) => t.row === ticket.row && t.seat === ticket.seat
              );

              if (!existingTicket) {
                existingTime.tickets.push(ticket);
              }
            });
          } else {
            // Add the new time
            existingShowtime.times.push(newTime);
          }
        });
      } else {
        // if the date does not exists add it
        movie.showtime.push(newShowtime);
      }
    });

    const updatedMovie = await movie.save();

    return res.status(200).json(updatedMovie);
  } catch (error) {
    return next(error);
  }
};
