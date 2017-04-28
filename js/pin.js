/* Draws a pin */

'use strict';

window.pin = (function () {

  var pinList = [];
  var tokyoMap = document.querySelector('.tokyo__pin-map');

  /* ---------------------------------------------------------------------------
   * Creates and returns a pin node
   * @param {Object} - ad's object
   * @return {HTMLElement}
   */
  function createPinNode(ad) {
    var pinNode = document.createElement('div');

    pinNode.className = 'pin hidden';
    pinNode.style.left = ad.location.x + 'px';
    pinNode.style.top = ad.location.y + 'px';
    pinNode.setAttribute('tabindex', 0);
    window.cardBehavior.subscribeToOpenCard(pinNode);

    var pinAvatar = document.createElement('img');
    pinAvatar.src = ad.author.avatar;
    pinAvatar.className = 'rounded';
    pinAvatar.width = '40';
    pinAvatar.height = '40';
    pinAvatar.setAttribute('draggable', false);

    pinNode.appendChild(pinAvatar);
    pinList.push(pinNode);

    return pinNode;
  }

  /* ---------------------------------------------------------------------------
   * Creates and returns a DOM fragment consisting of pins
   * @param {indexesay<Object>} - indexesay with ad's objects
   * @return {DocumentFragment}
   */
  function getPinsFragment(adList) {
    var fragment = document.createDocumentFragment();

    adList.forEach(function (ad) {
      var pin = createPinNode(ad);
      fragment.appendChild(pin);
    });

    return fragment;
  }

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Draws the pins of all ads
     */
    draw: function () {
      var ads = window.dataCreation.getAdList();
      var fragment = getPinsFragment(ads);
      var indexes = [];

      tokyoMap.appendChild(fragment);

      while (indexes.length < 3) {
        var number = Math.ceil(Math.random() * (ads.length - 1));
        if (indexes.indexOf(number) < 0) {
          indexes.push(number);
        }
      }

      indexes.forEach(function (index) {
        pinList[index].classList.remove('hidden');
      });
    },

    /* -------------------------------------------------------------------------
     * Adds a selection to the pin
     * @param {HTMLElement} - pin
     */
    activate: function (pin) {
      pin.classList.add('pin--active');
    },

    /* -------------------------------------------------------------------------
     * Removes selection from all active pins
     */
    deactivate: function () {
      var activePin = tokyoMap.querySelector('.pin--active');
      if (activePin !== null) {
        activePin.classList.remove('pin--active');
      }
    },

    /* -------------------------------------------------------------------------
     * Apply filter to pins
     * @param {indexesay<boolean>} - show/hide conditions
     */
    applyFilter: function (isShow) {
      pinList.forEach(function (pin) {
        pin.classList.add('hidden');
      });
      for (var i = 0; i < pinList.length; i++) {
        if (isShow[i]) {
          pinList[i].classList.remove('hidden');
        }
      }
      window.card.hideCard();
      window.pin.deactivate();
    }

  };

})();
