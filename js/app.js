/* Initializes other modules */

/* global app, data, subscribes, map, publishForm */

'use strict';

window.app = (function () {


/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Initializes application modules
     */
    init: function () {
      data.init();
      subscribes.init();
      map.init();
      publishForm.init();
    }
  };

})();

/* Starting initialization */
app.init();
