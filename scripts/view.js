export function renderPokemon(pokemon) {
  const pokemonInfo = document.querySelector('.js-pokemon-info');
  if (!pokemonInfo) {
    console.error('Element with class "js-pokemon-info" not found.');
    return;
  }

  // Limpiar solo el contenido de texto anterior
  const existingPokemonText = pokemonInfo.querySelector('.pokemon-text');
  if (existingPokemonText) {
    existingPokemonText.remove();
  }

  // Crear y agregar el texto del Pokémon
  const pokemonText = document.createElement('div');
  pokemonText.classList.add('pokemon-text');
  pokemonText.innerHTML = `
    <h2 class="pokemon-name">#${pokemon.id}. ${pokemon.name}</h2>
    <p class="bold-profile">Profile</p>
    <ul class="pokemon-data">
      <li><p class="bold-info">Height: </p> ${pokemon.height} m.</li>
      <li><p class="bold-info"> Weight: </p>${pokemon.weight} kg.</li>
      <li><p class="bold-info">Type: </p> ${pokemon.type.join(', ')}</li>
      <li><p class="bold-info">Abilities: </p> ${pokemon.abilities.join(', ')}</li>
      <li><p class="bold-info">Moves: </p> ${pokemon.moves.join(', ')}</li>
    </ul>
  `;

  // Crear y agregar la imagen del Pokémon solo si ha cambiado
  const pokemonPhotoContainer = document.querySelector('.pokemon-photo');
  if (!pokemonPhotoContainer) {
    console.error('Element with class "pokemon-photo" not found.');
    return;
  }

  const existingPokemonPhoto = pokemonPhotoContainer.querySelector('.pokemon-sprite');
  if (existingPokemonPhoto) {
    if (existingPokemonPhoto.src !== pokemon.sprite) {
      existingPokemonPhoto.src = pokemon.sprite;
      existingPokemonPhoto.alt = pokemon.name;
    }
  } else {
    const pokemonPhoto = document.createElement('img');
    pokemonPhoto.classList.add('pokemon-sprite');
    pokemonPhoto.src = pokemon.sprite; 
    pokemonPhoto.alt = pokemon.name;
    pokemonPhotoContainer.appendChild(pokemonPhoto);
  }

  // Agregar el texto del Pokémon al contenedor
  pokemonInfo.appendChild(pokemonText);
}

export function renderPokemonList(totalPokemon) {
  const pokemonList = document.querySelector('.js-pokemon-list');
  const searchButton = document.createElement('button');
  searchButton.classList.add('pokemon-search-button');
  searchButton.innerHTML = 'Search';
  pokemonList.appendChild(searchButton);

  let pokemonHTML = '';
  for (let i = 1; i <= totalPokemon; i++) {
    let formatedNumber = String(i).padStart(3, '0');
    pokemonHTML += `
      <button class="pokemon-button" id="pokemon${i}">N.° ${formatedNumber}</button>
    `;
  }
  pokemonList.insertAdjacentHTML('beforeend', pokemonHTML);
}