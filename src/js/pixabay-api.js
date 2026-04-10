import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
});

const getImagesByQuery = query => {
  return instance.get('', {
    params: {
      key: '55362008-0a0d101fe7347dac3fa7e75ec',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: '9',
    },
  });
};

export default getImagesByQuery;
