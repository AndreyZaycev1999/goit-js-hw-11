import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery')
const inputRef = document.querySelector('#search-form input');
const buttonSubmit = document.querySelector('button[type="submit"]');
const buttonLoadMore = document.querySelector('button[type="button"]');

let searchQuery = '';



formRef.addEventListener('submit', onSearch);

async function onSearch(event) {
    event.preventDefault();

    searchQuery = event.currentTarget.elements.searchQuery.value;

    if (searchQuery) {
        try {
            return await fetchData(searchQuery).then((images) => renderImg(images))
        } catch (error) {
            console.log(error);
        }
    }
};

function renderImg(images) {
    const markup = images.map((image) => {
        const {webformatURL, largeImageURL, tags, likes, views, coments, downloads} = image;
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
            <b>Comments ${coments}</b>
          </p>
          <p class="info-item">
            <b>Downloads ${downloads}</b>
          </p>
        </div>
      </div>`
    })
    .join("");
    galleryRef.innerHTML
};
