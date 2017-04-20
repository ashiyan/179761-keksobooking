/* Generates and returns a single object or array of ads data */

/* global map, pin */

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
   * Generates and returns a random number in a range
   * @param {number} - min value
   * @param {number} - max value
   * @return {number}
   */
  function getRandomNumber(min, max) {
    var number = Math.floor(Math.random() * (max - min + 1)) + min;
    return number;
  }

  /* ---------------------------------------------------------------------------
   * Generates and returns the path to the ad's avatar through ad's index
   * @param {number} - ad's index
   * @return {string}
   */
  function getAvatarSrc(index) {
    var src = 'img/avatars/user0' + (index + 1) + '.png';
    return src;
  }

  /* ---------------------------------------------------------------------------
   * Generates and returns the ad's title by ad's index
   * @param {number} - ad's index
   * @return {string}
   */
  function getTitle(index) {
    var title = information.title[index];
    return title;
  }

  /* ---------------------------------------------------------------------------
   * Generates and returns an object with lodge types in EN & RU languages
   * @return {Object}
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
   * Generates and returns an object with the time of arrival and departure
   * @return {Object}
   */
  function getTime() {
    var time = {
      checkin: getRandomNumber(12, 14) + ':00',
      checkout: getRandomNumber(12, 14) + ':00'
    };
    return time;
  }

  /* ---------------------------------------------------------------------------
   * Generates and returns an array with a list of features
   * @return {Array<string>}
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
   * Generates and returns a location object with coordinates and a text string
   * @return {Object}
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

  /* ---------------------------------------------------------------------------
   * Generates random ad's data
   */
  function generateRandomData() {
    for (var i = 0; i < 8; i++) {
      var location = getLocation();

      adList[i] = {
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
  }

  /* ---------------------------------------------------------------------------
   * Processes the response from the server
   * @param {Object} - event object
   */
  function getAnswerHandler(event) {
    /* Waiting for a response from the server */
    if (event.target.readyState === 4) {
      var map = document.querySelector('.tokyo');
      var message = '';

      switch (event.target.status) {
        case 200:
          /* If the query is successful, save the data and draw the pins */
          message = 'Данные успешно получены!';
          adList = JSON.parse(event.target.responseText);
          break;
        default:
          /* With any error, generate random data for drawing */
          message = 'Сервер не отвечает, данные сформированы случайным образом.';
          generateRandomData();
      }

      window.popup(map, message);
      pin.draw();
    }
  }

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Make a request to the server to get the initial data
     */
    init: function () {
      var requestUrl = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';
      window.load(requestUrl, getAnswerHandler);
    },

    /* -------------------------------------------------------------------------
     * Returns the ad object by his index
     * @param {number} - ad's index
     * @return {Object}
     */
    getAd: function (index) {
      return adList[index];
    },

    /* -------------------------------------------------------------------------
     * Returns the ad object by coords
     * @param {number} - object with coords
     * @return {Object}
     */
    getAdByLocation: function (coords) {
      var result = {};
      adList.forEach(function (ad) {
        if (ad.location.x === coords.x && ad.location.y === coords.y) {
          result = ad;
        }
      });
      return result;
    },

    /* -------------------------------------------------------------------------
     * Returns an array with the ad objects
     * @return {Array<Object>}
     */
    getAdList: function () {
      return adList;
    }

  };

})();
