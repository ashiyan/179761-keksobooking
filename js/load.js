/*  Load information from the server */

'use strict';

(function () {

  /* -------------------------------------------------------------------------
   * Sends requests to the server and transfers the received information
   * @param {string} - URL address for data requesting
   * @param {function} - callback function of information processing
   */
  window.load = function (url, onLoad) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.send();
    request.addEventListener('readystatechange', onLoad);
  };

})();
