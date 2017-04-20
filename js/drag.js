/* Drag and drop controller */

/* global map */

'use strict';

window.drag = (function () {

  var drag = {};

  /* ---------------------------------------------------------------------------
   * Start the drag and drop process (click on the object)
   * @param {Object} - event object
   */
  function startDrag(event) {
    /* Cancel event by pressing the middle or right mouse button */
    var pressed = {
      mouseMiddle: event.button === 1,
      mouseRight: event.button === 2
    };
    if (pressed.mouseMiddle || pressed.mouseRight) {
      return;
    }

    /* Dragged pin must be above other pins */
    drag.pin.style.zIndex = '999';

    /* Prevent text selection while dragging */
    document.body.style.userSelect = 'none';

    /* Remember the starting position of the pin */
    drag.startCoords = {
      x: drag.pin.offsetLeft,
      y: drag.pin.offsetTop
    };

    /* Remember the coordinates of the mouse cursor at the first click moment */
    drag.firstClick = {
      x: event.clientX,
      y: event.clientY
    };

    drag.pin.addEventListener('mousemove', processDrag);
    window.addEventListener('mouseup', endDrag);
  }

  /* ---------------------------------------------------------------------------
   * The process of dragging (moving the mouse with the hold button)
   * @param {Object} - event object
   */
  function processDrag(event) {
    /* The pin's coordinates in the drag process */
    var newCoords = {
      x: drag.startCoords.x + event.clientX - drag.firstClick.x,
      y: drag.startCoords.y + event.clientY - drag.firstClick.y
    };

    /* Prevent pin leaves the map */
    map.correctPosition(newCoords);

    /* Apply coordinates to the pin */
    drag.pin.style.left = newCoords.x + 'px';
    drag.pin.style.top = newCoords.y + 'px';

    /* Display pin's coordinates in the address field */
    var addressField = document.querySelector('#address');
    addressField.value = 'x: ' + newCoords.x + ', y: ' + newCoords.y;
  }

  /* ---------------------------------------------------------------------------
   * End of the drag and drop process (releasing the mouse button)
   * @param {Object} - event object
   */
  function endDrag(event) {
    drag.pin.style.zIndex = 'auto';
    document.body.style.userSelect = 'auto';
    drag.pin.removeEventListener('mousemove', processDrag);
  }

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Gives the ability to drag and drop
     */
    makeDraggable: function (pin) {
      drag.pin = pin;
      drag.pin.addEventListener('mousedown', startDrag);
    }

  };

})();
