function getPokemonCards(pokemon, index, primaryTypeLocal){
    return `
            <div id="pokeCard${index}" class="new_${primaryTypeLocal}" onclick="showDialogCard(${index}, '${pokemon.name}', '${pokemon.sprites.other.showdown.front_shiny}', ${pokemon.id})">
              <div class="card_content">
                <div class="id_container"><p>#${pokemon.id}</p></div>
                  <div class="name_container"><p>${pokemon.name}</p></div>
                <div class="character_container">
                  <div id="type${index}" class="type_container"></div>
                  <img src="${pokemon.sprites.front_default}" class="responsive_img">
                </div>
              </div>
            </div>
        `; 
}

function getFilteredPokemonCards(pokemon, primaryTypeLocal){
    return `
        <div id="pokeCard${pokemon.index}" class="new_${primaryTypeLocal}" onclick="showDialogCard(${pokemon.index}, '${pokemon.name}', '${pokemon.sprites.other.showdown.front_shiny}', ${pokemon.id})">
          <div class="card_content">
            <div class="id_container"><p>#${pokemon.id}</p></div>
              <div class="name_container"><p>${pokemon.name}</p></div>
            <div class="character_container">
              <div id="type${pokemon.index}" class="type_container">
                ${pokemon.types.map(type => `<p>${type.type.name}</p>`).join('')}
              </div>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="responsive_img">
            </div>
          </div>
        </div>
      `;
}

// ALT:
// function getDialogCards(index, name, sprite, id){
//     return `
//       <div class="dialog">


//           <div class="upper_dialog_container">
            
//           </div>
          
//           <div id="type${index}">Hier kommt noch Typ-Icon rein!</div>

//                 <div>
//                   <p class="dialog_name">${name}</p>
//                   <p class="dialog_id">#${id}</p>
//                   <img class="dialog_img" src="${sprite}">
//                 </div>

//                 <div>
//                   <p>Species:</p>
//                   <p>Height</p>
//                   <p>Weight</p>
//                   <p>Abilities</p>
//                 </div>


//               <div class="arrow_container">
//                 <div id="left_arrow" class="arrow_left" onclick="navigateCard(${index - 1})">
//                   <span></span>
//                   <span></span>
//                   <span></span>
//                 </div>

//                 <div id="right_arrow" class="arrow_right" onclick="navigateCard(${index + 1})">
//                   <span></span>
//                   <span></span>
//                   <span></span>
//                 </div>
//               </div>

//               </div>
//     `;
// }

// NEU:
function getDialogCards(index, name, sprite, id, genus, weight, height, abilities, primaryTypeLocal){
  // const abilitiesHTML = abilities.map((a) => `<li>${a.ability.name}</li>`).join("");
  // const abilitiesHTML = abilities.map((a) => `<p>${a.ability.name}</p>`).join("");
  const abilitiesHTML = abilities.map((a) => `<span>${a.ability.name}</span>`).join(",&nbsp;");

    return `
      <div class="dialog dialog_${primaryTypeLocal}">
        <div id="type${index}">Content</div>
        <div>
          <p class="dialog_id">#${id}</p>
            <p class="dialog_name">${name}</p>
          <img class="dialog_img" src="${sprite}" alt="${name}">
        </div>

        <div class="dialog_about_container">
          <p><b>Species:</b>&nbsp;${genus}</p>
            <p><b>Height:</b>&nbsp;${height} feet</p>
            <p><b>Weight:</b>&nbsp;${weight} pounds</p>
          <p><b>Abilitie(s):</b>&nbsp;${abilitiesHTML}</p>
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
}