function init(){
getPokemonData();
}

async function getPokemonData(){
  for (let i = 1; i <=10; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`
    let response = await fetch(url);
    let pokemon = await response.json();
    console.log(pokemon);

    for (let j = 0; j < pokemon.types.length; j++) {
      const element = pokemon.types[j];
      console.log(element);
  
    renderMyPokemon(pokemon, element);
  }
}




function renderMyPokemon(pokemon, element){
    let pokemonContent = document.getElementById('pokemon_content');
    pokemonContent.innerHTML += /*html*/`
          <div class="card">
            <div class="card_content">
              <p># ${pokemon.id}</p>
              <p>Name: ${pokemon.name}</p>
              <p>Type: ${element.type.name}</p>
              <img src="${pokemon.sprites.front_default}">
            </div>
          </div>
      `;
    }
}
