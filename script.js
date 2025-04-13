let currentOffset = 1;
let pokemonInputValue;
let allPokemonData = [];

function init() {
  showLoader();
  getPokemonData();
}

async function getPokemonData() {
  for (let i = currentOffset; i < currentOffset + 25; i++) {
    try {
      let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      let response = await fetch(url);
      let pokemon = await response.json();
      let speciesResponse = await fetch(pokemon.species.url);
      let speciesData = await speciesResponse.json();
      let genus = speciesData.genera.find((g) => g.language.name === "en")?.genus || "Unknown";

      allPokemonData.push({
        ...pokemon,
        speciesDetails: speciesData,
        index: i,
        species: pokemon.species.name,
        genus: genus,
        weight: pokemon.weight,
        height: pokemon.height,
        abilities: pokemon.abilities,
      });

      renderMyPokemon(pokemon, i);

      let typeContent = document.getElementById(`type${i}`);
      for (let j = 0; j < pokemon.types.length; j++) {
        const element = pokemon.types[j];
        const pokemonType = element.type.name;

        typeContent.innerHTML += /*html*/ `
              <p>${pokemonType}</p>
            `;
      }
    } catch (error) {
      console.error(`Fehler beim Laden der Daten für Pokemon ${i}`, error);
    }
  }
  currentOffset += 25;
  hideLoader();
}

function renderMyPokemon(pokemon, index) {
  const primaryTypeLocal = pokemon.types[0].type.name;
  let pokemonContent = document.getElementById("pokemon_content");

  pokemonContent.innerHTML += getPokemonCards(pokemon, index, primaryTypeLocal);
}

function searchPokemon() {
  let input = document.getElementById("search_field").value.toLowerCase();
  let info = document.getElementById("info_field");
  info.innerHTML = "";

  if (input === "") {
    renderFilteredPokemon(allPokemonData);
    enableButton();
    return;
  }

  if (input.length >= 3) {
    let filteredPokemon = allPokemonData.filter((pokemon) => pokemon && pokemon.name && pokemon.name.toLowerCase().startsWith(input));

    if (filteredPokemon.length > 0) {
      renderFilteredPokemon(filteredPokemon);
    } else {
      console.log("Try another Letter");
      info.innerHTML += /*html*/ `
        <p>Try another Letter!</p>
      `;
    }
  } else if (input.length > 0) {
    info.innerHTML += /*html*/ `
      <p>Please enter at least 3 letters to search!</p>
    `;
  }

  if (input !== "") {
    disableButton();
  } else {
    enableButton();
  }
}

function disableButton() {
  document.getElementById("loadButton").disabled = true;
}

function enableButton() {
  document.getElementById("loadButton").disabled = false;
}

function renderFilteredPokemon(filteredPokemon) {
  const container = document.getElementById("pokemon_content");
  container.innerHTML = "";

  filteredPokemon.forEach((pokemon) => {
    const primaryTypeLocal = pokemon.types[0].type.name;

    container.innerHTML += getFilteredPokemonCards(pokemon, primaryTypeLocal);
  });
}

function showDialogCard(index, name, sprite, id) {
  const pokemon = allPokemonData.find((p) => p.index === index);
  const primaryTypeLocal = pokemon.types[0].type.name;

  if (!pokemon) {
    console.error(`Pokemon mit Index ${index} nicht gefunden.`);
    return;
  }

  let pokemonCard = document.getElementById("pokemon_dialog");

  pokemonCard.innerHTML += getDialogCards(
    index,
    name,
    sprite,
    id,
    pokemon.genus,
    pokemon.weight,
    pokemon.height,
    pokemon.abilities,
    primaryTypeLocal
  );

  document.getElementById("pokemon_dialog").classList.remove("d_none");
  document.getElementById("body_overlay").classList.remove("d_none");

  document.documentElement.style.overflow = "hidden";
  document.body.scroll = "no";

  handleArrowVisibility(index);
}

function navigateCard(newIndex) {
  const pokemon = allPokemonData.find((p) => p.index === newIndex);

  if (pokemon) {
    document.getElementById("pokemon_dialog").innerHTML = "";
    showDialogCard(pokemon.index, pokemon.name, pokemon.sprites.other.showdown.front_shiny, pokemon.id);
  } else {
    console.log("Keine weitere Karte verfügbar.");
  }
}

function handleArrowVisibility(index) {
  if (index === 1) {
    document.getElementById("left_arrow").classList.add("hidden_arrow");
  } else {
    document.getElementById("left_arrow").classList.remove("hidden_arrow");
  }

  if (index === getLastCardIndex()) {
    document.getElementById("right_arrow").classList.add("hidden_arrow");
  } else {
    document.getElementById("right_arrow").classList.remove("hidden_arrow");
  }
}

function getLastCardIndex() {
  return allPokemonData.length;
}

function hideLeftArrow() {
  document.getElementById("left_arrow").classList.add("hidden_arrow");
}

function hideRightArrow() {
  document.getElementById("right_arrow").classList.add("hidden_arrow");
}

function closeDialog() {
  document.getElementById("pokemon_dialog").classList.add("d_none");
  document.getElementById("body_overlay").classList.add("d_none");

  document.documentElement.style.overflow = "scroll";
  document.body.scroll = "yes";
}

function showLoader() {
  document.getElementById("loader_overlay").classList.remove("d_none");
  document.getElementById("loader").classList.remove("d_none");
}

function hideLoader() {
  document.getElementById("loader_overlay").classList.add("d_none");
  document.getElementById("loader").classList.add("d_none");
}

function toggleDarkMode() {
  let contentSection = document.body;
  let headerSection = document.getElementById("header");
  let toggleIcon = document.getElementById("toggle_icon");
  contentSection.classList.toggle("dark_mode");
  headerSection.classList.toggle("dark_mode");
  toggleIcon.classList.toggle("dark_mode_icon");
}

function renderNextCards() {
  if (allPokemonData.length >= 150) {
    console.log("LADE-ENDE");
    alert("There's no more to load");
  } else {
    showLoader();
    getPokemonData();
  }
}
