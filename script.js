function init() {
  showLoader();
  getPokemonData();
}

let currentOffset = 1;
let pokemonInputValue;
let allPokemonData = [];


async function getPokemonData() {
  for (let i = currentOffset; i < currentOffset + 25; i++) {
    try {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let pokemon = await response.json();

        allPokemonData.push({...pokemon, index: i}); //In globales Array inkl. Indexwerte speichern!!!

        renderMyPokemon(pokemon, i);

        let typeContent = document.getElementById(`type${i}`);
        // let cardElement = document.getElementById(`pokeCard${i}`); //NEU !
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

  //Hier noch Template auslagern:
  pokemonContent.innerHTML += /*html*/ `
            <div id="pokeCard${index}" class="new_${primaryTypeLocal}" onclick="showDialogCard(${index}, '${pokemon.name}', '${pokemon.sprites.other.showdown.front_shiny}', ${pokemon.id})">
              <div class="card_content">
                <div class="id_container"><p>#${pokemon.id}</p></div>
                  <div class="name_container"><p>${pokemon.name}</p></div>
                <div class="character_container">
                  <div id="type${index}" class="type_container"></div>
                  <img class="img_pokemon" src="${pokemon.sprites.front_default}">
                </div>
              </div>
            </div>
        `;    
}


function searchPokemon(){
  let input = document.getElementById('search_field').value.toLowerCase();
  let filteredPokemon = allPokemonData.filter(pokemon => pokemon && pokemon.name && pokemon.name.toLowerCase().startsWith(input));

  if (filteredPokemon.length > 0) {
    renderFilteredPokemon(filteredPokemon);
   } else {
      console.log('Try another Letter');
    }

    if (input !== "") {
      disableButton()
    } else {
      enableButton()
  }
}


  function disableButton() {
    document.getElementById('loadButton').disabled = true;
  }

  function enableButton() {
    document.getElementById('loadButton').disabled = false;
  }


  function renderFilteredPokemon(filteredPokemon) {
    const container = document.getElementById('pokemon_content');
    container.innerHTML = '';
  
    filteredPokemon.forEach(pokemon => {
      const primaryTypeLocal = pokemon.types[0].type.name;

      //Hier noch Template auslagern:
      container.innerHTML += /*html*/ `
        <div id="pokeCard${pokemon.index}" class="new_${primaryTypeLocal}" onclick="showDialogCard(${pokemon.index}, '${pokemon.name}', '${pokemon.sprites.other.showdown.front_shiny}', ${pokemon.id})">
          <div class="card_content">
            <div class="id_container"><p>#${pokemon.id}</p></div>
              <div class="name_container"><p>${pokemon.name}</p></div>
            <div class="character_container">
              <div id="type${pokemon.index}" class="type_container">
                ${pokemon.types.map(type => `<p>${type.type.name}</p>`).join('')}
              </div>
            <img class="img_pokemon" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            </div>
          </div>
        </div>
      `;
    });
  }


  function showDialogCard(index, name, sprite, id) {
    let pokemonCard = document.getElementById("pokemon_dialog");

    //Hier noch Template auslagern:
    pokemonCard.innerHTML = /*html*/ `
      <div class="dialog">


          <div class="upper_dialog_container">
            
          </div>


                <div>
                  <p class="dialog_name">${name}</p>
                  <p class="dialog_id">#${id}</p>
                  <img class="dialog_img" src="${sprite}">
                  <div id="type${index}"></div>
                </div>


              <div class="arrow_container">
                <div id="left_arrow" class="arrow_left" onclick="navigateCard(${index - 1})">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div id="right_arrow" class="arrow_right" onclick="navigateCard(${index + 1})">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>

              </div>
    `;
    document.getElementById("pokemon_dialog").classList.remove("d_none");
    document.getElementById("body_overlay").classList.remove("d_none");
  
    document.documentElement.style.overflow = "hidden";
    document.body.scroll = "no";
  }
  

  //NEU- Code nochmal erklären lassen:
  function navigateCard(newIndex) {
    const pokemon = allPokemonData.find(p => p.index === newIndex);
    console.log(newIndex);
    
    if (pokemon) {
      showDialogCard(
        pokemon.index,
        pokemon.name,
        pokemon.sprites.other.showdown.front_shiny,
        pokemon.id
      );
    } else {
      //Button links/rechts entfernen!?
      console.log("Keine weitere Karte verfügbar.");
      hideLeftArrow();
    }
  }



  function hideLeftArrow(){
    document.getElementById('left_arrow').classList.add("hidden_arrow")
  }

  function hideRightArrow(){
    document.getElementById('right_arrow').classList.add("hidden_arrow")
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