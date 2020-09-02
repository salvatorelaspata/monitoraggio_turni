sap.ui.define(
   ['sap/ui/bki/monitoraggio/turni/controller/BaseController'],
   function (BaseController) {
      'use strict';

      return BaseController.extend(
         'sap.ui.bki.monitoraggio.turni.controller.App',
         {
            onInit: function () {
               // This is ONLY for being used within the tutorial.
               // The default log level of the current running environment may be higher than INFO,
               // in order to see the debug info in the console, the log level needs to be explicitly
               // set to INFO here.
               // But for application development, the log level doesn't need to be set again in the code.
               jQuery.sap.log.setLevel(jQuery.sap.log.Level.INFO);

               var oRouter = this.getRouter();

               oRouter.attachRouteMatched(function (oEvent) {
                  var sRouteName = oEvent.getParameter('name');
                  // do something, i.e. send usage statistics to backend
                  // in order to improve our app and the user experience (Build-Measure-Learn cycle)
                  jQuery.sap.log.info(
                     'User accessed route ' +
                        sRouteName +
                        ', timestamp = ' +
                        new Date().getTime()
                  );
               });
            },
         }
      );
   }
);
