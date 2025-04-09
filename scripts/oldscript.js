// Dieser Code kann später raus:
// async function getPokemonData() {
//   for (let i = 1; i <= 25; i++) {
//     let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
//     let response = await fetch(url);
//     let pokemon = await response.json();

//     renderMyPokemon(pokemon, i);

//     for (let j = 0; j < pokemon.types.length; j++) {
//       const element = pokemon.types[j];
//       const pokemonType = element.type.name;

//       let typeContent = document.getElementById(`type${i}`);
//       let cardElement = document.getElementById(`pokeCard${i}`); //NEU !

//       typeContent.innerHTML += /*html*/ `
//         <p>${pokemonType}</p>
//       `;
      
//       const primaryType = pokemon.types[0].type.name; //NEU !
//       getTypeColor(cardElement, primaryType);
//     }
//   }
// }





//Kann später raus:
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