function init(){
  getPokemonData();
}


async function getPokemonData(){
  for (let i = 1; i <=25; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`
    let response = await fetch(url);
    let pokemon = await response.json();

    renderMyPokemon(pokemon, i);

    for (let j = 0; j < pokemon.types.length; j++) {
      const element = pokemon.types[j];
      const pokemonType = element.type.name;

      let typeContent = document.getElementById(`type${i}`);
      typeContent.innerHTML += /*html*/`
        <p>${pokemonType}</p>
      `
      // let typeDialogContent = document.getElementById(`typeDialog${i}`);
      // typeDialogContent.innerHTML += /*html*/`
      //   <p>${pokemonType}</p>
      // `
    }
  }
}


function renderMyPokemon(pokemon, index){
      let pokemonContent = document.getElementById('pokemon_content');
      pokemonContent.innerHTML += /*html*/`
            <div class="card" onclick="showCard(${index}, '${pokemon.name}', '${pokemon.sprites.other.showdown.front_shiny}', ${pokemon.id})">
              <div class="card_content">
                <p>#${pokemon.id}</p>
                <p>${pokemon.name}</p>
                <div id="type${index}"></div>
                <img src="${pokemon.sprites.front_default}">
              </div>
            </div>
        `;  
}


function showCard(index, name, sprite, id){
  let pokemonCard = document.getElementById('pokemon_dialog');
  pokemonCard.innerHTML = /*html*/`
    <div class="dialog">
              <div class="">
                <p>${name}</p>
                <p>#${id}</p>
                <img src="${sprite}">
                <div id="type${index}"></div>
              </div>
            </div>
  `
    document.getElementById("pokemon_dialog").classList.remove("d_none");
    document.getElementById("body_overlay").classList.remove("d_none");

    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no";
  }

  function closeDialog() {
    document.getElementById("pokemon_dialog").classList.add("d_none");
    document.getElementById("body_overlay").classList.add("d_none");

    document.documentElement.style.overflow = 'scroll';
    document.body.scroll = "yes";
  }