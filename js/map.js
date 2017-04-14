/* Работает с картой */

/* global data, pin, card */

'use strict';

window.map = (function () {

  var element = {
    map: document.querySelector('.tokyo__pin-map'),
    card: document.querySelector('.dialog')
  };

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    pin: {

      /* -----------------------------------------------------------------------
       * Отрисовывает метки на карте
       */
      draw: function () {
        var ads = data.getAdList();
        var pins = pin.getPins(ads);
        element.map.appendChild(pins);
      },

      /* -----------------------------------------------------------------------
       * Добавляет метке выделение
       * @param {HTMLElement} - метка
       */
      activate: function (pin) {
        pin.classList.add('pin--active');
      },

      /* -----------------------------------------------------------------------
       * Убирает выделение у всех активных меток
       */
      deactivate: function () {
        var activePins = element.map.querySelectorAll('.pin--active');
        [].forEach.call(activePins, function (pin) {
          pin.classList.remove('pin--active');
        });
      }
    },

    card: {

      /* -----------------------------------------------------------------------
       * Отрисовывает карточку обьявления
       * @param {Object} - объект обьявления
       */
      draw: function (ad) {
        var newCard = card.getCard(ad);
        var oldCard = document.querySelector('.dialog__panel');
        var cardParent = oldCard.parentNode;
        cardParent.replaceChild(newCard, oldCard);
      },

      /* -----------------------------------------------------------------------
       * Показывает карточку
       */
      show: function () {
        element.card.classList.remove('hidden');
      },

      /* -----------------------------------------------------------------------
       * Скрывает карточку
       */
      hide: function () {
        element.card.classList.add('hidden');
      }
    }

  };

})();
