import axios from "axios";

export const getWrapper = async (url) => {
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

export default getWrapper;
