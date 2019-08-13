'use strict';

const input = document.querySelector('.header__input');
const searchBtn = document.querySelector('.header__btn');
const resultsList = document.querySelector('.results__list');
const favsList = document.querySelector('.favs__list');

loadLSFavs();

//FUNCION PARA ESCRIBIR EL CONTENIDO DEL LS
function loadLSFavs() {

  if (JSON.parse(localStorage.getItem('favsRemember'))){
    let savedLS = (JSON.parse(localStorage.getItem('favsRemember')));
    for (const item of savedLS) {
      favsList.innerHTML+=`<li class="favs__item" data-id="${item.id}">
                            <div class="itemShow-wrapper">
                              <img class="favs__item-cover" src="${item.image}" alt="Portada de ${item.title}">
                              <h2 class="favs__item-title">${item.title}</h2>
                            </div>
                          </li>`;
    }
  }
}


function writeTitle (event) {
  const target = event.currentTarget;
  const title = target.querySelector('.itemShow-title');
  console.log(title.innerHTML);
}

//ARRAY QUE VA A ALMACENAR LOS FAVS
let favs = [];

function createFavs (event) {
  const targetShow = event.currentTarget;
  //AL HACER CLICK EN UN RESULTADO SE MARCA COMO FAV CAMBIANDO COLOR DE FUENTE Y FONDO
  targetShow.classList.toggle('show__fav');
  //SI HAY ARRAY EN LS, FAVS ES EL ARRAY GUARDADO
  if (JSON.parse(localStorage.getItem('favsRemember'))) {
    favs=JSON.parse(localStorage.getItem('favsRemember'));
  }
  //CREAR ARRAY CON LOS FAV ALMACENADOS EN UNA VARIABLE
  const favId = targetShow.getAttribute('data-id');
  const favImage = targetShow.querySelector('.itemShow-cover');
  const favImageSrc = favImage.src;
  const favTitle = targetShow.querySelector('.itemShow-title');
  const favTitleName = favTitle.innerHTML;
  const favShow = {
    'id': favId,
    'image': favImageSrc,
    'title': favTitleName
  };
  //PUSH DEL OBJETO AL ARRAY (INCLUDES NO FUNCIONA EN EL OBJETO)
  if (favs.includes(favId) === false) {
    favs.push(favShow);
  } else {
    const i = favs.indexOf(favId);
    if (i > -1) {
      favs.splice(i, 1);
    }
  }
  //PINTAR LOS FAVS EN LA PARTE IZQ DE LA PANTALLA
  //AL BUSCAR DE NUEVO, LOS FAVS SE VAN SUMANDO
  favsList.innerHTML += `<li class="favs__item" data-id="${favShow.id}">
                          <div class="itemShow-wrapper">
                            <img class="favs__item-cover" src="${favShow.image}" alt="Portada de ${favShow.title}">
                            <h2 class="favs__item-title">${favShow.title}</h2>
                          </div>
                        </li>`;
  //ALMACENAMOS FAVS EN LOCAL STORAGE
  localStorage.setItem('favsRemember', JSON.stringify(favs));
}

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
        let showName = item.show.name;
        let showImg = '';
        //SI EL RESULTADO NO TIENE IMG, SE PINTA UNA DE RELLENO
        if (item.show.image === null) {
          showImg = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
        } else {
          showImg = `${item.show.image.medium}`;
        }

        let showGenre = '';
        for (const genre of item.show.genres) {
          showGenre += `<li>${genre}</li>`;
        }
        //CADA UNO SE PINTA EN UNA TARJETA CON IMG Y H2
        showResult += `<li class="results__itemShow" data-id="${showName}">
                          <div class="itemShow-wrapper">                           <img class="itemShow-cover" src="${showImg}" alt="Portada de ${showName}">
                            <h2 class="itemShow-title">${showName}</h2>
                            <ul>${showGenre}</ul>
                          </div>
                       </li>`;
      }
      resultsList.innerHTML = showResult;
      //CREAR ARRAY CON LOS RESULTADOS DE BUSQUEDA
      const resultsArray = document.querySelectorAll('.results__itemShow');
      //RECORRER ARRAY AÑADIENDO LISTENER A CADA ELEMENTO
      for (const item of resultsArray) {
        item.addEventListener('click', writeTitle);
      }
    });
}

//BUSCAR CON ENTER
function enter (event) {
  if (event.keyCode === 13){
    search();
  }
}

//LISTENERS DE BOTON BUSCAR Y ENTER
searchBtn.addEventListener('click', search);
input.addEventListener('keyup', enter);
