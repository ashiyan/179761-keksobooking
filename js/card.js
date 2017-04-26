/* Draws elements on the card */

'use strict';

window.card = (function () {

  /* ---------------------------------------------------------------------------
   * Creates and returns a DOM-fragment with features
   * @param {Object} - ad object
   * @return {DocumentFragment}
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
   * Creates and returns a DOM-fragment with lodge photos
   * @param {Object} - ad object
   * @return {DocumentFragment}
   */
  function createPhotosNode(adObject) {
    var fragment = document.createDocumentFragment();
    adObject.offer.photos.forEach(function (photo) {
      var node = document.createElement('img');
      node.src = photo;
      node.alt = 'Lodge photo';
      node.height = '42';
      node.width = '52';
      fragment.appendChild(node);
    });
    return fragment;
  }

  /* ---------------------------------------------------------------------------
   * Creates and returns a DOM fragment of the ad card
   * @param {Object} - ad object
   * @return {HTMLElement}
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
      photos: template.querySelector('.lodge__photos'),
      avatar: document.getElementById('offer-dialog').getElementsByTagName('img')[0]
    };
    var featuresList = createFeaturesNode(adObject);
    var photosList = createPhotosNode(adObject);

    var rusType = {
      'flat': 'Квартира',
      'house': 'Дом',
      'bungalo': 'Бунгало'
    };

    tempElements.title.textContent = adObject.offer.title;
    tempElements.address.textContent = adObject.offer.address;
    tempElements.price.innerHTML = adObject.offer.price + '&#x20bd;/ночь';
    tempElements.type.textContent = rusType[adObject.offer.type];
    tempElements.roomsAndGuests.textContent = 'Для ' + adObject.offer.guests +
      ' гостей в ' + adObject.offer.rooms + ' комнатах';
    tempElements.time.textContent = 'Заезд после ' + adObject.offer.checkin +
      ', выезд до ' + adObject.offer.checkout;

    tempElements.features.appendChild(featuresList);
    tempElements.photos.appendChild(photosList);

    tempElements.description.textContent = adObject.offer.description;
    tempElements.avatar.src = adObject.author.avatar;

    return template;
  }

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Displays the lodge card by clicking on the map pin
     * @param {Object} - object with pin coords
     */
    showCard: function (pinLocation) {
      var adObject = window.data.getAdByLocation(pinLocation);
      var newCard = getCard(adObject);

      var oldCard = document.querySelector('.dialog__panel');
      var cardParent = oldCard.parentNode;

      cardParent.replaceChild(newCard, oldCard);

      var cardBoard = document.querySelector('.dialog');
      cardBoard.classList.remove('hidden');
    },

    /* -----------------------------------------------------------------------
     * Hide the lodge card
     */
    hideCard: function () {
      var cardBoard = document.querySelector('.dialog');
      cardBoard.classList.add('hidden');
    }

  };

})();
