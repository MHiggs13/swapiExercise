import axios from "axios";

export const getPeople = async (page = 1) => {
  const url = `https://swapi.dev/api/people?page=${page}`;

  const response = await axios
    .get(url)
    .then((data) => data)
    .catch((err) => {
      Error(err.message);
    });

  if (response && response.status === 200) {
    return response;
  }

  return null;
};

export default getPeople;
