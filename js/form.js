/* Works with form */

/* global map */

'use strict';

window.publishForm = (function () {

  var element = {
    title: document.querySelector('#title'),
    price: document.querySelector('#price'),
    address: document.querySelector('#address')
  };

  /* ---------------------------------------------------------------------------
   * Paints the field's border depending on the validity
   * @param {HTMLElement} - form's element
   */
  function borderPaint(field) {
    field.style.borderColor = field.checkValidity() ? '#d9d9d3' : '#f00';
  }

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Initializes start settings for fields
     */
    init: function () {
      element.price.min = 1000;
    },

    /* -------------------------------------------------------------------------
     * Applies the settings to the fields depending on their validity
     */
    validate: function () {
      borderPaint(element.title);
      borderPaint(element.price);
    },

    /* -------------------------------------------------------------------------
     * Enter coordinates in the "Address" field and allow them to edit
     */
    addressChange: function () {
      /* Get an array with x and y coordinates from the address field */
      var inputCoords = element.address.value.match(/(\d+)/g);

      if (inputCoords === null || inputCoords.length !== 2) {
        /* If the coordinate array is empty or
           there are not 2 coordinates in it - it's error */
        element.address.setCustomValidity('Неверный формат.');
        element.address.reportValidity();
      } else {
        /* If not - remove the error and save the coordinates in the object.. */
        element.address.setCustomValidity('');
        var coords = {
          x: inputCoords[0],
          y: inputCoords[1]
        };
        /* ...and pass it for correction (if there is a border crossing) */
        map.correctPosition(coords);
        /* If the focus field is lost, correcting the invalid coordinates */
        element.address.addEventListener('blur', function () {
          element.address.value = 'x: ' + coords.x + ', y: ' + coords.y;
        });
        /* Change the location of the pin according to coordinates */
        map.setMainPinPosition(coords.x, coords.y);
      }
    }

  };

})();
