'use strict';

console.log('>> Ready :)');

const input = document.querySelector('.header__input');
const searchBtn = document.querySelector('.header__btn');
const resultsList = document.querySelector('.results__list');


function search () {
  let inputValue = input.value;
  const endpoint = `http://api.tvmaze.com/search/shows?q=${inputValue}`;
  //PETICION API
  fetch(endpoint)
  //DEVUELVE RESULTADOS
    .then(response => response.json())
    .then(data => {
      //CADA UNO SE PINTA EN UNA TARJETA CON IMG Y H2
      //console.log(data);
      let showResult = '';
      for (const item of data) {
        console.log(item.show);
        console.log(item.show.name);
        console.log(item.show.image.medium);

        showResult += `<li class="results__itemShow">
                          <div class="itemShow-wrapper">                           <img class="itemShow-cover" src="${item.show.image.medium}" alt="Portada de ${item.show.name}">
                            <h2 class="itemShow-title">${item.show.name}</h2>
                          </div>
                       </li>`;
      }
      resultsList.innerHTML = showResult;
      //SI EL RESULTADO NO TIENE IMG, SE PINTA UNA DE RELLENO
      //if else
    });

}

//CLICK BUSCAR
searchBtn.addEventListener('click', search);



//AL HACER CLICK EN UN RESULTADO SE MARCA COMO FAV CAMBIANDO COLOR DE FUENTE Y FONDO
//CREAR ARRAY CON LOS FAV ALMACENADO EN UNA VARIABLE
//PINTAR LOS FAVS EN LA PARTE IZQ DE LA PANTALLA
//AL BUSCAR DE NUEVO, LOS FAVS SE VAN SUMANDO
//ALMACENAMOS FAVS EN LOCAL STORAGE

//BONUS: BORRAR FAVS DEL LISTADO Y DE LS HACIENDO CLICK EN UNA X
//BORRAR TODOS LOS FAVS CON UN BOTON AL FINAL DE LA LISTA
