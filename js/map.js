/* Works with map */

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
     * Initializes start map's settings
     */
    init: function () {
      var mainPin = document.querySelector('.pin__main');
      window.card.hideCard();
      window.drag.makeDraggable(mainPin);
    },

    /* -------------------------------------------------------------------------
     * Returns the object of map's borders
     * @return {Object}
     */
    getBorder: function () {
      return border;
    },

    /* -------------------------------------------------------------------------
     * Moves the main pin to the specified coordinates
     * @param {number} - x coord
     * @param {number} - y coord
     */
    setMainPinPosition: function (x, y) {
      var mainPin = document.querySelector('.pin__main');
      mainPin.style.left = x + 'px';
      mainPin.style.top = y + 'px';
    },

    /* -------------------------------------------------------------------------
     * Limits the pin output beyond the map area
     * @param {Object} - object with coordinates
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
