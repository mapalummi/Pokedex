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
      let cardElement = document.getElementById(`pokeCard${i}`); //NEU !

      typeContent.innerHTML += /*html*/ `
        <p>${pokemonType}</p>
      `;
      
      const primaryType = pokemon.types[0].type.name;
      getTypeColor(cardElement, primaryType);
    }
  }
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




// function getTypeColor(cardElement, pokemonType){
//   console.log(cardElement);
//   console.log(pokemonType);

//   if (pokemonType === 'grass') {
//     cardElement.classList.add("card_green")
//   } else if (pokemonType ==='fire') {
//     cardElement.classList.add("card_red")
//   } else if (pokemonType ==='water'){
//     cardElement.classList.add("card_blue")
//   } else if (pokemonType ==='poison'){
//     cardElement.classList.add("card_pink")
//   }
// }


function getTypeColor(cardElement, primaryType) {
  cardElement.classList.remove(
    'card',
  );

  switch (primaryType) {
    case 'grass':
      cardElement.classList.add('card_green');
      break;
    case 'poison':
      cardElement.classList.add('card_pink');
      break;
    case 'fire':
      cardElement.classList.add('card_red');
      break;
    case 'water':
      cardElement.classList.add('card_blue');
      break;
    case 'bug':
      cardElement.classList.add('card_brown');
      break;
    case 'normal':
      cardElement.classList.add('card_normal');
      break;
    case 'electric':
      cardElement.classList.add('card_yellow');
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
