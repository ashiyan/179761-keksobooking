'use strict';

(function () {


  // ----- ПЕРЕМЕННЫЕ

  var ads = [];                                  // объявления
  var adsCount = 8;                              // количество объявлений


  // ----- ФУНКЦИИ

  /*
   * Генерирует случайное число в пределах от min до max (включительно)
   *
   * @param {number} min  - минимальное значение
   * @param {number} max  - максимальное значение
   * @return {number}     - сгенерированное случайное число
   */
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /*
   * Возвращает заголовок объявления
   *
   * @param {number} - номер объявления
   * @return {string} - заголовок объявления
   */
  function getPlaceTitle(adNumber) {
    // список заголовков
    var placeTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира',
      'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик',
      'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
    return placeTitles[adNumber];
  }

  /*
   * Возвращает тип жилья
   *
   * @return {string} - тип жилья
   */
  function getPlaceType() {
    var placeTypesEn = ['flat', 'house', 'bungalo']; // виды жилья
    var index = random(0, 2);
    return placeTypesEn[index];
  }

  /*
   * Переводит тип жилья на русский язык
   *
   * @return {string} - тип жилья на русском языке
   */
  function translatePlaceType(englishType) {
    var translate = {    // виды жилья на русском
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    };
    return translate[englishType];
  }

  /*
   * Генерирует массив строковых значений,
   * взятых случайным образом из начального набора
   *
   * @return {Array.<string>} - сформированный массив
   */
  function getPlaceFeatures() {
    var result = [];
    var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

    for (var i = 0; i < featuresList.length; i++) {
      if (random(0, 1)) {
        result.push(featuresList[i]);
      }
    }

    return result;
  }

  /*
   * Создает объект объявления
   *
   * @param {number} - номер объявления
   * @return {Object} - созданный объект
   */
  function createAdObject(adNumber) {
    var newAd = {
      author: {
        avatar: 'img/avatars/user0' +       // адрес изображения
          (adNumber + 1) + '.png'
      },

      offer: {
        title: getPlaceTitle(adNumber),     // заголовок объявления
        price: random(10, 10000) * 100,     // цена предложения
        type: getPlaceType(),               // тип жилья
        rooms: random(1, 5),                // количество комнат
        guests: random(1, 3),               // количество гостей, которое можно разместить
        checkin: random(12, 14) + ':00',    // время заезда (после)
        checkout: random(12, 14) + ':00',   // время выезда (до)
        features: getPlaceFeatures(),       // список удобств
        description: '',                    // описание
        photos: []                          // фотографии
      },

      location: {
        x: random(300, 900) + 20,           // расположение на карте по горизонтали
        y: random(100, 500) + 40            // расположение на карте по вертикали
      }
    };

    newAd.offer.address =                   // адрес квартиры
      newAd.location.x + ', ' + newAd.location.y;

    return newAd;
  }

  /*
   * Создает и возвращает DOM-фрагмент,
   * объединяющий узлы с данными всех созданных объявлений
   *
   * @return {DocumentFragment} - фрагмент с данными объявлений для вставки в HTML
   */
  function createAdsFragment() {
    var fragment = document.createDocumentFragment();

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
      fragment.appendChild(pin);
    }
    return fragment;
  }

  /*
   * Создает и возвращает DOM-фрагмент с удобствами определенного объявления
   *
   * @param {Object} - объект объявления
   * @return {DocumentFragment} - фрагмент с данными для вставки в HTML
   */
  function createFeaturesFragment(adObject) {
    var fragment = document.createDocumentFragment();
    for (var n = 0; n < adObject.offer.features.length; n++) {
      var feature = document.createElement('span');
      feature.classList.add('feature__image');
      feature.classList.add('feature__image--' + adObject.offer.features[n]);
      fragment.appendChild(feature);
    }
    return fragment;
  }

  /*
   * Создает узел, состоящий из данных конкретного объявления и возвращает его для дальнейшей обработки
   *
   * @param {HTMLTemplateElement.content} - шаблон, на основании которого создается узел
   * @param {Object} - объект объявления для вставки его данных в узел
   * @return {DocumentFragment} - узел с данными персонажа для дальнейшего объединения в фрагменте
   */
  function createAdNode(template, adObject) {
    var adNode = template.cloneNode(true);
    adNode.querySelector('.lodge__title').textContent = adObject.offer.title;
    adNode.querySelector('.lodge__address').textContent = adObject.offer.address;
    adNode.querySelector('.lodge__price').innerHTML = adObject.offer.price + '&#x20bd;/ночь';
    adNode.querySelector('.lodge__type').textContent = translatePlaceType(adObject.offer.type);
    adNode.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + adObject.offer.guests + ' гостей в ' + adObject.offer.rooms + ' комнатах';
    adNode.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + adObject.offer.checkin + ', выезд до ' + adObject.offer.checkout;
    var setOfFeatures = createFeaturesFragment(adObject);
    adNode.querySelector('.lodge__features').appendChild(setOfFeatures);
    adNode.querySelector('.lodge__description').textContent = adObject.offer.description;
    return adNode;
  }


  // ----- ОСНОВНОЙ КОД


  // Создание массива объектов, описывающих объявления
  for (var i = 0; i < adsCount; i++) {
    ads[i] = createAdObject(i);
  }

  // Создание DOM-элементов, соответствующих меткам на карте
  // на основе созданного массива объектов
  var map = document.querySelector('.tokyo__pin-map');
  var setOfPins = createAdsFragment();

  // Отрисовка этих DOM-элементов
  map.appendChild(setOfPins);

  // Получение шаблона для создание узла с данными объявления
  var lodgeTemplate = document.querySelector('#lodge-template').content;

  // Создание узла на основе шаблона
  var lodgeNode = createAdNode(lodgeTemplate, ads[0]);

  // Замена блока .dialog__panel созданным узлом
  var dialogPanel = document.querySelector('.dialog__panel');
  var dialogParent = dialogPanel.parentNode;
  dialogParent.replaceChild(lodgeNode, dialogPanel);

  // Замена адреса аватарки из блока .dialog__title на адрес аватарки отрисовываемого объекта.
  document.getElementById('offer-dialog').getElementsByTagName('img')[0].src = ads[0].author.avatar;

})();
