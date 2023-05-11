import axios from 'axios';

const api = '34651523-b14eec117de44e9d721437a63';
const url = 'https://pixabay.com/api/?';
const perPage = '12';
const queryParams = 'image_type=photo&orientation=horizontal';

export const fetchImagesWithQuery = async (queryValue, pageNumber) => {
  const response = await axios.get(
    `${url}q=${queryValue}&page=${pageNumber}&key=${api}&${queryParams}&per_page=${perPage}`
  );

  return response.data.hits;
};
