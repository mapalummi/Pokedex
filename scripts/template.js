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

//Template muss noch fertig gestellt werden:
function getDialogCards(index, name, sprite, id){
    return `
      <div class="dialog">


          <div class="upper_dialog_container">
            
          </div>
          
          <div id="type${index}">Hier kommt noch Typ-Icon rein!</div>

                <div>
                  <p class="dialog_name">${name}</p>
                  <p class="dialog_id">#${id}</p>
                  <img class="dialog_img" src="${sprite}">
                </div>

                <div>
                  <p>Species:</p>
                  <p>Height</p>
                  <p>Weight</p>
                  <p>Abilities</p>
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