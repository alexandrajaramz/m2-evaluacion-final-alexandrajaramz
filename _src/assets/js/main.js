'use strict';

const input = document.querySelector('.header__input');
const searchBtn = document.querySelector('.header__btn');
const resultsList = document.querySelector('.results__list');
const favsList = document.querySelector('.favs__list');

//BONUS: BORRAR FAVS DEL LISTADO Y DE LS HACIENDO CLICK EN UNA X
//BONUS: BORRAR TODOS LOS FAVS CON UN BOTON AL FINAL DE LA LISTA

//funcion llamar ls
loadLSFavs();

function loadLSFavs() {
  let savedLS = localStorage.getItem('favsRemember');
  console.log(`El array guardado es ${savedLS}`);
  if (savedLS) {
    savedLS = JSON.parse(savedLS);

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

//array para almacenar favoritos
let favs = [];

function createFavs (event) {
  const targetShow = event.currentTarget;
  //AL HACER CLICK EN UN RESULTADO SE MARCA COMO FAV CAMBIANDO COLOR DE FUENTE Y FONDO
  targetShow.classList.toggle('show__fav');
  //CREAR ARRAY CON LOS FAV ALMACENADOS EN UNA VARIABLE
  const favId = targetShow.getAttribute('data-id');
  const favImage = targetShow.querySelector('.itemShow-cover');
  const favImageSrc = favImage.src;
  const favTitle = targetShow.querySelector('.itemShow-title');
  const favTitleName = favTitle.innerHTML;
  const favShow = {
    id: favId,
    image: favImageSrc,
    title: favTitleName
  };
  //esto no funciona
  if (favs.includes(favId) === false) {
    favs.push(favShow);
  } else {
    const i = favs.indexOf(favId);
    if (i > -1) {
      favs.splice(i, 1);
    }
  }
  console.log(favs);
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
        //CADA UNO SE PINTA EN UNA TARJETA CON IMG Y H2
        showResult += `<li class="results__itemShow" data-id="${showName}">
                          <div class="itemShow-wrapper">                           <img class="itemShow-cover" src="${showImg}" alt="Portada de ${showName}">
                            <h2 class="itemShow-title">${showName}</h2>
                          </div>
                       </li>`;
      }
      resultsList.innerHTML = showResult;
      //creamos array de los resultados
      const resultsArray = document.querySelectorAll('.results__itemShow');
      //lo recorremos añadiéndoles un listener
      for (const item of resultsArray) {
        item.addEventListener('click', createFavs);
      }
    });
}

function enter (event) {
  if (event.keyCode === 13){
    search();
  }
}
//CLICK BOTÓN BUSCAR
searchBtn.addEventListener('click', search);
input.addEventListener('keyup', enter);
