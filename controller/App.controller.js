sap.ui.define(
  ["sap/ui/bki/monitoraggio/turni/controller/BaseController"],
  function (BaseController) {
    "use strict";

    return BaseController.extend(
      "sap.ui.bki.monitoraggio.turni.controller.App",
      {
        onInit: function () {
          jQuery.sap.log.setLevel(jQuery.sap.log.Level.INFO);

          var oRouter = this.getRouter();

          oRouter.attachRouteMatched(function (oEvent) {
            var sRouteName = oEvent.getParameter("name");
            // do something, i.e. send usage statistics to backend
            // in order to improve our app and the user experience (Build-Measure-Learn cycle)
            jQuery.sap.log.info(
              "User accessed route " +
                sRouteName +
                ", timestamp = " +
                new Date().getTime()
            );
          });
        },
      }
    );
  }
);
