/* Initializes other modules */

'use strict';

window.app = (function () {

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Initializes application modules
     */
    init: function () {
      window.data.init();
      window.cardBehavior.init();
      window.publishForm.init();
      window.filtration.init();
      window.map.init();
    }
  };

})();

/* Starting initialization */
window.app.init();
