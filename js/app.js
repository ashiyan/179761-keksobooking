/* Инициализирует другие модули */

/* global app, data, subscribes, map, publishForm */

'use strict';

window.app = (function () {


/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Инициализирует модули приложения
     */
    init: function () {
      data.init(8);
      subscribes.init();
      map.init();
      publishForm.init();
    }
  };

})();

/* Запуск инициализации */
app.init();
