/* Works with form */

'use strict';

window.publishForm = (function () {

  /* ---------------------------------------------------------------------------
   * Handler synchronizing the timein and timeout fields
   * @param {Object} - event object
   */
  function timeChangeHandler(event) {
    var timein = ['После 12', 'После 13', 'После 14'];
    var timeout = ['Выезд до 12', 'Выезд до 13', 'Выезд до 14'];
    var timeinDropDown = document.querySelector('#time');
    var timeoutDropDown = document.querySelector('#timeout');

    function syncValues(field, value) {
      field.value = value;
    }

    window.synchronizeFields(timeinDropDown, timeoutDropDown,
        timein, timeout, syncValues);
  }

  /* ---------------------------------------------------------------------------
   * Handler sets the minimum price in accordance with the type of lodge
   * @param {Object} - event object
   */
  function typeChangeHandler(event) {
    var types = ['Квартира', 'Лачуга', 'Дворец'];
    var prices = [1000, 0, 10000];
    var typeDropDown = document.querySelector('#type');
    var priceDropDown = document.querySelector('#price');

    function syncValues(field, value) {
      field.value = value;
      field.min = value;
    }

    window.synchronizeFields(typeDropDown, priceDropDown,
        types, prices, syncValues);
  }

  /* ---------------------------------------------------------------------------
   * Handler sets the number of guests in accordance with the rooms count
   * @param {Object} - event object
   */
  function roomsChangeHandler(event) {
    var count = ['1 комната', '2 комнаты', '100 комнат'];
    var guests = ['не для гостей', 'для 3 гостей', 'для 3 гостей'];
    var roomsDropDown = document.querySelector('#room_number');
    var guestsDropDown = document.querySelector('#capacity');

    function syncValues(field, value) {
      field.value = value;
    }

    window.synchronizeFields(roomsDropDown, guestsDropDown,
        count, guests, syncValues);
  }

  /* ---------------------------------------------------------------------------
   * Paints the field's border depending on the validity
   */
  function borderColorChangeHandler(event) {
    var element = event.target;
    element.style.borderColor = element.checkValidity() ? '#d9d9d3' : '#f00';
  }

  /* -------------------------------------------------------------------------
   * Enter coordinates in the "Address" field and allow them to edit
   */
  function addressChangeHandler() {
    var addressInput = document.querySelector('#address');

    /* Get an array with x and y coordinates from the address field */
    var inputCoords = addressInput.value.match(/(\d+)/g);

    if (inputCoords === null || inputCoords.length !== 2) {
      /* If the coordinate array is empty or
         there are not 2 coordinates in it - it's error */
      addressInput.setCustomValidity('Неверный формат.');
      addressInput.reportValidity();
    } else {
      /* If not - remove the error and save the coordinates in the object.. */
      addressInput.setCustomValidity('');
      var coords = {
        x: inputCoords[0],
        y: inputCoords[1]
      };
      /* ...and pass it for correction (if there is a border crossing) */
      window.map.correctPosition(coords);
      /* If the focus field is lost, correcting the invalid coordinates */
      addressInput.addEventListener('blur', function () {
        addressInput.value = 'x: ' + coords.x + ', y: ' + coords.y;
      });
      /* Change the location of the pin according to coordinates */
      window.map.setMainPinPosition(coords.x, coords.y);
    }
  }

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Initializes start settings for fields
     */
    init: function () {
      var submit = document.querySelector('.form__submit');
      submit.addEventListener('click', borderColorChangeHandler);

      var type = document.querySelector('#type');
      type.addEventListener('change', typeChangeHandler);

      var timein = document.querySelector('#time');
      timein.addEventListener('change', timeChangeHandler);

      var rooms = document.querySelector('#room_number');
      rooms.addEventListener('change', roomsChangeHandler);

      var title = document.querySelector('#title');
      title.addEventListener('input', borderColorChangeHandler);

      var price = document.querySelector('#price');
      price.min = 1000;
      price.addEventListener('input', borderColorChangeHandler);

      var address = document.querySelector('#address');
      address.addEventListener('input', addressChangeHandler);
    },

  };

})();
