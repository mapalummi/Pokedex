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

// Alte Funktion:
// function renderMyPokemon(pokemon, index) {
//   let pokemonContent = document.getElementById("pokemon_content");
//   pokemonContent.innerHTML += /*html*/ `
//             <div id="pokeCard${index}" class="new_${primaryType}" onclick="showDialogCard(${index}, '${pokemon.name}', '${pokemon.sprites.other.showdown.front_shiny}', ${pokemon.id})">
//               <div class="card_content">
//               <div class="id_container"><p>#${pokemon.id}</p></div>
//               <div class="name_container"><p>${pokemon.name}</p></div>
//               <div id="type${index}" class="type_container"></div>
//               <div class="img_container"><img src="${pokemon.sprites.front_default}"></div>
//               </div>
//             </div>
//         `;    
// }


//Neu:
function renderMyPokemon(pokemon, index) {
  const primaryTypeLocal = pokemon.types[0].type.name;
  let pokemonContent = document.getElementById("pokemon_content");
  pokemonContent.innerHTML += /*html*/ `
            <div id="pokeCard${index}" class="new_${primaryTypeLocal}" onclick="showDialogCard(${index}, '${pokemon.name}', '${pokemon.sprites.other.showdown.front_shiny}', ${pokemon.id})">
              <div class="card_content">
              <div class="id_container"><p>#${pokemon.id}</p></div>
              <div class="name_container"><p>${pokemon.name}</p></div>
              <div id="type${index}" class="type_container"></div>
              <div class="img_container"><img src="${pokemon.sprites.front_default}"></div>
              </div>
            </div>
        `;    
}

//Alte Funktion:
// function searchPokemon(){
//   let input = document.getElementById('search_field').value.toLowerCase();
//   let filteredPokemon = allPokemonData.filter(pokemon => pokemon && pokemon.name && pokemon.name.toLowerCase().startsWith(input));

//   if (filteredPokemon.length > 0) {
//     renderFilteredPokemon(filteredPokemon);
//    } else {
//     //Fehlermeldung für den User integrieren!
//       console.log('Kein Pokemon gefunden');
//     }
//   }


//TEST:
function searchPokemon(){
  let input = document.getElementById('search_field').value.toLowerCase();
  let filteredPokemon = allPokemonData.filter(pokemon => pokemon && pokemon.name && pokemon.name.toLowerCase().startsWith(input));

  if (filteredPokemon.length > 0) {
    renderFilteredPokemon(filteredPokemon);
   } else {
    //Fehlermeldung für den User integrieren!
      console.log('Kein Pokemon gefunden');
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


//Alte Funktion:
  // function renderFilteredPokemon(filteredPokemon) {
  //   const container = document.getElementById('pokemon_content');
  //   container.innerHTML = '';
  
  //   filteredPokemon.forEach(pokemon => {
  //     container.innerHTML += /*html*/ `
  //       <div id="pokeCard${pokemon.index}" class="new_${primaryType}" onclick="showDialogCard(${pokemon.index}, '${pokemon.name}', '${pokemon.sprites.other.showdown.front_shiny}', ${pokemon.id})">
  //         <div class="card_content">
  //           <div class="id_container"><p>#${pokemon.id}</p></div>
  //           <div class="name_container"><p>${pokemon.name}</p></div>
  //           <div id="type${pokemon.index}" class="type_container">
  //             ${pokemon.types.map(type => `<p>${type.type.name}</p>`).join('')}
  //           </div>
  //           <div class="img_container"><img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"></div>
  //         </div>
  //       </div>
  //     `;
  //   });
  // }


  //Neu:
  function renderFilteredPokemon(filteredPokemon) {
    const container = document.getElementById('pokemon_content');
    container.innerHTML = '';
  
    filteredPokemon.forEach(pokemon => {
      const primaryTypeLocal = pokemon.types[0].type.name;
      container.innerHTML += /*html*/ `
        <div id="pokeCard${pokemon.index}" class="new_${primaryTypeLocal}" onclick="showDialogCard(${pokemon.index}, '${pokemon.name}', '${pokemon.sprites.other.showdown.front_shiny}', ${pokemon.id})">
          <div class="card_content">
            <div class="id_container"><p>#${pokemon.id}</p></div>
            <div class="name_container"><p>${pokemon.name}</p></div>
            <div id="type${pokemon.index}" class="type_container">
              ${pokemon.types.map(type => `<p>${type.type.name}</p>`).join('')}
            </div>
            <div class="img_container"><img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"></div>
          </div>
        </div>
      `;
    });
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