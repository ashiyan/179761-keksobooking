/* Draws a pin */

'use strict';

window.pin = (function () {

  var pinList = [];

  /* ---------------------------------------------------------------------------
   * Creates and returns a pin node
   * @param {Object} - ad's object
   * @return {HTMLElement}
   */
  function createPinNode(ad) {
    var pinNode = document.createElement('div');

    pinNode.className = 'pin pin__other';
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
   * @param {Array<Object>} - array with ad's objects
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
      var ads = window.data.getAdList();
      var fragment = getPinsFragment(ads);
      var map = document.querySelector('.tokyo__pin-map');
      map.appendChild(fragment);
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
    deactivateAll: function () {
      var map = document.querySelector('.tokyo__pin-map');
      var activePins = map.querySelectorAll('.pin--active');
      [].forEach.call(activePins, function (pin) {
        pin.classList.remove('pin--active');
      });
    },

    /* -------------------------------------------------------------------------
     * Apply filter to pins
     * @param {Array<boolean>} - show/hide conditions
     */
    applyFilter: function (isShow) {
      [].forEach.call(pinList, function (pin) {
        pin.classList.add('hidden');
      });
      for (var i = 0; i < pinList.length; i++) {
        if (isShow[i]) {
          pinList[i].classList.remove('hidden');
        }
      }
      window.card.hideCard();
      window.pin.deactivateAll();
    }

  };

})();
