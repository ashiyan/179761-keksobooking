/* Отрисовывает элементы на карточке */

/* global data */

'use strict';

window.card = (function () {

  /* ---------------------------------------------------------------------------
   * Создает и возвращает DOM-фрагмент с удобствами
   * @param {Object} - объект объявления
   */
  function createFeaturesNode(adObject) {
    var fragment = document.createDocumentFragment();
    adObject.offer.features.forEach(function (feature) {
      var node = document.createElement('span');
      node.classList.add('feature__image');
      node.classList.add('feature__image--' + feature);
      fragment.appendChild(node);
    });
    return fragment;
  }

  /* ---------------------------------------------------------------------------
   * Создает и возвращает DOM-фрагмент карточки объявления
   * @param {Object} - объект объявления
   */
  function getCard(adObject) {
    var template = document.querySelector('#lodge-template').content.cloneNode(true);
    var tempElements = {
      title: template.querySelector('.lodge__title'),
      address: template.querySelector('.lodge__address'),
      price: template.querySelector('.lodge__price'),
      type: template.querySelector('.lodge__type'),
      roomsAndGuests: template.querySelector('.lodge__rooms-and-guests'),
      time: template.querySelector('.lodge__checkin-time'),
      features: template.querySelector('.lodge__features'),
      description: template.querySelector('.lodge__description'),
      avatar: document.getElementById('offer-dialog').getElementsByTagName('img')[0]
    };
    var featuresList = createFeaturesNode(adObject);

    tempElements.title.textContent = adObject.offer.title;
    tempElements.address.textContent = adObject.offer.address;
    tempElements.price.innerHTML = adObject.offer.price + '&#x20bd;/ночь';
    tempElements.type.textContent = adObject.offer.type.ru;
    tempElements.roomsAndGuests.textContent = 'Для ' + adObject.offer.guests +
      ' гостей в ' + adObject.offer.rooms + ' комнатах';
    tempElements.time.textContent = 'Заезд после ' + adObject.offer.checkin +
      ', выезд до ' + adObject.offer.checkout;
    tempElements.features.appendChild(featuresList);
    tempElements.description.textContent = adObject.offer.description;
    tempElements.avatar.src = adObject.author.avatar;

    return template;
  }

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Показывает карточку жилья по нажатию на метку на карте
     * @param {number} - ID объявления
     */
    showCard: function (id) {
      var adObject = data.getAd(id);
      var newCard = getCard(adObject);

      var oldCard = document.querySelector('.dialog__panel');
      var cardParent = oldCard.parentNode;

      cardParent.replaceChild(newCard, oldCard);

      var cardBoard = document.querySelector('.dialog');
      cardBoard.classList.remove('hidden');
    },

    /* -----------------------------------------------------------------------
     * Скрывает карточку
     */
    hideCard: function () {
      var cardBoard = document.querySelector('.dialog');
      cardBoard.classList.add('hidden');
    }

  };

})();
