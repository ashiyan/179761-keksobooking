/* Manages the behavior of the card dialog window */

'use strict';

window.cardBehavior = (function () {

  /* ---------------------------------------------------------------------------
   * Card opening event handler
   * @param {Object} - event object
   */
  function cardOpenHandler(event) {
    var clickedPin = event.currentTarget;
    var location = {
      x: clickedPin.offsetLeft,
      y: clickedPin.offsetTop
    };
    var pressed = {
      mouseLeft: event.button === 0,
      enter: event.keyCode === 13
    };

    if (pressed.mouseLeft || pressed.enter) {
      window.pin.deactivate();
      window.pin.activate(clickedPin);
      window.card.showCard(location);
    }
  }

  /* ---------------------------------------------------------------------------
   * Card close Event Handler
   * @param {Object} - event object
   */
  function cardCloseHandler(event) {
    var pressed = {
      mouseLeft: event.button === 0,
      enter: event.keyCode === 13,
      escape: event.keyCode === 27
    };

    if (pressed.mouseLeft || pressed.enter || pressed.escape) {
      window.pin.deactivate();
      window.card.hideCard();
    }
  }

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Initializes event subscriptions
     */
    init: function () {
      var dialogCross = document.querySelector('.dialog__close');
      document.body.addEventListener('keydown', cardCloseHandler);
      dialogCross.addEventListener('click', cardCloseHandler);
      dialogCross.addEventListener('keydown', cardCloseHandler);
    },

    /* -------------------------------------------------------------------------
     * Subscribes the item for the card opening event
     * @param {HTMLElement} - subscribed item
     */
    subscribeToOpenCard: function (elem) {
      elem.addEventListener('click', cardOpenHandler);
      elem.addEventListener('keypress', cardOpenHandler);
    }

  };

})();
