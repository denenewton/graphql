export function hasErrorsMovie(data) {
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
  if (!onlyNumbers.test(data.id)) {
    return {
      __typename: "Error",
      message:
        "This ID is invalid! it needs to contain only numbers [0 - 9] with no signal!!",
    };
  }

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
