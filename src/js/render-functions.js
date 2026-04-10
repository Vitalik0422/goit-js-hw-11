import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const galleryList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const galleryService = {
  gallery: new SimpleLightbox('.gallery a'),
  createGallery(images) {
    const markup = images
      .map(
        item => `<li class="galleryItem">
        <a href="${item.largeImageURL}">
          <img src="${item.webformatURL}" alt="${item.tags}" />
          <ul class="informationList">
            <li class="informationItem">Likes <span class="infoAmount">${item.likes}</span></li>
            <li class="informationItem">Views <span class="infoAmount">${item.views}</span></li>
            <li class="informationItem">Comments <span class="infoAmount">${item.comments}</span></li>
            <li class="informationItem">Downloads <span class="infoAmount">${item.downloads}</span></li>
          </ul>
        </a>
      </li>`
      )
      .join('');
    galleryList.innerHTML = markup;
    this.gallery.refresh();
    return galleryList;
  },

  waitForImages(container) {
    const img = [...container.querySelectorAll('img')];
    const promises = img.map(
      item =>
        new Promise(resolve => {
          if (item.complete) resolve();
          else item.addEventListener('load', resolve);
        })
    );
    return Promise.all(promises);
  },
  clearGallery() {
    galleryList.innerHTML = '';
  },
  showGallery() {
    galleryList.classList.add('isActiveGallery');
  },
  hideGallery() {
    galleryList.classList.remove('isActiveGallery');
  },
  showLoader() {
    loader.classList.add('isActive');
  },
  hideLoader() {
    loader.classList.remove('isActive');
  },
};

export default galleryService;
