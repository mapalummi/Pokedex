function init(){
  getPokemonData();
}


async function getPokemonData(){
  for (let i = 1; i <=25; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`
    let response = await fetch(url);
    let pokemon = await response.json();
    console.log(pokemon);

    renderMyPokemon(pokemon, i);

    for (let j = 0; j < pokemon.types.length; j++) {
      const element = pokemon.types[j];
      const pokemonType = element.type.name;
      console.log(pokemonType);

      let typeContent = document.getElementById(`type${i}`);
      typeContent.innerHTML += /*html*/`
        <p>${pokemonType}</p>
      `
    }
  }
}


function renderMyPokemon(pokemon, index){
      let pokemonContent = document.getElementById('pokemon_content');
      pokemonContent.innerHTML += /*html*/`
            <div class="card">
              <div class="card_content">
                <p># ${pokemon.id}</p>
                <p>Name: ${pokemon.name}</p>
                <div id="type${index}">Type:</div>
                <img src="${pokemon.sprites.front_default}">
              </div>
            </div>
        `;  
}