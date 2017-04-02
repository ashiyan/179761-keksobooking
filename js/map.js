'use strict';

// ----- ПЕРЕМЕННЫЕ

var ads = [];                                  // объявления
var adsCount = 8;                              // количество объявлений
var placeTitles = [                            // названия жилья
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var placeTypesEn = ['flat', 'house', 'bungalo']; // виды жилья на английском
var placeTypesRu = {                             // виды жилья на русском
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

// ----- ФУНКЦИИ

/*
 * Генерирует массив строковых значений,
 * взятых случайным образом из начального набора
 *
 * @return {Array.<string>} - сформированный массив
 */
var placeFeatures = function () {
  var result = [];
  var featuresList = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  for (var i = 0; i < featuresList.length; i++) {
    if (random(0, 1)) {
      result.push(featuresList[i]);
    }
  }

  return result;
};

/*
 * Генерирует случайное число в пределах от min до max (включительно)
 *
 * @param {number} min  - минимальное значение
 * @param {number} max  - максимальное значение
 * @return {number}     - сгенерированное случайное число
 */
var random = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


// ----- ОСНОВНОЙ КОД


// Создание массива объектов, описывающих объявления
for (var i = 0; i < adsCount; i++) {
  ads[i] = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'  // адрес изображения
    },

    offer: {
      title: placeTitles[i],                          // заголовок объявления
      price: random(10, 10000) * 100,                 // цена предложения
      type: placeTypesEn[random(0, 2)],               // тип жилья
      rooms: random(1, 5),                            // количество комнат
      guests: random(1, 3),                           // количество гостей, которое можно разместить
      checkin: random(12, 14) + ':00',                // время заезда (после)
      checkout: random(12, 14) + ':00',               // время выезда (до)
      features: placeFeatures(),                      // список удобств
      description: '',                                // описание
      photos: []                                      // фотографии
    },

    location: {
      x: random(300, 900) + 20,                       // расположение на карте по горизонтали
      y: random(100, 500) + 40                        // расположение на карте по вертикали
    }
  };

  ads[i].offer.address =
    ads[i].location.x + ', ' + ads[i].location.y;     // адрес квартиры
}


// Создание и отрисовка DOM-элементов, соответствующих меткам на карте
var map = document.querySelector('.tokyo__pin-map');
var setOfPins = document.createDocumentFragment();

for (var j = 0; j < adsCount; j++) {
  var pin = document.createElement('div');
  pin.className = 'pin';
  pin.style.left = ads[j].location.x + 'px';
  pin.style.top = ads[j].location.y + 'px';

  var pinAvatar = document.createElement('img');
  pinAvatar.src = ads[j].author.avatar;
  pinAvatar.className = 'rounded';
  pinAvatar.width = '40';
  pinAvatar.height = '40';

  pin.appendChild(pinAvatar);
  setOfPins.appendChild(pin);
}

map.appendChild(setOfPins);


// Создание DOM-элемента с данными объявления на основе шаблона #lodge-template
var lodgeTemplate = document.querySelector('#lodge-template');
var lodge = lodgeTemplate.content.cloneNode(true);
lodge.firstElementChild.children[0].textContent = ads[0].offer.title;
lodge.firstElementChild.children[1].textContent = ads[0].offer.address;
lodge.firstElementChild.children[2].innerHTML = ads[0].offer.price + '&#x20bd;/ночь';
lodge.firstElementChild.children[3].textContent = placeTypesRu[ads[0].offer.type];
lodge.firstElementChild.children[4].textContent = 'Для ' + ads[0].offer.guests + ' гостей в ' + ads[0].offer.rooms + ' комнатах';
lodge.firstElementChild.children[5].textContent = 'Заезд после ' + ads[0].offer.checkin + ', выезд до ' + ads[0].offer.checkout;
var setOfFeatures = document.createDocumentFragment();
for (var n = 0; n < ads[0].offer.features.length; n++) {
  var feature = document.createElement('span');
  feature.classList.add('feature__image');
  feature.classList.add('feature__image--' + ads[0].offer.features[n]);
  setOfFeatures.appendChild(feature);
}
lodge.firstElementChild.children[6].appendChild(setOfFeatures);
lodge.firstElementChild.children[7].textContent = ads[0].offer.description;


// Замена блока .dialog__panel созданным DOM-элементом
var dialogPanel = document.querySelector('.dialog__panel');
var dialogParent = dialogPanel.parentNode;
dialogParent.replaceChild(lodge, dialogPanel);


// Замена адреса аватарки из блока .dialog__title на адрес аватарки отрисовываемого объекта.
document.getElementById('offer-dialog').getElementsByTagName('img')[0].src = ads[0].author.avatar;
