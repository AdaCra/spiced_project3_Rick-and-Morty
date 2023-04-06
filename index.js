// Task 1 : Create Character Card Function
import { createCharacterCard } from "./components/card/card.js";

// Task 2 : Get Character Data
const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage;
let page = 1;
let searchQuery = "";

// Task 2 : Fetch character data from API
async function getCharacters(page) {
  let url = `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`;
  try {
    const response = await fetch(url);

    !response.ok ? console.log("Bad Request") : console.log("url =", url);

    const jsonData = await response.json();

    maxPage = jsonData.info.pages;
    // console.log("max page =", maxPage);
    const characterList = jsonData.results;

    characterList.forEach((character) => {
      createCharacterCard(character);
      pagination.innerHTML = `${page}/${maxPage}`;
    });
  } catch (error) {
    console.error(error);
  }
}

getCharacters(page);

nextButton.addEventListener("click", () => {
  console.log("event Max Page:", maxPage);
  if (page < maxPage) {
    page++;
    cardContainer.innerHTML = "";
  }
  getCharacters(page);
});
prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    cardContainer.innerHTML = "";
  }
  getCharacters(page);
});
