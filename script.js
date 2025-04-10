function init() {
  showLoader();
  getPokemonData();
}


let currentOffset = 1;
let pokemonInputValue;

let allPokemonNames = []; //Nur die Namen werden eingespeichert!


async function getPokemonData() {
  for (let i = currentOffset; i < currentOffset + 25; i++) {
    try {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let pokemon = await response.json();

        allPokemonNames.push(pokemon.name); //Pokemon Namen in globales Array speichern!

        renderMyPokemon(pokemon, i);

        let typeContent = document.getElementById(`type${i}`);
        let cardElement = document.getElementById(`pokeCard${i}`); //NEU !

        for (let j = 0; j < pokemon.types.length; j++) {
            const element = pokemon.types[j];
            const pokemonType = element.type.name;

            typeContent.innerHTML += /*html*/ `
              <p>${pokemonType}</p>
            `;
      
            const primaryType = pokemon.types[0].type.name; //NEU !
            getTypeColor(cardElement, primaryType);
        }
    } catch (error) {
        console.error(`Fehler beim Laden der Daten für Pokemon ${i}`, error);
    }
  }
    currentOffset += 25;
    hideLoader();
}



function renderMyPokemon(pokemon, index) {
  let pokemonContent = document.getElementById("pokemon_content");
  pokemonContent.innerHTML += /*html*/ `
            <div id="pokeCard${index}" class="card" onclick="showDialogCard(${index}, '${pokemon.name}', '${pokemon.sprites.other.showdown.front_shiny}', ${pokemon.id})">
              <div class="card_content">
              <div class="id_container"><p>#${pokemon.id}</p></div>
              <div class="name_container"><p>${pokemon.name}</p></div>
              <div id="type${index}" class="type_container"></div>
              <div class="img_container"><img src="${pokemon.sprites.front_default}"></div>
              </div>
            </div>
        `;    
}



function getTypeColor(cardElement, primaryType) {
  cardElement.classList.remove(
    'card',
  );

  switch (primaryType) {
    case 'grass':
      cardElement.classList.add('card_grass');
      break;
    case 'poison':
      cardElement.classList.add('card_poison');
      break;
    case 'fire':
      cardElement.classList.add('card_fire');
      break;
    case 'water':
      cardElement.classList.add('card_water');
      break;
    case 'bug':
      cardElement.classList.add('card_bug');
      break;
    case 'normal':
      cardElement.classList.add('card_normal');
      break;
    case 'electric':
      cardElement.classList.add('card_electric');
      break;  
    case 'ground':
      cardElement.classList.add('card_ground');
      break;
    case 'fairy':
      cardElement.classList.add('card_fairy');
      break;
    case 'fighting':
      cardElement.classList.add('card_fighting');
      break;
    case 'psychic':
      cardElement.classList.add('card_psychic');
      break;
    case 'rock':
      cardElement.classList.add('card_rock');
      break; 
    case 'ghost':
      cardElement.classList.add('card_ghost');
      break;
    case 'ice':
      cardElement.classList.add('card_ice');
      break;
    case 'dragon':
      cardElement.classList.add('card_dragon');
      break;
    default:
      cardElement.classList.add('card'); // Fallback-Klasse WICHTIG!!!
      break;
  }
}



function showDialogCard(index, name, sprite, id) {
  let pokemonCard = document.getElementById("pokemon_dialog");
  pokemonCard.innerHTML = /*html*/ `
    <div class="dialog">
              <div class="">
                <p>${name}</p>
                <p>#${id}</p>
                <img src="${sprite}">
                <div id="type${index}"></div>
              </div>
            </div>
  `;
  document.getElementById("pokemon_dialog").classList.remove("d_none");
  document.getElementById("body_overlay").classList.remove("d_none");

  document.documentElement.style.overflow = "hidden";
  document.body.scroll = "no";
}

function closeDialog() {
  document.getElementById("pokemon_dialog").classList.add("d_none");
  document.getElementById("body_overlay").classList.add("d_none");

  document.documentElement.style.overflow = "scroll";
  document.body.scroll = "yes";
}



function showLoader(){
  document.getElementById("loader_overlay").classList.remove("d_none");
  document.getElementById("loader").classList.remove("d_none");
}

function hideLoader(){
  document.getElementById("loader_overlay").classList.add("d_none");
  document.getElementById("loader").classList.add("d_none");
}

function renderNextCards(){
  showLoader();
  getPokemonData();
}





function searchPokemon(){
  let input = document.getElementById('search_field').value.toLowerCase();
  let filteredPokemon = allPokemonNames.filter(name => name.startsWith(input));

  if (filteredPokemon.length > 0) {
    console.log(filteredPokemon);
    //Renderfunktion gefilterte Pokemons:
   } else {
    //Fehlermeldung für den User integrieren!
      console.log('Kein Pokemon gefunden');
    }
  }
