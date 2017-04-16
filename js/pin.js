/* Отрисовывает пин */

/* global subscribes */

'use strict';

window.pin = (function () {

  /* ---------------------------------------------------------------------------
   * Создает и возвращает узел метки на карте
   * @param {Object} - объект объявления
   * @return {HTMLElement}
   */
  function createPinNode(ad) {
    var pinNode = document.createElement('div');

    pinNode.className = 'pin';
    pinNode.style.left = ad.location.x + 'px';
    pinNode.style.top = ad.location.y + 'px';
    pinNode.setAttribute('tabindex', 0);
    pinNode.setAttribute('data-ad-id', ad.id);
    subscribes.toDialogOpenHandler(pinNode);

    var pinAvatar = document.createElement('img');
    pinAvatar.src = ad.author.avatar;
    pinAvatar.className = 'rounded';
    pinAvatar.width = '40';
    pinAvatar.height = '40';
    pinAvatar.setAttribute('draggable', false);

    pinNode.appendChild(pinAvatar);
    return pinNode;
  }

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Создает и возвращает DOM-фрагмент, состоящий из меток на карте
     * @param {Array<Object>} - массив с объектами объявлений
     * @return {DocumentFragment}
     */
    getPins: function (adList) {
      var fragment = document.createDocumentFragment();

      adList.forEach(function (ad) {
        var pin = createPinNode(ad);
        fragment.appendChild(pin);
      });

      return fragment;
    }

  };

})();
