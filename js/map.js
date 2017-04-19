/* Работает с картой */

/* global pin, drag, card */

'use strict';

window.map = (function () {

  var border = {
    top: 100,
    right: 900,
    bottom: 500,
    left: 300
  };

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Инициализирует начальные настройки карты
     */
    init: function () {
      var mainPin = document.querySelector('.pin__main');
      card.hideCard();
      pin.draw();
      drag.makeDraggable(mainPin);
    },

    /* -------------------------------------------------------------------------
     * Возвращает границы карты
     */
    getBorder: function () {
      return border;
    },

    /* -------------------------------------------------------------------------
     * Перемещает главный пин в указанные координаты
     */
    setMainPinPosition: function (x, y) {
      var mainPin = document.querySelector('.pin__main');
      mainPin.style.left = x + 'px';
      mainPin.style.top = y + 'px';
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
