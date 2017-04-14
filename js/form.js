/* Работает с формой объявления */

'use strict';

window.publishForm = (function () {

  var element = {
    title: document.querySelector('#title'),
    price: document.querySelector('#price')
  };

  /* ---------------------------------------------------------------------------
   * Окрашивает рамку поля формы в зависимости от валидности
   * @param {HTMLElement} - элемент формы
   */
  function borderPaint(field) {
    field.style.borderColor = field.checkValidity() ? '#d9d9d3' : '#ff0000';
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
    }

  };

})();
