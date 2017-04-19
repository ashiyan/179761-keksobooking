/*
 * Displays a pop-up message
 * @param {HTMLElement} - element to insert a pop-up window
 * @param {string} - message text
 */

'use strict';

(function () {

  window.popup = function (parentNode, messageText) {
    var message = document.createElement('div');

    /* Content and class */
    message.innerHTML = messageText;
    message.className = 'popup';

    /* Positioning and dimensions */
    message.style.position = 'absolute';
    message.style.top = '25px';
    message.style.left = '25px';
    message.style.maxWidth = '350px';
    message.style.minWidth = '150px';
    message.style.height = 'auto';
    message.style.zIndex = '999';

    /* Behavior */
    message.style.opacity = '0';
    message.style.transition = 'opacity 300ms linear';
    message.style.userSelect = 'none';
    message.style.cursor = 'default';

    /* Indents */
    message.style.padding = '10px';

    /* Border */
    message.style.borderLeft = '5px solid #ff6d51';

    /* Colors */
    message.style.background = '#fff';

    /* Text */
    message.style.fontWeight = 'bold';
    message.style.fontSize = '12px';

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
