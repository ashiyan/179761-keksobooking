/* Подписывает элементы на события */

/* global pin, card, publishForm */

'use strict';

window.subscribes = (function () {

  var element = {
    map: {
      dialogCross: document.querySelector('.dialog__close')
    },
    form: {
      submit: document.querySelector('.form__submit'),
      type: document.querySelector('#type'),
      timein: document.querySelector('#time'),
      timeout: document.querySelector('#timeout'),
      rooms: document.querySelector('#room_number'),
      title: document.querySelector('#title'),
      price: document.querySelector('#price'),
      address: document.querySelector('#address'),
      guests: document.querySelector('#capacity')
    }
  };

  /* ---------------------------------------------------------------------------
   * Обработчик события открытия карточки
   * @param {Object} - объект события
   */
  function dialogOpenHandler(event) {
    var clickedPin = event.currentTarget;
    var id = clickedPin.dataset.adId;

    var pressed = {
      mouseLeft: event.button === 0,
      enter: event.keyCode === 13
    };

    if (pressed.mouseLeft || pressed.enter) {
      pin.deactivateAll();
      pin.activate(clickedPin);
      card.showCard(id);
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
      pin.deactivateAll();
      card.hideCard();
    }
  }

  /* ---------------------------------------------------------------------------
   * Обработчик, синхронизирующий поля времени заезда и выезда
   * @param {Object} - объект события
   */
  function timeChangeHandler(event) {
    var inTimes = ['После 12', 'После 13', 'После 14'];
    var outTimes = ['Выезд до 12', 'Выезд до 13', 'Выезд до 14'];

    function syncValues(field, value) {
      field.value = value;
    }

    window.synchronizeFields(element.form.timein, element.form.timeout,
        inTimes, outTimes, syncValues);
  }

  /* ---------------------------------------------------------------------------
   * Обработчик, выставляющий минимальную цену в соответствии с типом жилья
   * @param {Object} - объект события
   */
  function typeChangeHandler(event) {
    var types = ['Квартира', 'Лачуга', 'Дворец'];
    var prices = [1000, 0, 10000];

    function syncValues(field, value) {
      field.value = value;
      field.min = value;
    }

    window.synchronizeFields(element.form.type, element.form.price,
        types, prices, syncValues);
  }

  /* ---------------------------------------------------------------------------
   * Обработчик, выставляющий кол-во гостей в соответствии с кол-вом комнат
   * @param {Object} - объект события
   */
  function roomsChangeHandler(event) {
    var count = ['1 комната', '2 комнаты', '100 комнат'];
    var guests = ['не для гостей', 'для 3 гостей', 'для 3 гостей'];

    function syncValues(field, value) {
      field.value = value;
    }

    window.synchronizeFields(element.form.rooms, element.form.guests,
        count, guests, syncValues);
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
      document.body.addEventListener('keydown', dialogCloseHandler);
      element.map.dialogCross.addEventListener('click', dialogCloseHandler);
      element.map.dialogCross.addEventListener('keydown', dialogCloseHandler);
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
