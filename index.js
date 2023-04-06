import { createCharacterCard } from "./components/card/card.js";

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
const maxPage = 1;
const page = 1;
const searchQuery = "";

let characterUrl = "https://rickandmortyapi.com/api/character";

async function getCharacters(url) {
  const response = await fetch(url);
  const jsonData = await response.json();
  const characterList = jsonData.results;
  characterList.forEach((character) => {
    createCharacterCard(character);
  });
}

getCharacters(characterUrl);

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  searchQuery = searchBar.querySelector("input").value;
  getCharacters();
});

// Prevent page refresh on form submission

// 1. when there's an event, we want to grab the text input. 2. get the value of the search. 3. store that information into the search input variable. 4. then search with this information
