/* Подписывает элементы на события */

/* global data, map, publishForm */

'use strict';

window.subscribes = (function () {

  var element = {
    map: {
      dialogCross: document.querySelector('.dialog__close'),
      background: document.querySelector('.tokyo'),
      //mainPinImg: document.querySelector('.pin__main > img')
    },
    form: {
      submit: document.querySelector('.form__submit'),
      type: document.querySelector('#type'),
      timein: document.querySelector('#time'),
      rooms: document.querySelector('#room_number'),
      title: document.querySelector('#title'),
      price: document.querySelector('#price'),
      address: document.querySelector('#address')
    }
  };


  /* ---------------------------------------------------------------------------
   * Обработчик события открытия карточки
   * @param {Object} - объект события
   */
  function dialogOpenHandler(event) {
    var pressed = {
      mouseLeft: event.button === 0,
      enter: event.keyCode === 13
    };

    var pin = event.currentTarget;
    var id = pin.dataset.adId;
    var ad = data.getAd(id);

    if (pressed.mouseLeft || pressed.enter) {
      map.pin.deactivate();
      map.pin.activate(pin);
      map.card.draw(ad);
      map.card.show();
    }
  }

  /* ---------------------------------------------------------------------------
   * Обработчик события закрытия карточки
   * @param {Object} - объект события
   */
  function dialogCloseHandler(event) {
    var pressed = {
      mouseLeft: event.button === 0,
      enter: event.keyCode === 13,
      escape: event.keyCode === 27
    };

    if (pressed.mouseLeft || pressed.enter || pressed.escape) {
      map.pin.deactivate();
      map.card.hide();
    }
  }

  /* ---------------------------------------------------------------------------
   * Обработчик, выставляющий время выезда равным времени въезда
   * @param {Object} - объект события
   */
  function timeChangeHandler(event) {
    var timeout = document.querySelector('#timeout');
    timeout.selectedIndex = event.target.selectedIndex;
  }

  /* ---------------------------------------------------------------------------
   * Обработчик, выставляющий минимальную цену в соответствии с типом жилья
   * @param {Object} - объект события
   */
  function typeChangeHandler(event) {
    var price = document.querySelector('#price');
    var minPrices = {
      'Квартира': 1000,
      'Лачуга': 0,
      'Дворец': 10000
    };

    price.value = minPrices[event.target.value];
    price.min = minPrices[event.target.value];
    publishForm.validate();
  }

  /* ---------------------------------------------------------------------------
   * Обработчик, выставляющий кол-во гостей в соответствии с кол-вом комнат
   * @param {Object} - объект события
   */
  function roomsChangeHandler(event) {
    var guestsNumber = document.querySelector('#capacity');
    guestsNumber.selectedIndex = event.target.selectedIndex === 0 ? 1 : 0;
  }

  /* ---------------------------------------------------------------------------
   * Обработчик события нажатия кнопки "Опубликовать",
   * запускающий проверку заполнения формы
   */
  function formChangeHandler() {
    publishForm.validate();
  }

  /* ---------------------------------------------------------------------------
   * Обработчик события изменения поля "Адрес"
   */
  function addressChangeHandler() {
    publishForm.addressChange();
  }

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Инициализирует подписки на события
     */
    init: function () {
      element.map.dialogCross.addEventListener('click', dialogCloseHandler);
      element.map.dialogCross.addEventListener('keydown', dialogCloseHandler);
      element.map.background.addEventListener('keydown', dialogCloseHandler);
      element.form.type.addEventListener('change', typeChangeHandler);
      element.form.timein.addEventListener('change', timeChangeHandler);
      element.form.rooms.addEventListener('change', roomsChangeHandler);
      element.form.submit.addEventListener('click', formChangeHandler);
      element.form.title.addEventListener('input', formChangeHandler);
      element.form.price.addEventListener('input', formChangeHandler);
      element.form.address.addEventListener('input', addressChangeHandler);
    },

    /* -------------------------------------------------------------------------
     * Подписывает элемент на событие открытия карточки
     * @param {HTMLElement} - подписываемый элемент
     */
    toDialogOpenHandler: function (elem) {
      elem.addEventListener('click', dialogOpenHandler);
      elem.addEventListener('keypress', dialogOpenHandler);
    }

  };

})();
