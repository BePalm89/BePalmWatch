export const mapMediaWithGenres = (movies: any[], genreIds: { [key: number]: string} ) => { 

    return movies.map((movie: any) => {
        return {
          ...movie,
          genres: movie.genre_ids?.map((id: number) => genreIds[id])
        }
      })

}

const IMAGE_BASE_URL: string = 'https://image.tmdb.org/t/p/';

export const getImageUrl = (path: string, size: string = 'w400') => {
  return `${IMAGE_BASE_URL}${size}/${path}`;
} 
