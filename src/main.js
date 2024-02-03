import axios from 'axios';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', evt => {
  evt.preventDefault();
  gallery.innerHTML = '';

  const request = evt.currentTarget.elements.searchQuery.value;

  console.log(request);

  fetchImages(request)
    .then(response => {
      gallery.insertAdjacentHTML(
        'beforeend',
        createImageBlockMarkup(response.hits)
      );

      console.log(response.hits);
    })
    .catch(error => console.log(error));
});

function fetchImages(request) {
  const CORE_URL = 'https://pixabay.com/api/';
  const API_KEY = '42185018-8d9cd3aefdae43a32ddab8929';

  const params = new URLSearchParams({
    key: API_KEY,
    q: request,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  // axios fetch attempt
  // return axios({
  //   // headers: {
  //   //   Authorization: `Bearer ${API_KEY}`
  //   // },
  //   url: `${CORE_URL}?${params}`
  // }).then(response => {
  //   if (!response.ok) {
  //     throw new Error(response.statusText);
  //   }
  //   console.log();

  //   return response.json();
  // })
  //

  return fetch(`${CORE_URL}?${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    console.log();

    return response.json();
  });
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
