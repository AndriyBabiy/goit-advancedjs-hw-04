import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
let page = 1;
let totalPages = 0;
let query = '';

loadMoreButton.hidden = true;

form.addEventListener('submit', handlerImageSearch);
loadMoreButton.addEventListener('click', handlerLoadMore);

async function handlerImageSearch(evt) {
  evt.preventDefault();
  gallery.innerHTML = '';
  loadMoreButton.hidden = true;
  gallery.classList.remove('grid-styling');

  page = 1;
  query = evt.currentTarget.elements.searchQuery.value;

  try {
    populateImages(query);
  } catch (err) {
    console.error(err);
  } finally {
    form.reset();
  }
}

async function handlerLoadMore() {
  loadMoreButton.hidden = true;

  page += 1;

  console.log(page);

  try {
    await populateImages(query, page);
  } catch (e) {
    console.error(e);
  }
}

async function populateImages(query, page = 1) {
  const data = await fetchImages(query, page);

  totalPages = Math.ceil(data.totalHits / 40);

  const images = data.hits;

  if (images.length === 0) {
    iziToastErrorPopup(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    iziToastSuccessPopup(`Hooray! We found ${data.totalHits} images.`);

    gallery.classList.add('grid-styling');

    if (page < totalPages) {
      loadMoreButton.hidden = false;
    } else {
      loadMoreButton.hidden = true;
      loadMoreButton.replaceWith(
        "We're sorry, but you've reached the end of search results."
      );
    }

    gallery.insertAdjacentHTML('beforeend', createImageBlockMarkup(images));
  }
}

async function fetchImages(query, page) {
  const CORE_URL = 'https://pixabay.com/api/';
  const API_KEY = '42185018-8d9cd3aefdae43a32ddab8929';

  const params = new URLSearchParams({
    key: API_KEY,
    per_page: 40,
    page: page,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  const response = await fetch(`${CORE_URL}?${params}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

function createImageBlockMarkup(arr) {
  return arr
    .map(
      ({ webformatURL, tags, likes, views, comments, downloads }) => `
      <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${likes}
            </p>
            <p class="info-item">
            <b>Views</b>
            ${views}
          </p>
            <p class="info-item">
              <b>Comments</b>
              ${comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>
              ${downloads}
            </p>
        </div>
      </div>
    `
    )
    .join('');
}

function iziToastSuccessPopup(text) {
  return iziToast.show({
    message: `${text}`,
    color: 'green',
    position: 'topRight',
    timeout: 3000,
  });
}

function iziToastErrorPopup(text) {
  gallery.insertAdjacentHTML(
    'afterbegin',
    `<div class='iziToastLocation' style='width: 60%'></div>`
  );

  return iziToast.show({
    message: `${text}`,
    color: 'grey',
    target: '.iziToastLocation',
    timeout: false,
  });
}
