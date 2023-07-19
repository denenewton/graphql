export default function getPage(array, page, perPage) {
  const obj = {};
  const start = (page - 1) * perPage; // start == offset
  const end = page * perPage;

  obj.items = array.slice(start, end);
  if (obj.items.length === 0) {
    return obj;
  }

  if (page > 1) {
    obj.prev = page - 1;
  }

  if (end < array.length) {
    obj.next = page + 1;
  }

  if (obj.items.length !== array.length) {
    obj.page = page; //current or page
    obj.first = 1;
    obj.last = Math.ceil(array.length / perPage);
  }

  return obj;
}

export async function filtering(filter, Movie) {
  let movies;
  if (filter) {
    if (filter?.title) {
      movies = await Movie?.find({
        title: { $regex: filter?.title, $options: "i" },
      });
      if (filter.year) {
        movies = movies.filter((mov) => mov.year === filter?.year);
      }
      if (filter?.genre) {
        const regex = new RegExp(filter?.genre, "i");
        movies = movies.filter((mov) => mov.genre?.match(regex));
      }
      return movies;
    }
    if (filter?.genre) {
      movies = await Movie?.find({
        genre: { $regex: filter?.genre, $options: "i" },
      });

      if (filter.year) {
        movies = movies.filter((mov) => mov.year === filter?.year);
      }
      return movies;
    }
    if (filter.year) {
      movies = await Movie?.find({ year: filter?.year });
      return movies;
    }
  }
  movies = await Movie?.find();
  return movies;
}

export function hasErrosMovie(data) {
  var onlyNumbers = new RegExp("^[0-9]+$");
  if (
    !data.title ||
    !data.year ||
    !data.genre ||
    !data.director ||
    !data.description
  ) {
    return {
      __typename: "Error",
      message:
        "This field is required:  title, year, genre, director, description.",
    };
  }

  if (verifyIdField(data.id)) return verifyIdField(data.id);

  if(verifyGenreField(data.genre)) return verifyGenreField(data.genre)

  if (onlyNumbers.test(data.year)) {
    const date = new Date();
    if (data.year < 1985 || data.year > date.getFullYear()) {
      return {
        __typename: "Error",
        message: "Year need to be [1985 - 2023].",
      };
    }
  }
  return false;
}

export function verifyIdField(id) {
  var onlyNumbers = new RegExp("^[0-9]+$");
  if (!onlyNumbers.test(id)) {
    return {
      __typename: "Error",
      message:
        "This ID is invalid! it needs to contain only numbers [0 - 9] with no signal!!",
    };
  }
  return false;
}

export function verifyGenreField(genre) {
  const genres = [
    "Adventure",
    "Comedy",
    "Romance",
    "Fantasy",
    "Action",
    "Thriller",
    "Drama",
    "Teen",
    "Science_Fiction",
  ];

  if (!genres.find((g) => g === genre)) {
    return {
      __typename: "Error",
      message:
        "Genre just can be one of these: Adventure,  Comedy,  Romance, Fantasy,  Action,  Thriller, Drama, Teen, Science_Fiction",
    };
  }
}
