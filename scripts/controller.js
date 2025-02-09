import { fetchPokemon, createPokemon } from "./model.js";
import {  renderPokemon, renderPokemonList } from "./view.js";

async function getPokemon(id) {
  try {
    const pokemonData = await fetchPokemon(id);
    const pokemon = createPokemon(pokemonData);
    renderPokemon(pokemon);
    return pokemon;  
  } catch (error) {
    console.error(error);
  }
}

function pokemonButtonEvents() {
  const buttons = document.querySelectorAll('.pokemon-button');
  const upButton = document.querySelector('.up-button');
  const downButton = document.querySelector('.down-button');
  const enterButton = document.querySelector('.a-button');
  let currentIndex = 0;

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : buttons.length - 1;
      updateButtonFocus(currentIndex);
    } else if (event.key === 'ArrowDown') {
      currentIndex = (currentIndex < buttons.length - 1) ? currentIndex + 1 : 0;
      updateButtonFocus(currentIndex);
    }
  });

  enterButton.addEventListener('click', () => {
    getPokemon(currentIndex + 1);
  });

  upButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : buttons.length - 1;
    updateButtonFocus(currentIndex);
  });

  downButton.addEventListener('click', () => {
    currentIndex = (currentIndex < buttons.length - 1) ? currentIndex + 1 : 0;
    updateButtonFocus(currentIndex);
  });

  function updateButtonFocus(index) {  
    buttons.forEach((button, i) => {
      if (i === index) {
        button.classList.add('active');
        button.focus();
      } else {
        button.classList.remove('active');
      }
    });
  }
    const searchButton = document.querySelector('.pokemon-search-button');
    const searchInput = document.querySelector('.search-input-wrapper');
    const searchInputField = document.querySelector('.search-input');
    const submit = document.querySelector('.search-submit');
    
    searchButton.addEventListener('click', () => {
      searchInput.classList.toggle('active');
    });
  
    submit.addEventListener('click', async () => {
      const searchValue = searchInputField.value;
      if (searchValue) {
        const pokemon = await getPokemon(searchValue);
        if (pokemon) {
          // Buscar el índice del botón correspondiente al nombre del Pokémon
          currentIndex = pokemon.id - 1;
          updateButtonFocus(currentIndex);

        }
      } else {
        alert('Please enter a valid number or name');
      }
      searchInput.classList.toggle('active');
      searchInputField.value = '';
    });

  setTimeout(() => {
    buttons.forEach((button, i) => {
      button.addEventListener('click', () => {
        getPokemon(i+1);
        currentIndex = i;
        console.log(i);
        updateButtonFocus(currentIndex);      
      });
    });  
  }, 100);
}

const totalPokemon = 1010;
async function initialize() {
  renderPokemonList(totalPokemon);
  pokemonButtonEvents();
}

initialize();


