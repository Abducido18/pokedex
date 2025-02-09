export async function fetchPokemon(id) {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + id)
  if (!response.ok) {
    throw new Error('Network response was not ok' + response.statusText);
  }
  return response.json();
}

export function createPokemon(pokemonData) {
  return {
    name: capitalizeFirstLetter(pokemonData.name),
    id: pokemonData.id,
    height: parseHeight(pokemonData.height),
    weight: parseWeight(pokemonData.weight),
    type: pokemonData.types ? pokemonData.types.map(type => capitalizeFirstLetter(type.type.name)) : [],
    abilities: pokemonData.abilities ? pokemonData.abilities.map(ability => capitalizeFirstLetter(ability.ability.name)) : [],
    sprite: pokemonData.sprites.front_default,
    moves: pokemonData.moves ? pokemonData.moves.slice(0, 5).map(move => capitalizeFirstLetter(move.move.name)) : []
  };
}

function parseHeight(height) {
  return height / 10;
}

function parseWeight(weight) {
  return weight / 10;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}