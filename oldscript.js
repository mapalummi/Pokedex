// function init() {
//     // fetchPokemonJson()
//     fetchPokemonList()
//   }
  
  
  // async function fetchPokemonJson() {
  //   let pokeDatas = await fetch("https://pokeapi.co/api/v2/pokemon/bulbasaur");
  //   let pokemons = await pokeDatas.json();
  //   // console.log(pokemons);
  
  //   displayPokemon(pokemons);
  // }
  
  // function displayPokemon(pokemons){
  //   let pokemonContent = document.getElementById('content');
  //   pokemonContent.innerHTML = "";
  
  //   pokemonContent.innerHTML += /*html*/`
  //           <p>${pokemons.name}</p>
  //           <img src="${pokemons.sprites.front_default}" alt="${pokemons.name}">
  //       `;
  // }
  
  
  
  // async function fetchPokemonList() {
  //   let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");
  //   let data = await response.json();
  //   let pokemonList = data.results;
  
  //   // Hole die Details für jedes Pokémon
  //   for (let i = 0; i < pokemonList.length; i++) {
  //     let pokemon = pokemonList[i];
  //     await fetchPokemonDetails(pokemon.url);
  //   }
  // }
  

  
  // async function fetchPokemonDetails(pokemonUrl) {
  //   let response = await fetch(pokemonUrl);
  //   let pokemon = await response.json();
  //   displayPokemon(pokemon);
  // }
  


  // function displayPokemon(pokemon) {
  //   let pokemonContent = document.getElementById('pokemon_content');
    
  //   // Hier wird der Name und das Sprite des Pokémon angezeigt
  //   pokemonContent.innerHTML += /*html*/`
  //       <div class="pokemon_card">
  //         <div>
  //           <p>${pokemon.name}</p>
  //         </div>
  //         <div>
  //           <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
  //         </div>
  //       </div>
  //   `;
  // }
  
  
  
  // function renderImages() {
  //   let contentRef = document.getElementById("content");
  //   for (let i = 0; i < images.length; i++) {
  //     contentRef.innerHTML += getImages(i);
  //   }
  // }
  
  // function fullSizeImages(i) {
  //   let imgRef = document.getElementById("img_dialog");
  //   imgRef.innerHTML = getFullSizeImage(i);
  
  //   if (i <= 0) {
  //     document.getElementById("d_left_button").classList.add("d_none");
  //   }
  
  //   if (i >= 11) {
  //     document.getElementById("d_right_button").classList.add("d_none");
  //   }
  
  //   document.getElementById("img_dialog").classList.remove("d_none");
  //   document.getElementById("body_overlay").classList.remove("d_none");
  // }
  
  // function closeDialog() {
  //   document.getElementById("img_dialog").classList.add("d_none");
  //   document.getElementById("body_overlay").classList.add("d_none");
  // }
  
  // function leftButtonClick(i) {
  //   let leftButtonRef = document.getElementById("img_dialog");
  //   leftButtonRef.innerHTML = leftButton(i)
  
  //   if (i <= 1) {
  //     document.getElementById("d_left_button").classList.add("d_none");
  //   }
  // }
  
  // function rightButtonClick(i) {
  //   let rightButtonRef = document.getElementById("img_dialog");
  //   rightButtonRef.innerHTML = rightButton(i);
  
  //   if (i >= 11) {
  //     document.getElementById("d_right_button").classList.add("d_none");
  //   }
  // }