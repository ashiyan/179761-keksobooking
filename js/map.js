/* Работает с картой */

/* global data, pin, card, drag */

'use strict';

window.map = (function () {

  var border = {
    top: 100,
    right: 900,
    bottom: 500,
    left: 300
  };

  var element = {
    map: document.querySelector('.tokyo__pin-map'),
    card: document.querySelector('.dialog'),
    mainPin: document.querySelector('.pin__main')
  };

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Возвращает границы карты
     */
    getBorder: function () {
      return border;
    },

    /* -------------------------------------------------------------------------
     * Инициализирует начальные настройки карты
     */
    init: function () {
      drag.makeDraggable(element.mainPin);
    },

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
      },

      /* -----------------------------------------------------------------------
       * Перемещает главный пин в указанные координаты
       */
      setMainPinPosition: function (x, y) {
        element.mainPin.style.left = x + 'px';
        element.mainPin.style.top = y + 'px';
      },
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
    },

    /* -------------------------------------------------------------------------
     * Ограничивает выход метки за области карты
     * @param {Object} - объект с координатами метки
     */
    correctPosition: function (coords) {
      var borderLimit = {
        side: {
          top: coords.y < border.top,
          right: coords.x > border.right,
          bottom: coords.y > border.bottom,
          left: coords.x < border.left
        },
        corner: {
          rightTop: coords.x > border.right && coords.y < border.top,
          rightBottom: coords.x > border.right && coords.y > border.bottom,
          leftBottom: coords.x < border.left && coords.y > border.bottom,
          leftTop: coords.x < border.left && coords.y < border.top
        }
      };

      switch (true) {
        case borderLimit.corner.rightTop:
          coords.x = border.right;
          coords.y = border.top;
          break;
        case borderLimit.corner.rightBottom:
          coords.x = border.right;
          coords.y = border.bottom;
          break;
        case borderLimit.corner.leftBottom:
          coords.x = border.left;
          coords.y = border.bottom;
          break;
        case borderLimit.corner.leftTop:
          coords.x = border.left;
          coords.y = border.top;
          break;
        case borderLimit.side.top:
          coords.y = border.top;
          break;
        case borderLimit.side.right:
          coords.x = border.right;
          break;
        case borderLimit.side.bottom:
          coords.y = border.bottom;
          break;
        case borderLimit.side.left:
          coords.x = border.left;
          break;
      }
    }

  };

})();
