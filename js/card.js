/* Отрисовывает элементы на карточке */

'use strict';

window.card = (function () {

  /* ---------------------------------------------------------------------------
   * Создает и возвращает DOM-фрагмент с удобствами
   * @param {Object} - объект объявления
   */
  function createFeaturesNode(ad) {
    var fragment = document.createDocumentFragment();
    ad.offer.features.forEach(function (feature) {
      var node = document.createElement('span');
      node.classList.add('feature__image');
      node.classList.add('feature__image--' + feature);
      fragment.appendChild(node);
    });
    return fragment;
  }

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Создает и возвращает DOM-фрагмент карточки объявления
     * @param {Object} - объект объявления
     */
    getCard: function (ad) {
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
      var featuresList = createFeaturesNode(ad);

      tempElements.title.textContent = ad.offer.title;
      tempElements.address.textContent = ad.offer.address;
      tempElements.price.innerHTML = ad.offer.price + '&#x20bd;/ночь';
      tempElements.type.textContent = ad.offer.type.ru;
      tempElements.roomsAndGuests.textContent = 'Для ' + ad.offer.guests +
        ' гостей в ' + ad.offer.rooms + ' комнатах';
      tempElements.time.textContent = 'Заезд после ' + ad.offer.checkin +
        ', выезд до ' + ad.offer.checkout;
      tempElements.features.appendChild(featuresList);
      tempElements.description.textContent = ad.offer.description;
      tempElements.avatar.src = ad.author.avatar;

      return template;
    }

  };

})();
