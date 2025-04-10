
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




//Kann evtl raus:
// getTypeColor(cardElement, primaryType);

// function getTypeColor(cardElement, primaryType) {
  //   cardElement.classList.remove(
  //     'card',
  //   );

  //   switch (primaryType) {
  //     case 'grass':
  //       cardElement.classList.add('card_grass');
  //       break;
  //     case 'poison':
  //       cardElement.classList.add('card_poison');
  //       break;
  //     case 'fire':
  //       cardElement.classList.add('card_fire');
  //       break;
  //     case 'water':
  //       cardElement.classList.add('card_water');
  //       break;
  //     case 'bug':
  //       cardElement.classList.add('card_bug');
  //       break;
  //     case 'normal':
  //       cardElement.classList.add('card_normal');
  //       break;
  //     case 'electric':
  //       cardElement.classList.add('card_electric');
  //       break;  
  //     case 'ground':
  //       cardElement.classList.add('card_ground');
  //       break;
  //     case 'fairy':
  //       cardElement.classList.add('card_fairy');
  //       break;
  //     case 'fighting':
  //       cardElement.classList.add('card_fighting');
  //       break;
  //     case 'psychic':
  //       cardElement.classList.add('card_psychic');
  //       break;
  //     case 'rock':
  //       cardElement.classList.add('card_rock');
  //       break; 
  //     case 'ghost':
  //       cardElement.classList.add('card_ghost');
  //       break;
  //     case 'ice':
  //       cardElement.classList.add('card_ice');
  //       break;
  //     case 'dragon':
  //       cardElement.classList.add('card_dragon');
  //       break;
  //     default:
  //       cardElement.classList.add('card'); // Fallback-Klasse WICHTIG!!!
  //       break;
  //   }
  // }



  // const typeIcons = {
  //   bug: './icons/bug.svg',
  //   dark: './icons/dark.svg',
  //   dragon: './icons/dragon.svg',
  //   electric: './icons/electric.svg',
  //   fairy: './icons/fairy.svg',
  //   fighting: './icons/fighting.svg',
  //   fire: './icons/fire.svg',
  //   flying: './icons/flying.svg',
  //   ghost: './icons/ghost.svg',
  //   grass: './icons/grass.svg',
  //   ground: './icons/ground.svg',
  //   ice: './icons/ice.svg',
  //   normal: './icons/normal.svg',
  //   poison: './icons/poison.svg',
  //   psychic: './icons/psychic.svg',
  //   rock: './icons/rock.svg',
  //   steel: './icons/steel.svg',
  //   water: './icons/water.svg',
  // };