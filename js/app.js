/* Initializes other modules */

'use strict';

window.app = (function () {

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Initializes application modules
     */
    init: function () {
      window.dataCreation.init();
      window.cardBehavior.init();
      window.form.init();
      window.filtration.init();
      window.map.init();
    }
  };

})();

/* Starting initialization */
window.app.init();
