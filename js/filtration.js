/* Processing and applying filtering options */

'use strict';

window.filtration = (function () {

  /* -------------------------------------------------------------------------
   * Get information of selected filters and returns result for showing pins
   * @param {Array<Object>} - selected options list
   * @param {Array<string>} - names of checked features
   * @return {Array<boolean>}
   */
  function filterProcess(selects, checkboxes) {
    var filterResult = [];
    var adList = window.data.getAdList();

    function isOff(feature) {
      return feature === false;
    }

    function priceToString(price) {
      switch (true) {
        case price < 10000:
          return 'low';
        case price < 50000:
          return 'middle';
        default:
          return 'high';
      }
    }

    adList.forEach(function (ad) {
      var allOptionsIsAny = Object.keys(selects).length === 0;
      var allCheckboxesUncheked = checkboxes.every(isOff);

      if (allOptionsIsAny && allCheckboxesUncheked) {
        filterResult.push(true);
      } else {
        var isSelectsPass = true;
        var adOptions = [];
        adOptions['housing_type'] = ad.offer.type;
        adOptions['housing_price'] = priceToString(ad.offer.price);
        adOptions['housing_room-number'] = ad.offer.rooms.toString();
        adOptions['housing_guests-number'] = ad.offer.guests.toString();

        for (var property in selects) {
          if (adOptions[property] !== selects[property]) {
            isSelectsPass = false;
          }
        }

        var isCheckboxesPass = true;
        var adFeatures = ad.offer.features.slice();

        checkboxes.forEach(function (feature) {
          if (!adFeatures.includes(feature)) {
            isCheckboxesPass = false;
          }
        });

        filterResult.push(isSelectsPass && isCheckboxesPass);
      }
    });

    return filterResult;
  }

  /* ---------------------------------------------------------------------------
   * Handler of the filters selects and checkboxes changing
   * @param {Object} - event object
   */
  function filtersChangeHandler(event) {
    var selects = event.currentTarget.querySelectorAll('select');
    var selectsValues = [];
    [].forEach.call(selects, function (select) {
      if (select.value !== 'any') {
        selectsValues[select.name] = select.value;
      }
    });

    var checkboxes = event.currentTarget.querySelectorAll('input');
    var checkboxesValues = [];
    [].forEach.call(checkboxes, function (checkbox) {
      if (checkbox.checked) {
        checkboxesValues.push(checkbox.value);
      }
    });

    var filters = filterProcess(selectsValues, checkboxesValues);
    window.debounce(function () {
      window.pin.applyFilter(filters);
    });
  }

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Initializes filtration process
     */
    init: function () {
      var filterPanel = document.querySelector('.tokyo__filters');
      filterPanel.addEventListener('change', filtersChangeHandler);
    }

  };

})();
