// Task 1 : Create Character Card Function
import { createCharacterCard } from "./components/card/card.js";

// Task 3 : Search Character Names

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
async function getCharacters() {
  let url = `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`;
  try {
    const response = await fetch(url);

    !response.ok ? console.log("Bad Request") : console.log("url =", url);

    const jsonData = await response.json();

    maxPage = jsonData.info.pages;

    const characterList = jsonData.results;
    cardContainer.innerHTML = `<li id="spacer_list"></li>`;
    characterList.forEach((character) => {
      createCharacterCard(character);
      pagination.innerHTML = `${page}/${maxPage}`;
    });
  } catch (error) {
    // console.error(error);
    cardContainer.innerHTML = `
      <div id="img_container">
        <img
          id="bad-response-twirly"
          src="../../assets/portal-rick-and-morty edit.gif"
          alt="Aww geez, Morty. You know what that means? We screwed up... again! Graaaahh!"
        />
      </div>`;
  }
}

getCharacters(page);

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  searchQuery = searchBar.querySelector("input").value;
  cardContainer.innerHTML = ``;
  page = 1;
  getCharacters();
});

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    cardContainer.innerHTML = "";
  } else if (page === maxPage) {
    page = 1;
    cardContainer.innerHTML = "";
  }
  getCharacters();
});

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    cardContainer.innerHTML = "";
  } else if (page === 1) {
    page = maxPage;
    cardContainer.innerHTML = "";
  }
  getCharacters();
});
