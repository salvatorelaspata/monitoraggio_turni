sap.ui.define(
   ['sap/ui/bki/monitoraggio/turni/controller/BaseController'],
   function (BaseController) {
      'use strict';

      return BaseController.extend(
         'sap.ui.bki.monitoraggio.turni.controller.PianificazioneAT',
         {
            onInit: function (evt) {
               // set mock model
               var oModelPersone = new sap.ui.model.json.JSONModel({});
               var sPathPersone = jQuery.sap.getModulePath(
                  'sap.ui.bki.monitoraggio.turni',
                  '/persone.json'
               );
               oModelPersone.loadData(sPathPersone, '', false);

               var oModelRagg = new sap.ui.model.json.JSONModel({});
               var sPathRagg = jQuery.sap.getModulePath(
                  'sap.ui.bki.monitoraggio.turni',
                  '/raggruppamenti.json'
               );
               oModelRagg.loadData(sPathRagg, '', false);

               var oModel = new sap.ui.model.json.JSONModel({
                  raggruppamenti: oModelRagg.getData(),
                  persone: oModelPersone.getData(),
               });
               this.getView().setModel(oModel);
            },
            onPressPersona: function (oEvent) {
               var dataModel = this.getView().getModel();
               var propertyPath = oEvent
                  .getSource()
                  .getSelectedContextPaths()[0];
               var obj = this.getView().getModel().getProperty(propertyPath);

               dataModel.setProperty(
                  '/RaggruppamentiPersona',
                  obj.raggruppamenti
               );
            },
            handleSearchPerson: function (oEvent) {
               var sValue = oEvent.getParameter('query');
               var oFilter = new sap.ui.model.Filter({
                  filters: [
                     new sap.ui.model.Filter(
                        'Nome',
                        sap.ui.model.FilterOperator.Contains,
                        sValue
                     ),
                     new sap.ui.model.Filter(
                        'Cognome',
                        sap.ui.model.FilterOperator.Contains,
                        sValue
                     ),
                     ,
                     new sap.ui.model.Filter(
                        'CID',
                        sap.ui.model.FilterOperator.Contains,
                        sValue
                     ),
                  ],
                  and: false,
               });

               var oBinding = this.getView()
                  .byId('personTable')
                  .getBinding('items');

               oBinding.filter([oFilter]);
            },
            handleSearchRagg: function (oEvent) {
               var sValue = oEvent.getParameter('query');
               var oFilter = new sap.ui.model.Filter(
                  'Nome',
                  sap.ui.model.FilterOperator.Contains,
                  sValue
               );

               var oBinding = this.getView()
                  .byId('raggruppamentoTable')
                  .getBinding('items');

               oBinding.filter([oFilter]);
            },
            addRaggruppamento: function (oEvn) {
               var dataModel = this.getView().getModel();
               var dataSource = dataModel.getData();

               var obj = {
                  Nome: '',
                  key: '',
                  Descrizione: '',
                  ValidoDa: '',
                  ValidoA: '',
                  UO: '',
                  Edit: true,
               };

               var indexPersone = this.getView()
                  .byId('personTable')
                  .getSelectedContextPaths()[0]
                  .split('/')[3];

               dataSource.persone.Persone[indexPersone].raggruppamenti.push(
                  obj
               );
               dataModel.updateBindings();

               debugger;
            },
            deleteRow: function (oEvent) {
               var oTable = this.getView().byId('raggruppamentoTable');
               oTable.removeItem(oEvent.getParameter('listItem'));
            },
            onChangeRagg: function (oEvn) {},
         }
      );
   }
);
