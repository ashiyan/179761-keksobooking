/* Subscribes elements on events */

/* global pin, card, publishForm */

'use strict';

window.subscribes = (function () {

  var element = {
    map: {
      dialogCross: document.querySelector('.dialog__close')
    },
    form: {
      submit: document.querySelector('.form__submit'),
      type: document.querySelector('#type'),
      timein: document.querySelector('#time'),
      timeout: document.querySelector('#timeout'),
      rooms: document.querySelector('#room_number'),
      title: document.querySelector('#title'),
      price: document.querySelector('#price'),
      address: document.querySelector('#address'),
      guests: document.querySelector('#capacity')
    }
  };

  /* ---------------------------------------------------------------------------
   * Card opening event handler
   * @param {Object} - event object
   */
  function dialogOpenHandler(event) {
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
      pin.deactivateAll();
      pin.activate(clickedPin);
      card.showCard(location);
    }
  }

  /* ---------------------------------------------------------------------------
   * Card close Event Handler
   * @param {Object} - event object
   */
  function dialogCloseHandler(event) {
    var pressed = {
      mouseLeft: event.button === 0,
      enter: event.keyCode === 13,
      escape: event.keyCode === 27
    };

    if (pressed.mouseLeft || pressed.enter || pressed.escape) {
      pin.deactivateAll();
      card.hideCard();
    }
  }

  /* ---------------------------------------------------------------------------
   * Handler synchronizing the timein and timeout fields
   * @param {Object} - event object
   */
  function timeChangeHandler(event) {
    var inTimes = ['После 12', 'После 13', 'После 14'];
    var outTimes = ['Выезд до 12', 'Выезд до 13', 'Выезд до 14'];

    function syncValues(field, value) {
      field.value = value;
    }

    window.synchronizeFields(element.form.timein, element.form.timeout,
        inTimes, outTimes, syncValues);
  }

  /* ---------------------------------------------------------------------------
   * Handler sets the minimum price in accordance with the type of lodge
   * @param {Object} - event object
   */
  function typeChangeHandler(event) {
    var types = ['Квартира', 'Лачуга', 'Дворец'];
    var prices = [1000, 0, 10000];

    function syncValues(field, value) {
      field.value = value;
      field.min = value;
    }

    window.synchronizeFields(element.form.type, element.form.price,
        types, prices, syncValues);
  }

  /* ---------------------------------------------------------------------------
   * Handler sets the number of guests in accordance with the rooms count
   * @param {Object} - event object
   */
  function roomsChangeHandler(event) {
    var count = ['1 комната', '2 комнаты', '100 комнат'];
    var guests = ['не для гостей', 'для 3 гостей', 'для 3 гостей'];

    function syncValues(field, value) {
      field.value = value;
    }

    window.synchronizeFields(element.form.rooms, element.form.guests,
        count, guests, syncValues);
  }

  /* ---------------------------------------------------------------------------
   * Handler starts checking form validity by submit button press
   */
  function formChangeHandler() {
    publishForm.validate();
  }

  /* ---------------------------------------------------------------------------
   * Handler of the "Address" field changing
   */
  function addressChangeHandler() {
    publishForm.addressChange();
  }

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Initializes event subscriptions
     */
    init: function () {
      document.body.addEventListener('keydown', dialogCloseHandler);
      element.map.dialogCross.addEventListener('click', dialogCloseHandler);
      element.map.dialogCross.addEventListener('keydown', dialogCloseHandler);
      element.form.type.addEventListener('change', typeChangeHandler);
      element.form.timein.addEventListener('change', timeChangeHandler);
      element.form.rooms.addEventListener('change', roomsChangeHandler);
      element.form.submit.addEventListener('click', formChangeHandler);
      element.form.title.addEventListener('input', formChangeHandler);
      element.form.price.addEventListener('input', formChangeHandler);
      element.form.address.addEventListener('input', addressChangeHandler);
    },

    /* -------------------------------------------------------------------------
     * Subscribes the item for the card opening event
     * @param {HTMLElement} - subscribed item
     */
    toDialogOpenHandler: function (elem) {
      elem.addEventListener('click', dialogOpenHandler);
      elem.addEventListener('keypress', dialogOpenHandler);
    }

  };

})();
