import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const buttonLoadMore = document.querySelector('button[type="button"]');

export default async function fetchData(searchQuery, numberPage) {
    const BASE_URL = 'https://pixabay.com/api/'
    const API_KEY = '34819373-9f8c3b226397b7ff98e615d33'
    const perPage = 40;
    const searchParams = new URLSearchParams({
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        page: numberPage,
        per_page: perPage,
        safesearch: true,
    });

    try {
        const response = await axios.get(`${BASE_URL}?key=${API_KEY}&${searchParams}`);
        console.log(response.data.hits);

        if (numberPage === 1 && response.data.hits.length > 0) {
            Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
            if (response.data.totalHits > perPage) {
                buttonLoadMore.style.display = "block";
            }
        } else if (response.data.totalHits <= perPage * numberPage && response.data.hits.length > 0) {
            Notify.info("We're sorry, but you've reached the end of search results.");
            buttonLoadMore.style.display = "none";
        } else if (response.data.hits.length) {

        } else {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return
        }

        return response.data.hits;

    } catch (error) {
        console.log(error);
    };
    numberPage ++;
};