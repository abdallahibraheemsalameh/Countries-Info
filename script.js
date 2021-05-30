'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const countryy = document.querySelector('.coountryName');
const form = document.querySelector('.form');
const XError = document.getElementById('XError');
const ErrorDiv = document.querySelector('.error');
const errorBackGround = document.querySelector('.errorBackGround');
const errorText = document.querySelector('.errorText');
///////////////////////////////////////
23;
('');
countriesContainer.classList.add('hidden');
ErrorDiv.classList.add('hidden');
errorBackGround.classList.add('hidden');

countryy.focus();

///////////////////

// insert the information to the dom
const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
  <img class="country__img" src=${data.flag} />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(4)} M</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};
const renderError = function (msg) {
  form.insertAdjacentText('beforebegin', msg);
  // countriesContainer.classList.remove('hidden');
};

const ShowError = function (msg) {
  errorText.innerHTML = msg;
  ErrorDiv.classList.remove('hidden');
  form.classList.add('hidden');
  ErrorDiv.style.zIndex = '2';
  errorBackGround.classList.remove('hidden');
  errorBackGround.style.zIndex = '1';
  document.getElementsByTagName('body')[0].style.overflow = 'hidden';
};
const X = function () {
  ErrorDiv.classList.add('hidden');
  form.classList.remove('hidden');
  ErrorDiv.style.zIndex = '-1';
  errorBackGround.classList.add('hidden');
  errorBackGround.style.zIndex = '-2';
  document.getElementsByTagName('body')[0].style.overflow = 'scroll';

  countryy.focus();
};
XError.addEventListener('click', X);
errorBackGround.addEventListener('click', X);

// form submit

form.addEventListener('submit', function (e) {
  console.log(countryy.value);
  const country = countryy.value;

  if (country === 'israel' || country === 'isr') {
    alert('do you mean palestine?');
    return;
  }

  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[2];

      if (!neighbour) return;

      //country 2
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => ShowError(err.message));

  // const request = new XMLHttpRequest();
  // request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  // request.send();

  // // after loading the request
  // request.addEventListener('load', function () {
  //   const [data] = JSON.parse(this.responseText);
  //   console.log(data);
  //   renderCountry(data);
  countriesContainer.classList.remove('hidden');
  // });
  // form.classList.add('hidden');

  e.preventDefault();
});

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
// request.send();

// request.addEventListener('load', function () {
//   const [data] = JSON.parse(this.responseText);
//   console.log(data);
//   const html = `<article class="country">
//   <img class="country__img" src=${data.flag} />
//   <div class="country__data">
//     <h3 class="country__name">${data.name}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👫</span>${(
//       +data.population / 1000000
//     ).toFixed(4)} M</p>
//     <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//     <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//   </div>
// </article>`;

//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// });
