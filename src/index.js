import fetchData from "./fetching";

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery')
const buttonLoadMore = document.querySelector('button[type="button"]');

let searchQuery = '';
galleryRef.innerHTML = '';
buttonLoadMore.style.display = "none";
const lastSearch = [];
let numberPage = 1;


formRef.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();

  searchQuery = event.currentTarget.elements.searchQuery.value;

  if (lastSearch.length == 0) {
    lastSearch.splice(0, 0, searchQuery);
    console.log(lastSearch);
  } else if (lastSearch[0] === searchQuery) {
    numberPage ++;
    console.log(numberPage);
  } else {
    lastSearch.splice(0, 1, searchQuery);
    console.log(lastSearch);
    numberPage = 1;
  }

  console.log(searchQuery);

  if (searchQuery) {
    try {
        return await fetchData(searchQuery, numberPage).then((images) => renderImg(images))
    } catch (error) {
        console.log(error);
    }
  };
};

function renderImg(images) {
  const markup = images.map((image) => {
      const {webformatURL, largeImageURL, tags, likes, views, comments, downloads} = image;
      return `<div class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views ${views}</b>
        </p>
        <p class="info-item">
          <b>Comments ${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads ${downloads}</b>
        </p>
      </div>
    </div>`
  })
  .join("");
  galleryRef.innerHTML = markup;

  
};


buttonLoadMore.addEventListener('click', onSearchMore);

async function onSearchMore() {
  numberPage ++;
  if (searchQuery) {
    try {
        return await fetchData(searchQuery, numberPage).then((images) => renderMoreImg(images))
    } catch (error) {
        console.log(error);
    }
  };
}

function renderMoreImg(images) {
  const markup = images.map((image) => {
      const {webformatURL, largeImageURL, tags, likes, views, comments, downloads} = image;
      return `<div class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views ${views}</b>
        </p>
        <p class="info-item">
          <b>Comments ${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads ${downloads}</b>
        </p>
      </div>
    </div>`
  })
  .join("");
  galleryRef.insertAdjacentHTML("beforeend", markup);
};
