/*
 * Displays a pop-up message
 * @param {HTMLElement} - element to insert a pop-up window
 * @param {string} - message text
 */

'use strict';

(function () {

  window.popup = function (parentNode, messageText) {
    var message = document.createElement('div');
    message.innerHTML = messageText;
    message.className = 'popup';

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
