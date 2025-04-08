function init() {
  getPokemonData();
}

async function getPokemonData() {
  for (let i = 1; i <= 25; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let pokemon = await response.json();

    renderMyPokemon(pokemon, i);

    for (let j = 0; j < pokemon.types.length; j++) {
      const element = pokemon.types[j];
      const pokemonType = element.type.name;

      let typeContent = document.getElementById(`type${i}`);
      typeContent.innerHTML += /*html*/ `
        <p>${pokemonType}</p>
      `;
      
      getTypeColor(pokemonType);
    }
  }
}

function renderMyPokemon(pokemon, index) {
  let pokemonContent = document.getElementById("pokemon_content");
  pokemonContent.innerHTML += /*html*/ `
            <div id="pokeCard" class="card_white" onclick="showDialogCard(${index}, '${pokemon.name}', '${pokemon.sprites.other.showdown.front_shiny}', ${pokemon.id})">
              <div class="card_content">
              <div class="id_container"><p>#${pokemon.id}</p></div>
              <div class="name_container"><p>${pokemon.name}</p></div>
              <div id="type${index}" class="type_container"></div>
              <div class="img_container"><img src="${pokemon.sprites.front_default}"></div>
              </div>
            </div>
        `;

        
}

//Funktioniert noch nicht richtig:
function getTypeColor(pokemonType){
  let typeColor = pokemonType;
  console.log(pokemonType);

  let standardClass = document.getElementById('pokeCard')

  if (typeColor === 'grass') {
    console.log('Background grün färben');
    standardClass.classList.add("card_green")
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










// Kann evtl raus:
// document.addEventListener('DOMContentLoaded', (event) => {
//   let element = document.getElementById("type${index}");
//   let text = element.textContent || element.innerText;

//   if (text.includes("grass")) {
//       element.classList.add("card_green");
//       element.classList.remove("card_white");
//   } else {
//       element.classList.add("card_white");
//       element.classList.remove("card_green");
//   }
// });