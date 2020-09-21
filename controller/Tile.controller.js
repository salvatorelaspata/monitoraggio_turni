sap.ui.controller('sap.ui.bki.monitoraggio.turni.controller.Tile', {
   onInit: function (evt) {
      // set mock model
      var sPath = jQuery.sap.getModulePath(
         'sap.ui.bki.monitoraggio.turni',
         '/tile.json'
      );
      var oModel = new sap.ui.model.json.JSONModel(sPath);
      this.getView().setModel(oModel);

      /* sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
      // this component should automatically initialize the router!
      this.getRouter().initialize(); */
   },
   onRouteOrSubRoutesMatched: function () {
      sap.ui.core.UIComponent.getRouterFor(that).navTo('yourOtherRoute');
   },

   handleEditPress: function (evt) {
      var oTileContainer = this.getView().byId('container');
      var newValue = !oTileContainer.getEditable();
      oTileContainer.setEditable(newValue);
      evt.getSource().setText(newValue ? 'Done' : 'Edit');
   },

   handleBusyPress: function (evt) {
      var oTileContainer = this.getView().byId('container');
      var newValue = !oTileContainer.getBusy();
      oTileContainer.setBusy(newValue);
      evt.getSource().setText(newValue ? 'Done' : 'Busy state');
   },

   handleTileDelete: function (evt) {
      var tile = evt.getParameter('tile');
      evt.getSource().removeTile(tile);
   },

   onPressTile: function (oEvn) {
      debugger;
      var standardTile = oEvn.getSource();
      var id = standardTile.getCustomData()[0].getValue();
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

      switch (id) {
         case '1':
            oRouter.navTo('treeTable');
            break;
         case '2':
            oRouter.navTo('pianificazioneAT');
            break;
         default:
            break;
      }

      //this.oRouter.navTo('TreeTable');
   },
});
