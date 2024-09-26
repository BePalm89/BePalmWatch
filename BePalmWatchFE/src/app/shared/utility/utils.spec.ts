import { convertDate, formattedCardNumber, getImageUrl, mapMediaWithGenres } from "./utils";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import "dayjs/locale/en";
describe("utility function", () => {
  dayjs.extend(localeData);

  beforeAll(() => {
    dayjs.locale("en");
  });

  it("should correctly map movies genres", () => {
    const movies = [{ title: "mock movie", genre_ids: [29, 14, 27] }];
    const genre_ids = { 29: "Action", 14: "Comedy", 27: "Sci-fi" };

    const result = mapMediaWithGenres(movies, genre_ids);

    expect(result).toEqual([
      {
        title: "mock movie",
        genre_ids: [29, 14, 27],
        genres: ["Action", "Comedy", "Sci-fi"],
      },
    ]);
  });

  it("should return the correct img url", () => {
    const path = "path.jpg";

    const result = getImageUrl(path);

    expect(result).toEqual("https://image.tmdb.org/t/p/w400/path.jpg");
  });
/*   it('should convert date to the correct format', () => {
    const inputDate = 'Mon, 25.09';

    const result = convertDate(inputDate);

    expect(result).toBe('2024-09-25');
  });

  it('should throw an error for invalid date format', () => {
    const inputDate = 'Invalid date';

    expect(() => convertDate(inputDate)).toThrow('Invalid date format');
  }); */

  it('should format card number correctly', () => {
    const cardNumber = '1234567890123456';

    const result = formattedCardNumber(cardNumber);

    expect(result).toBe('1234 5678 9012 3456');
  });

  it('should handle card number with non-numeric characters', () => {
    const cardNumber = '1234-5678-9012-3456';

    const result = formattedCardNumber(cardNumber);

    expect(result).toBe('1234 5678 9012 3456');
  });
});
