/*
 * Displays a pop-up message
 * @param {HTMLElement} - element to insert a pop-up window
 * @param {string} - message text
 */

'use strict';

(function () {

  window.popup = function (parentNode, messageText) {
    var message = document.createElement('div');
    var style = message.style;

    /* Content and class */
    message.innerHTML = messageText;
    message.className = 'popup';

    /* Positioning and dimensions */
    style.position = 'absolute';
    style.top = '25px';
    style.left = '25px';
    style.maxWidth = '350px';
    style.minWidth = '150px';
    style.height = 'auto';
    style.zIndex = '999';

    /* Behavior */
    style.opacity = '0';
    style.transition = 'opacity 300ms linear';
    style.userSelect = 'none';
    style.cursor = 'default';

    /* Indents */
    style.padding = '10px';

    /* Border */
    style.borderLeft = '5px solid #ff6d51';

    /* Colors */
    style.background = '#fff';

    /* Text */
    style.fontWeight = 'bold';
    style.fontSize = '12px';

    /* Inserting an element into the markup */
    parentNode.appendChild(message);

    /* Show the message after 0.3 seconds */
    setTimeout(function () {
      document.querySelector('.popup').style.opacity = '1';
    }, 300);

    /* Hide the message after 3.3 seconds */
    setTimeout(function () {
      document.querySelector('.popup').style.opacity = '0';
    }, 3300);

    /* Remove pop-up element from markup after 3.6 seconds */
    setTimeout(function () {
      parentNode.removeChild(message);
    }, 3600);
  };

})();
