sap.ui.define([], function () {
  return {
    createFilterFromArray: function (keys, values, operator) {
      var newFilters = [];
      var self = this;

      for (var i = 0, il = keys.length; i < il; i++) {
        if (values[i] === "") continue;

        var tmpFilter = new sap.ui.model.Filter({
          path: keys[i],
          operator: operator || self.getFilterOperator("EQ"),
          value1: values[i],
        });

        newFilters.push(tmpFilter);
      }

      return newFilters;
    },
    createFilterFromObject: function (
      object,
      keys,
      operator,
      operatorFilter,
      notKey
    ) {
      var newFilters = [];
      operatorFilter = operatorFilter || {};
      if (!keys) keys = Object.keys(object);
      var self = this;

      for (var i = 0, il = keys.length; i < il; i++) {
        var key = keys[i];
        if (notKey && notKey.indexOf(key) !== -1) continue;
        var objVal = object[key];
        if (
          typeof objVal === "undefined" ||
          objVal === "" ||
          objVal === "undefined" ||
          objVal === null ||
          (typeof objVal === "array" && objVal.length === 0)
        )
          continue;
        if (!Array.isArray(objVal)) {
          var tmpFilter = new sap.ui.model.Filter({
            path: key,
            operator:
              operatorFilter[key] || operator || self.getFilterOperator("EQ"),
            value1: objVal,
          });

          newFilters.push(tmpFilter);
        } else {
          for (var o = 0, ol = objVal.length; o < ol; o++) {
            var ob = objVal[o];
            var tmpFilter = new sap.ui.model.Filter({
              path: key,
              operator:
                operatorFilter[key] || operator || self.getFilterOperator("EQ"),
              value1: ob,
            });

            newFilters.push(tmpFilter);
          }
        }
      }

      return newFilters;
    },
    getFilterOperator: function (mode) {
      var operator = null;
      switch (mode) {
        case "BT": // FilterOperator between
          operator = sap.ui.model.FilterOperator.BT;
          break;
        case "Contains": // FilterOperator contains
          operator = sap.ui.model.FilterOperator.Contains;
          break;
        case "EndsWith": // FilterOperator ends with
          operator = sap.ui.model.FilterOperator.EndsWith;
          break;
        case "EQ": // FilterOperator equals
          operator = sap.ui.model.FilterOperator.EQ;
          break;
        case "GE": // FilterOperator greater or equals
          operator = sap.ui.model.FilterOperator.GE;
          break;
        case "GT": // FilterOperator greater than
          operator = sap.ui.model.FilterOperator.GT;
          break;
        case "LE": // FilterOperator less or equals
          operator = sap.ui.model.FilterOperator.LE;
          break;
        case "LT": // FilterOperator less than
          operator = sap.ui.model.FilterOperator.LT;
          break;
        case "NE": // FilterOperator not equals
          operator = sap.ui.model.FilterOperator.NE;
          break;
        case "StartsWith": // FilterOperator starts with
          operator = sap.ui.model.FilterOperator.StartsWith;
          break;
        default:
          // FilterOperator equals
          operator = sap.ui.model.FilterOperator.EQ;
          break;
      }

      return operator;
    },
    findObject: function (array, whatObj, noSearch) {
      if (!array || !whatObj || array === null || whatObj === null)
        return false;
      var difference;
      var l = array.length;
      return array.find(function (el, index) {
        difference = 0;
        Object.keys(whatObj).forEach(function (key) {
          if (!noSearch || !noSearch.includes(key))
            if (el[key] !== whatObj[key]) {
              difference++;
            }
        });
        if (difference === 0) return el;
        else if (index + 1 >= l) return false;
      });
    },
    fill: function (txt, maxLength, filler) {
      while (txt.length < maxLength) {
        txt = (filler || "0") + txt;
      }
      return txt;
    },
    jsonCopy: function (src) {
      return JSON.parse(JSON.stringify(src));
    },
    copyObj: function (obj) {
      return $.extend({}, obj, true);
    },
    cloneObj: function (obj, noCopyArray) {
      var _obj = {};
      Object.keys(obj).forEach(function (key) {
        if (!noCopyArray || !noCopyArray.includes(key)) {
          _obj[key] = obj[key];
        }
      });
      return _obj;
    },
  };
});
