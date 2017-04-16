/* Работает с формой объявления */

/* global map */

'use strict';

window.publishForm = (function () {

  var element = {
    title: document.querySelector('#title'),
    price: document.querySelector('#price'),
    address: document.querySelector('#address')
  };

  /* ---------------------------------------------------------------------------
   * Окрашивает рамку поля формы в зависимости от валидности
   * @param {HTMLElement} - элемент формы
   */
  function borderPaint(field) {
    field.style.borderColor = field.checkValidity() ? '#d9d9d3' : '#f00;';
  }

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Инициализирует начальные настройки для полей
     */
    init: function () {
      element.price.min = 1000;
    },

    /* -------------------------------------------------------------------------
     * Применяет настройки к полям в зависимости от их валидности
     */
    validate: function () {
      borderPaint(element.title);
      borderPaint(element.price);
    },

    /* -------------------------------------------------------------------------
     * Вписывает координаты в поле "Адрес" и позволяет их редактировать
     */
    addressChange: function () {
      var inputCoords = element.address.value.match(/(\d+)/g);

      if (inputCoords === null || inputCoords.length !== 2) {
        element.address.setCustomValidity('Неверный формат.');
        element.address.reportValidity();
      } else {
        var coords = {
          x: inputCoords[0],
          y: inputCoords[1]
        };
        map.correctPosition(coords);
        element.address.addEventListener('blur', function () {
          element.address.value = 'x: ' + coords.x + ', y: ' + coords.y;
        });
        element.address.setCustomValidity('');
        map.pin.setMainPinPosition(coords.x, coords.y);
      }
    }

  };

})();
