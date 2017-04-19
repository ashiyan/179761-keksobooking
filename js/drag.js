/* Drag and drop контроллер */

/* global map */

'use strict';

window.drag = (function () {

  var drag = {};

  /* ---------------------------------------------------------------------------
   * Начало процесса перетаскивания (клик по объекту)
   * @param {Object} - объект события
   */
  function startDrag(event) {
    /* Отмена события при нажатии средней или правой кнопки мыши */
    var pressed = {
      mouseMiddle: event.button === 1,
      mouseRight: event.button === 2
    };
    if (pressed.mouseMiddle || pressed.mouseRight) {
      return;
    }

    /* Перетаскиваемая метка становится выше других меток */
    drag.pin.style.zIndex = '999';

    /* Запрет выделения текста на время перетаскивания */
    document.body.style.userSelect = 'none';

    /* Запомнить начальную позицию метки */
    drag.startCoords = {
      x: drag.pin.offsetLeft,
      y: drag.pin.offsetTop
    };

    /* Запомнить координаты курсора мышки в момент клика */
    drag.firstClick = {
      x: event.clientX,
      y: event.clientY
    };

    drag.pin.addEventListener('mousemove', processDrag);
    window.addEventListener('mouseup', endDrag);
  }

  /* ---------------------------------------------------------------------------
   * Процесс перетаскивания (движение мыши с зажатой кнопкой)
   * @param {Object} - объект события
   */
  function processDrag(event) {
    /* Координаты метки в процессе драга с корректировкой на курсор */
    var newCoords = {
      x: drag.startCoords.x + event.clientX - drag.firstClick.x,
      y: drag.startCoords.y + event.clientY - drag.firstClick.y
    };

    /* Запрет выхода метки за пределы карты */
    map.correctPosition(newCoords);

    /* Применить координаты к метке */
    drag.pin.style.left = newCoords.x + 'px';
    drag.pin.style.top = newCoords.y + 'px';

    /* Отображение координат в строке адреса */
    var addressField = document.querySelector('#address');
    addressField.value = 'x: ' + newCoords.x + ', y: ' + newCoords.y;
  }

  /* ---------------------------------------------------------------------------
   * Окончание процесса перетаскивания (отпускание кнопки мыши)
   * @param {Object} - объект события
   */
  function endDrag(event) {
    drag.pin.style.zIndex = 'auto';
    document.body.style.userSelect = 'auto';
    drag.pin.removeEventListener('mousemove', processDrag);
  }

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Дает метке возможность перетаскивания
     */
    makeDraggable: function (pin) {
      drag.pin = pin;
      drag.pin.addEventListener('mousedown', startDrag);
    }

  };

})();
