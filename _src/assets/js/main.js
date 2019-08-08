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
      let showResult = '';
      for (const item of data) {
        console.log(item.show);
        let showName = item.show.name;
        let showImg = '';

        //SI EL RESULTADO NO TIENE IMG, SE PINTA UNA DE RELLENO
        if (item.show.image === null) {
          showImg = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
        } else {
          showImg = `${item.show.image.medium}`;
        }
        //CADA UNO SE PINTA EN UNA TARJETA CON IMG Y H2
        showResult += `<li class="results__itemShow">
                          <div class="itemShow-wrapper">                           <img class="itemShow-cover" src="${showImg}" alt="Portada de ${showName}">
                            <h2 class="itemShow-title">${showName}</h2>
                          </div>
                       </li>`;
      }
      resultsList.innerHTML = showResult;
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
