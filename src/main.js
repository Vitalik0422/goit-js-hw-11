import fetchData from './js/pixabay-api';
import galleryService from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import './css/styles.css';

const searchForm = document.querySelector('.form');

const options = { maxWidth: '550px', position: 'topRight' };

const handleSubmit = e => {
  e.preventDefault();
  const query = e.target.elements['search-text'].value.trim();
  if (query === '') {
    iziToast.error({
      title: 'Error',
      message: 'Search query is empty',
      ...options,
    });
    return;
  }
  galleryService.showLoader();
  galleryService.clearGallery();
  galleryService.hideGallery();
  fetchData(query)
    .then(response => {
      if (response.data.hits.length === 0) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      }
      const result = galleryService.createGallery(response.data.hits);
      return galleryService
        .waitForImages(result)
        .then(() => galleryService.showGallery())
        .catch(err =>
          iziToast.error({
            title: 'Error',
            message: err.message,
            ...options,
          })
        );
    })
    .catch(err =>
      iziToast.error({
        title: 'Error',
        message: err.message,
        ...options,
      })
    )
    .finally(() => {
      galleryService.hideLoader();
      searchForm.reset();
    });
};
searchForm.addEventListener('submit', handleSubmit);
