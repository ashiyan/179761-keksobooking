'use strict';

(function () {


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                  ГЕНЕРАЦИЯ ОБЪЯВЛЕНИЙ И МЕТОК НА КАРТЕ
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


  /* ---------------------------------------------------------------------------
   * Генерирует случайное число в пределах от min до max (включительно)
   *
   * @param {number} min  - минимальное значение
   * @param {number} max  - максимальное значение
   * @return {number}     - сгенерированное случайное число
   */
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  /* ---------------------------------------------------------------------------
   * Возвращает заголовок объявления
   *
   * @param {number} - номер объявления
   * @return {string} - заголовок объявления
   */
  function getPlaceTitle(adNumber) {
    // список заголовков
    var placeTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира',
      'Огромный прекрасный дворец', 'Маленький ужасный дворец',
      'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
    return placeTitles[adNumber];
  }


  /* ---------------------------------------------------------------------------
   * Возвращает тип жилья
   *
   * @return {string} - тип жилья
   */
  function getPlaceType() {
    var placeTypesEn = ['flat', 'house', 'bungalo'];
    var index = random(0, 2);
    return placeTypesEn[index];
  }


  /* ---------------------------------------------------------------------------
   * Переводит тип жилья на русский язык
   *
   * @return {string} - тип жилья на русском языке
   */
  function translatePlaceType(englishType) {
    var translate = {
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    };
    return translate[englishType];
  }


  /* ---------------------------------------------------------------------------
   * Генерирует массив строковых значений,
   * взятых случайным образом из начального набора
   *
   * @return {Array.<string>} - сформированный массив
   */
  function getPlaceFeatures() {
    var result = [];
    var featuresList = ['wifi', 'dishwasher', 'parking', 'washer',
      'elevator', 'conditioner'];

    for (var i = 0; i < featuresList.length; i++) {
      if (random(0, 1)) {
        result.push(featuresList[i]);
      }
    }

    return result;
  }


  /* ---------------------------------------------------------------------------
   * Создание массива объектов, описывающих объявления
   *
   * @param {number} - номер объявления
   * @return {Object} - созданный объект
   */
  function createSetOfAds(count) {
    var ads = [];

    for (var i = 0; i < count; i++) {
      ads[i] = {
        author: {
          avatar: 'img/avatars/user0' +     // адрес изображения
            (i + 1) + '.png'
        },

        offer: {
          title: getPlaceTitle(i),          // заголовок объявления
          price: random(10, 10000) * 100,   // цена предложения
          type: getPlaceType(),             // тип жилья
          rooms: random(1, 5),              // количество комнат
          guests: random(1, 3),             // количество гостей
          checkin: random(12, 14) + ':00',  // время заезда (после)
          checkout: random(12, 14) + ':00', // время выезда (до)
          features: getPlaceFeatures(),     // список удобств
          description: '',                  // описание
          photos: []                        // фотографии
        },

        location: {
          x: random(300, 900) + 20,         // расположение по горизонтали
          y: random(100, 500) + 40          // расположение по вертикали
        }
      };

      ads[i].offer.address =                // адрес квартиры
        ads[i].location.x + ', ' + ads[i].location.y;
    }

    return ads;
  }


  /* ---------------------------------------------------------------------------
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


  /* ---------------------------------------------------------------------------
   * Создает узел, состоящий из данных конкретного объявления
   * и вставляет в разметку, заменяя существующий блок
   *
   * @param {Object} - объект объявления для вставки его данных в узел
   */
  function createAdNode(adObject) {
    // Создание узла и запись данных
    var adNode =
      document.querySelector('#lodge-template').content.cloneNode(true);

    adNode.querySelector('.lodge__title').textContent =
      adObject.offer.title;

    adNode.querySelector('.lodge__address').textContent =
      adObject.offer.address;

    adNode.querySelector('.lodge__price').innerHTML =
      adObject.offer.price + '&#x20bd;/ночь';

    adNode.querySelector('.lodge__type').textContent =
      translatePlaceType(adObject.offer.type);

    adNode.querySelector('.lodge__rooms-and-guests').textContent =
      'Для ' + adObject.offer.guests +
      ' гостей в ' + adObject.offer.rooms + ' комнатах';

    adNode.querySelector('.lodge__checkin-time').textContent =
      'Заезд после ' + adObject.offer.checkin +
      ', выезд до ' + adObject.offer.checkout;

    var setOfFeatures = createFeaturesFragment(adObject);
    adNode.querySelector('.lodge__features').appendChild(setOfFeatures);

    adNode.querySelector('.lodge__description').textContent =
      adObject.offer.description;

    // Замена стандартной аватарки на аватарку отрисовываемого объявления
    document.getElementById('offer-dialog').getElementsByTagName('img')[0].src =
      adObject.author.avatar;

    return adNode;
  }


  /* ---------------------------------------------------------------------------
   * Создает и возвращает DOM-фрагмент,
   * объединяющий узлы с данными всех созданных объявлений
   *
   * @param {Array<Object>} - массив с объектами объявлений
   * @return {DocumentFragment} - фрагмент с данными для вставки в HTML
   */
  function createPinsFragment(setOfAds) {
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < setOfAds.length; j++) {
      var pin = document.createElement('div');
      pin.className = 'pin';
      pin.style.left = setOfAds[j].location.x + 'px';
      pin.style.top = setOfAds[j].location.y + 'px';
      pin.setAttribute('tabindex', 0);
      pin.setAttribute('data-ad-number', j);
      pin.addEventListener('click', dialogOpenHandler);
      pin.addEventListener('keypress', dialogOpenHandler);
      pin.ads = setOfAds;

      var pinAvatar = document.createElement('img');
      pinAvatar.src = setOfAds[j].author.avatar;
      pinAvatar.className = 'rounded';
      pinAvatar.width = '40';
      pinAvatar.height = '40';

      pin.appendChild(pinAvatar);
      fragment.appendChild(pin);
    }
    return fragment;
  }


  /* ---------------------------------------------------------------------------
   * Вставляет фрагмент в указанную разметку
   *
   * @param {DocumentFragment} - фрагмент для вставки в разметку
   * @param {HTMLElement} - блок разметки HTML
   */
  function pasteFragment(fragment, block) {
    document.querySelector(block).appendChild(fragment);
  }


  /* ---------------------------------------------------------------------------
   * Заменяет указанный блок узлом
   *
   * @param {HTMLElement} - блок разметки HTML
   * @param {DocumentFragment} - фрагмент для вставки в разметку
   */
  function replaceBlock(block, node) {
    var oldBlock = document.querySelector(block);
    var parentBlock = oldBlock.parentNode;
    parentBlock.replaceChild(node, oldBlock);
  }


  /* ---------------------------------------------------------------------------
   * Отображает метки на карте
   *
   * @param {Array<Object>} - массив с объектами объявлений
   */
  function showPins(setOfAds) {
    var pinsFragment = createPinsFragment(setOfAds);
    pasteFragment(pinsFragment, '.tokyo__pin-map');
  }


  /* ---------------------------------------------------------------------------
   * Отображает панель dialog
   *
   * @param {Object} - объект объявления
   */
  function showAdDialog(adObject) {
    var adNode = createAdNode(adObject);
    replaceBlock('.dialog__panel', adNode);
    document.querySelector('.dialog').classList.remove('hidden');
  }


  /* ---------------------------------------------------------------------------
   * Инициализирует набор объявлений и соответствующие метки на карте
   *
   * @param {number} - количество объявлений
   */
  function initializeAds(count) {
    var setOfAds = createSetOfAds(count);
    showPins(setOfAds);
    // Скрытие диалогового окна при запуске
    document.querySelector('.dialog').classList.add('hidden');
    // Подписка на закрытие диалогового окна
    document.querySelector('.dialog__close').addEventListener('click', dialogCloseHandler);
    document.querySelector('.dialog__close').addEventListener('keydown', dialogCloseHandler);
    document.querySelector('.tokyo').addEventListener('keydown', dialogCloseHandler);
  }


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                ВЗАИМОДЕЙСТВИЕ С КАРТОЙ И ОТОБРАЖЕНИЕ ЭЛЕМЕНТОВ
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


  /* ---------------------------------------------------------------------------
   * Делает конкретную метку на карте активной
   *
   * @param {HTMLElement} - элемент-метка
   */
  function makePinActive(pin) {
    pin.classList.add('pin--active');
  }


  /* ---------------------------------------------------------------------------
   * Делает все метки на карте неактивными
   *
   * @param {NodeList} - набор элементов-меток
   */
  function makePinsInactive(pinsNodeList) {
    [].forEach.call(pinsNodeList, function (pin) {
      pin.classList.remove('pin--active');
    });
  }


  /* ---------------------------------------------------------------------------
   * Устанавливает логику обработки события открытия окна
   *
   * @param {Object} - объект события
   */
  function dialogCanOpen(event) {
    return event.button === 0 || event.keyCode === 13;
  }


  /* ---------------------------------------------------------------------------
   * Устанавливает логику обработки события закрытия окна
   *
   * @param {Object} - объект события
   */
  function dialogCanClose(event) {
    return event.button === 0 || event.keyCode === 13 || event.keyCode === 27;
  }


  /* ---------------------------------------------------------------------------
   * Обработчик события открытия диалогового окна
   *
   * @param {Object} - объект события
   */
  function dialogOpenHandler(event) {
    var pin = event.currentTarget;
    var setOfAds = pin.ads;
    var adNumber = pin.dataset.adNumber;
    var allPins = pin.parentNode.querySelectorAll('.pin--active');

    if (dialogCanOpen(event)) {
      makePinsInactive(allPins);
      makePinActive(pin);
      showAdDialog(setOfAds[adNumber]);
    }
  }


  /* ---------------------------------------------------------------------------
   * Обработчик события закрытия диалогового окна
   *
   * @param {Object} - объект события
   */
  function dialogCloseHandler(event) {
    if (dialogCanClose(event)) {
      document.querySelector('.dialog').classList.add('hidden');
      document.querySelector('.pin--active').classList.remove('pin--active');
    }
  }


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                                  СТАРТ
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


  initializeAds(8);


})();
