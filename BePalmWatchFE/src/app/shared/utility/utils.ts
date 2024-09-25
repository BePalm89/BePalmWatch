import dayjs from "dayjs";

export const mapMediaWithGenres = (
  movies: any[],
  genreIds: { [key: number]: string }
) => {
  return movies.map((movie: any) => {
    return {
      ...movie,
      genres: movie.genre_ids?.map((id: number) => genreIds[id]),
    };
  });
};

const IMAGE_BASE_URL: string = "https://image.tmdb.org/t/p/";

export const getImageUrl = (path: string, size: string = "w400") => {
  return `${IMAGE_BASE_URL}${size}/${path}`;
};

export const convertDate = (date: string) => {
  const inputFormat = "ddd, DD.MM";
  const outputFormat = "YYYY-MM-DD";
  const year = 2024;
  const dateString = `${date} ${year}`;

  const parsedDate = dayjs(dateString, `${inputFormat} YYYY`);

  if (!parsedDate.isValid()) {
    throw new Error("Invalid date format");
  }

  return parsedDate.format(outputFormat);
};

export const formattedCardNumber = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
};
