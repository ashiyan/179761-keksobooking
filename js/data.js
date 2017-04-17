/* Генерирует и возвращает объект/массив обьявлений с данными */

/* global map */

'use strict';

window.data = (function () {

  var adList = [];

  var information = {
    title: [
      'Большая уютная квартира', 'Маленькая неуютная квартира',
      'Огромный прекрасный дворец', 'Маленький ужасный дворец',
      'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'
    ],
    type: {
      en: ['flat', 'house', 'bungalo'],
      ru: ['Квартира', 'Дом', 'Бунгало']
    },
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator',
      'conditioner']
  };

  /* ---------------------------------------------------------------------------
   * Генерирует и возвращает случайное число в заданном диапазоне
   * @param {number} - минимальное значение
   * @param {number} - максимальное значение
   */
  function getRandomNumber(min, max) {
    var number = Math.floor(Math.random() * (max - min + 1)) + min;
    return number;
  }

  /* ---------------------------------------------------------------------------
   * Генерирует и возвращает путь к аватарке объявления по его индексу
   * @param {number} - индекс объявления
   */
  function getAvatarSrc(index) {
    var src = 'img/avatars/user0' + (index + 1) + '.png';
    return src;
  }

  /* ---------------------------------------------------------------------------
   * Генерирует и возвращает заголовок объявления по его индексу
   * @param {number} - индекс объявления
   */
  function getTitle(index) {
    var title = information.title[index];
    return title;
  }

  /* ---------------------------------------------------------------------------
   * Генерирует и возвращает объект с типами жилья на разных языках
   */
  function getType() {
    var randomIndex = getRandomNumber(0, 2);
    var type = {
      en: information.type.en[randomIndex],
      ru: information.type.ru[randomIndex]
    };
    return type;
  }

  /* ---------------------------------------------------------------------------
   * Генерирует и возвращает объект с временем заезда и выезда
   */
  function getTime() {
    var time = {
      checkin: getRandomNumber(12, 14) + ':00',
      checkout: getRandomNumber(12, 14) + ':00'
    };
    return time;
  }

  /* ---------------------------------------------------------------------------
   * Генерирует и возвращает массив с перечислением удобств
   */
  function getFeatures() {
    var features;
    function randomFeature(feature) {
      return getRandomNumber(0, 1);
    }
    features = information.features.filter(randomFeature);
    return features;
  }

  /* ---------------------------------------------------------------------------
   * Генерирует и возвращает обьект местоположения жилья с координатным
   * и текстовым вариантами
   */
  function getLocation() {
    var xCoord = getRandomNumber(map.getBorder().left, map.getBorder().right);
    var yCoord = getRandomNumber(map.getBorder().top + 19, map.getBorder().bottom);
    var textCoords = (xCoord + 28 - 37) + ', ' + (yCoord + 75 - 94);

    var location = {
      coords: {
        x: xCoord,
        y: yCoord
      },
      text: textCoords
    };

    return location;
  }

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Инициализирует массив нужной величины с объектами обьявлений
     * @param {number} - количество обьявлений
     */
    init: function (count) {
      for (var i = 0; i < count; i++) {
        var location = getLocation();

        adList[i] = {
          id: i,

          author: {
            avatar: getAvatarSrc(i)
          },

          offer: {
            title: getTitle(i),
            address: location.text,
            price: getRandomNumber(10, 10000) * 100,
            type: getType(),
            rooms: getRandomNumber(1, 5),
            guests: getRandomNumber(0, 3),
            checkin: getTime().checkin,
            checkout: getTime().checkout,
            features: getFeatures(),
            description: '',
            photos: []
          },

          location: location.coords
        };
      }
    },

    /* -------------------------------------------------------------------------
     * Возвращает объект обьявления по индексу
     * @param {number} - индекс обьявления
     */
    getAd: function (index) {
      return adList[index];
    },

    /* -------------------------------------------------------------------------
     * Возвращает массив с объектами обьявлений
     */
    getAdList: function () {
      return adList;
    }

  };

})();
