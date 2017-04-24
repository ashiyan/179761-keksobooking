/*
 * Displays a pop-up message
 * @param {HTMLElement} - element to insert a pop-up window
 * @param {string} - message text
 */

'use strict';

(function () {

  window.popup = function (parentNode, messageText) {
    var message = document.createElement('div');
    var popupStyle = message.style;

    /* Content and class */
    message.innerHTML = messageText;
    message.className = 'popup';

    /* Positioning and dimensions */
    popupStyle.position = 'absolute';
    popupStyle.top = '25px';
    popupStyle.left = '25px';
    popupStyle.maxWidth = '350px';
    popupStyle.minWidth = '150px';
    popupStyle.height = 'auto';
    popupStyle.zIndex = '999';

    /* Behavior */
    popupStyle.opacity = '0';
    popupStyle.transition = 'opacity 300ms linear';
    popupStyle.userSelect = 'none';
    popupStyle.cursor = 'default';

    /* Indents */
    popupStyle.padding = '10px';

    /* Border */
    popupStyle.borderLeft = '5px solid #ff6d51';

    /* Colors */
    popupStyle.background = '#fff';

    /* Text */
    popupStyle.fontWeight = 'bold';
    popupStyle.fontSize = '12px';

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
