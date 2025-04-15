let currentOffset = 1;
let pokemonInputValue;
let allPokemonData = [];

function init() {
  showLoader();
  getPokemonBatch();
}

async function getPokemonBatch() {
  for (let i = currentOffset; i < currentOffset + 25; i++) {
    await fetchAndStorePokemon(i);
  }
  currentOffset += 25;
  hideLoader();
}

async function fetchAndStorePokemon(index) {
  try {
    const pokemon = await fetchPokemon(index);
    const speciesData = await fetchSpeciesData(pokemon.species.url);
    storePokemonData(pokemon, speciesData, index);
    renderPokemonTypes(pokemon.types, index);
  } catch (error) {
    console.error(`Fehler beim Laden der Daten für Pokemon ${index}`, error);
  }
}

async function fetchPokemon(index) {
  const url = `https://pokeapi.co/api/v2/pokemon/${index}`;
  const response = await fetch(url);
  return await response.json();
}

async function fetchSpeciesData(speciesUrl) {
  const response = await fetch(speciesUrl);
  return await response.json();
}

function storePokemonData(pokemon, speciesData, index) {
  const genus = getPokemonGenus(speciesData);
  allPokemonData.push({
    ...pokemon,
    speciesDetails: speciesData,
    index,
    species: pokemon.species.name,
    genus,
    weight: pokemon.weight,
    height: pokemon.height,
    abilities: pokemon.abilities,
  });
  renderMyPokemon(pokemon, index);
}

function getPokemonGenus(speciesData) {
  return speciesData.genera.find((g) => g.language.name === "en")?.genus || "Unknown";
}

function renderPokemonTypes(types, index) {
  const typeContent = document.getElementById(`type${index}`);
  types.forEach((type) => {
    typeContent.innerHTML += `<p>${type.type.name}</p>`;
  });
}

//ALT:
// function renderMyPokemon(pokemon, index) {
//   const primaryType = pokemon.types[0].type.name;
//   const pokemonContent = document.getElementById("pokemon_content");
//   pokemonContent.innerHTML += getPokemonCards(pokemon, index, primaryType);
// }

//NEU - funktioniert anscheinend:
function renderMyPokemon(pokemon, index) {
  const pokemonContent = document.getElementById("pokemon_content");

  // Karte existiert bereits?
  if (document.getElementById(`pokemon_card_${index}`)) {
    return;
  }

  const primaryType = pokemon.types[0].type.name;
  const cardHTML = getPokemonCards(pokemon, index, primaryType);

  // Neues Element erstellen
  const cardElement = document.createElement("div");
  cardElement.id = `pokemon_card_${index}`;
  cardElement.innerHTML = cardHTML;

  // Karte anhängen
  pokemonContent.appendChild(cardElement);
}

function searchPokemon() {
  const input = document.getElementById("search_field").value.toLowerCase();
  const info = document.getElementById("info_field");
  info.innerHTML = "";

  if (input === "") {
    resetSearch();
  } else if (input.length >= 3) {
    filterPokemon(input, info);
  } else {
    showShortInputMessage(info);
  }

  toggleLoadButtonState(input);
}

function resetSearch() {
  renderFilteredPokemon(allPokemonData);
  enableButton();
}

function filterPokemon(input, info) {
  const filtered = allPokemonData.filter((p) => p.name?.toLowerCase().startsWith(input));

  if (filtered.length > 0) {
    renderFilteredPokemon(filtered);
  } else {
    info.innerHTML += `<p>Try another Letter!</p>`;
  }
}

function showShortInputMessage(info) {
  info.innerHTML += `<p>Please enter at least 3 letters to search!</p>`;
}

function toggleLoadButtonState(input) {
  if (input === "" || input.length < 3) {
    enableButton();
  } else {
    disableButton();
  }
}

function disableButton() {
  document.getElementById("loadButton").disabled = true;
}

function enableButton() {
  document.getElementById("loadButton").disabled = false;
}

function renderFilteredPokemon(filtered) {
  const container = document.getElementById("pokemon_content");
  container.innerHTML = "";
  const fragment = document.createDocumentFragment();

  filtered.forEach((p) => {
    const primaryType = p.types[0].type.name;
    const card = document.createElement("div");
    card.innerHTML = getFilteredPokemonCards(p, primaryType);
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

function showDialogCard(index, name, sprite, id) {
  const pokemon = allPokemonData.find((p) => p.index === index);
  if (!pokemon) return console.error(`Pokemon mit Index ${index} nicht gefunden.`);
  renderDialog(pokemon, index, name, sprite, id);
}

function renderDialog(pokemon, index, name, sprite, id) {
  const primaryType = pokemon.types[0].type.name;
  const dialog = getDialogCards(index, name, sprite, id, pokemon.genus, pokemon.weight, pokemon.height, pokemon.abilities, primaryType);
  document.getElementById("pokemon_dialog").innerHTML = dialog;
  toggleDialogVisibility();
  handleArrowVisibility(index);
}

function toggleDialogVisibility() {
  document.getElementById("pokemon_dialog").classList.remove("d_none");
  document.getElementById("body_overlay").classList.remove("d_none");
  document.documentElement.style.overflow = "hidden";
  document.body.scroll = "no";
}

function navigateCard(newIndex) {
  const pokemon = allPokemonData.find((p) => p.index === newIndex);
  if (pokemon) showDialogCard(pokemon.index, pokemon.name, pokemon.sprites.other.showdown.front_shiny, pokemon.id);
  else console.log("Keine weitere Karte verfügbar.");
}

function handleArrowVisibility(index) {
  toggleArrow("left_arrow", index === 1);
  toggleArrow("right_arrow", index === getLastCardIndex());
}

function toggleArrow(arrowId, isHidden) {
  const arrow = document.getElementById(arrowId);
  arrow.classList.toggle("hidden_arrow", isHidden);
}

function getLastCardIndex() {
  return allPokemonData.length;
}

function closeDialog() {
  document.getElementById("pokemon_dialog").classList.add("d_none");
  document.getElementById("body_overlay").classList.add("d_none");
  document.documentElement.style.overflow = "scroll";
  document.body.scroll = "yes";
}

function showLoader() {
  toggleLoader(false);
}

function hideLoader() {
  toggleLoader(true);
}

function toggleLoader(isHidden) {
  document.getElementById("loader_overlay").classList.toggle("d_none", isHidden);
  document.getElementById("loader").classList.toggle("d_none", isHidden);
}

function toggleDarkMode() {
  const content = document.body;
  const header = document.getElementById("header");
  const toggleIcon = document.getElementById("toggle_icon");
  content.classList.toggle("dark_mode");
  header.classList.toggle("dark_mode");
  toggleIcon.classList.toggle("dark_mode_icon");
}

function renderNextCards() {
  if (allPokemonData.length >= 150) alert("There's no more to load");
  else {
    showLoader();
    getPokemonBatch();
  }
}
