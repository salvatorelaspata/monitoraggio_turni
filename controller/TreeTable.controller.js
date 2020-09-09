sap.ui.define(
   ['sap/ui/bki/monitoraggio/turni/controller/BaseController'],
   function (BaseController) {
      'use strict';

      return BaseController.extend(
         'sap.ui.bki.monitoraggio.turni.controller.TreeTable',
         {
            /* sap.ui.controller('sap.ui.bki.monitoraggio.turni.controller.TreeTable', { */
            onInit: function () {
               this.editableRowFabbisogno = false;
               this.editableRowRaggruppamenti = false;
               this.editableTreeTable = false;
               /* 
      jQuery.sap.require('sap.ui.core.util.MockServer');
      var oModel = new sap.ui.model.odata.v2.ODataModel('tree', true);
      this.oMockServer = new sap.ui.core.util.MockServer({
         rootUri: 'tree/',
      });
      this.oMockServer.simulate(
         './mockserver/metadata.xml',
         './mockserver/'
      );
      this.oMockServer.start();
      this.getView().setModel(oModel); 
      */

               //SOSTITUIRE CON ODATA
               var oTable = this.getView().byId('mytreeTable');
               var oModel = new sap.ui.model.json.JSONModel();
               oModel.loadData('data.json');
               oTable.setModel(oModel);
               oTable.bindRows('/root');

               var dataSource = new sap.ui.model.json.JSONModel();
               dataSource.setData({
                  UO: '',
                  utenti: [
                     {
                        Nome: 'utente',
                        Cognome: '1',
                        icon: 'sap-icon://customer',
                     },
                     {
                        Nome: 'utente',
                        Cognome: '2',
                        icon: 'sap-icon://customer',
                     },
                     {
                        Nome: 'utente',
                        Cognome: '3',
                        icon: 'sap-icon://customer',
                     },
                  ],
               });
               this.getView().setModel(dataSource, 'dataSource');
            },
            /* 
   onExit: function () {
      this.oMockServer.stop();
   }, 
   */
            onCloseSelectedDate: function (oEvn) {
               debugger;
               oEvn.getSource().getParent().getParent().close();
            },
            onSelectedDate: function (oEvn) {
               debugger;
               oEvn.getSource().getParent().getParent().close();
            },
            onSelectedDatePT: function (oEvn) {
               debugger;
               oEvn.getSource().getParent().getParent().close();
            },
            onEditableTreeTable: function (oEvn) {
               debugger;
               var self = this;
               var objBinding = oEvn
                  .getSource()
                  .getBindingContext()
                  .getObject();
               var editable = objBinding.Edit;
               var sPath = oEvn.getSource().getBindingContext().sPath;
               var oModel = oEvn.getSource().getBindingContext().getModel();
               oModel.setProperty(sPath + '/Edit', !editable);
            },
            onEditableRaggruppamento: function (oEvent) {
               debugger;
               var oView = this.getView();
               this._oDialog = sap.ui.xmlfragment(
                  'sap.ui.bki.monitoraggio.turni.view.DialogAddRaggruppamento',
                  this
               );

               var objBinding = oEvent
                  .getSource()
                  .getParent()
                  .getParent()
                  .getBindingContext()
                  .getObject();

               var dataModel = this.getView().getModel('dataSource');
               var dataSource = dataModel.getData();
               dataSource.editRaggruppamento = objBinding;
               dataSource.fabbisogni = [
                  {
                     Raggruppamento: 'Raggruppamento A',
                     DataInizio: '22-01-2020',
                     DataFine: '22-03-2020',
                     Tipologia: ['Feriale', 'Festivo'],
                     Orario: '9-13/14-18',
                     Persone: '3',
                     Edit: false,
                  },
                  {
                     Raggruppamento: 'Raggruppamento B',
                     DataInizio: '22-01-2020',
                     DataFine: '22-03-2020',
                     Tipologia: ['Feriale', 'Festivo'],
                     Orario: '14-18',
                     Persone: '2',
                     Edit: false,
                  },
                  {
                     Raggruppamento: 'Raggruppamento C',
                     DataInizio: '22-01-2020',
                     DataFine: '22-03-2020',
                     Tipologia: ['Sabati', 'Domeniche'],
                     Orario: '9-13',
                     Persone: '1',
                     Edit: false,
                  },
                  {
                     Raggruppamento: 'Raggruppamento D',
                     DataInizio: '22-01-2020',
                     DataFine: '22-03-2020',
                     Tipologia: ['Sabati', 'Domeniche'],
                     Orario: '9-13',
                     Persone: '1',
                     Edit: false,
                  },
                  {
                     Raggruppamento: 'Raggruppamento E',
                     DataInizio: '22-01-2020',
                     DataFine: '22-03-2020',
                     Tipologia: ['Sabati', 'Domeniche'],
                     Orario: '9-13',
                     Persone: '1',
                     Edit: false,
                  },
                  {
                     Raggruppamento: 'Raggruppamento F',
                     DataInizio: '22-01-2020',
                     DataFine: '22-03-2020',
                     Tipologia: ['Sabati', 'Domeniche'],
                     Orario: '9-13',
                     Persone: '1',
                     Edit: false,
                  },
                  {
                     Raggruppamento: 'Raggruppamento G',
                     DataInizio: '22-01-2020',
                     DataFine: '22-03-2020',
                     Tipologia: ['Sabati', 'Domeniche'],
                     Orario: '9-13',
                     Persone: '1',
                     Edit: false,
                  },
                  {
                     Raggruppamento: 'Raggruppamento H',
                     DataInizio: '22-01-2020',
                     DataFine: '22-03-2020',
                     Tipologia: ['Sabati', 'Domeniche'],
                     Orario: '9-13',
                     Persone: '1',
                     Edit: false,
                  },
               ];

               this.getView().getModel('dataSource').setData(dataSource);

               this._oDialog.setModel(this.getView().getModel('dataSource'));

               jQuery.sap.syncStyleClass(
                  'sapUiSizeCompact',
                  this.getView(),
                  this._oDialog
               );
               this._oDialog.open();
            },
            onModifyRowFabbisogno: function (oEvn) {
               debugger;
               /*  
               var self = this;
               this.editableRowFabbisogno = !this.editableRowFabbisogno;
               var cells = oEvn.getSource().getParent().getCells();
               cells.map(function (element, index) {
                  if (index !== 0 && index !== 6)
                     element.setEnabled(self.editableRowFabbisogno);
               });

               var button = cells[6];
               if (this.editableRowFabbisogno) {
                  button.setIcon('sap-icon://save');
                  button.setTooltip('Salva');
                  button.setType('Accept');
               } else {
                  button.setIcon('sap-icon://edit');
                  button.setTooltip('Modifica');
                  button.setType('Emphasized');
               } 
               */
               //sostituire pulsante con salvataggio
               var objBinding = oEvn
                  .getSource()
                  .getBindingContext()
                  .getObject();
               var editable = objBinding.Edit;
               var sPath = oEvn.getSource().getBindingContext().sPath;
               var oModel = oEvn.getSource().getBindingContext().getModel();
               oModel.setProperty(sPath + '/Edit', !editable);
            },
            onModifyRowRaggruppamenti: function (oEvn) {
               debugger;
               var self = this;
               this.editableRowRaggruppamenti = !this.editableRowRaggruppamenti;
               var cells = oEvn.getSource().getParent().getCells();
               cells.map(function (element, index) {
                  if (index !== 0 && index !== 1 && index !== 6 && index !== 7)
                     element.setEnabled(self.editableRowRaggruppamenti);
               });

               var button = cells[6];
               if (this.editableRowRaggruppamenti) {
                  button.setIcon('sap-icon://save');
                  button.setTooltip('Salva');
                  button.setType('Accept');
               } else {
                  button.setIcon('sap-icon://edit');
                  button.setTooltip('Modifica');
                  button.setType('Emphasized');
               }
               //sostituire pulsante con salvataggio
            },
            onCloseDialog: function (oEvn) {
               oEvn.getSource().getParent().getParent().close();
            },
            onSaveDialog: function (oEvn) {
               oEvn.getSource().getParent().getParent().close();
            },
            onSaveRaggruppamento: function (oEvn) {
               oEvn.getSource().getParent().getParent().close();
            },
            onSelectDate: function () {
               this._DialogSelectionDate = sap.ui.xmlfragment(
                  'sap.ui.bki.monitoraggio.turni.view.DialogDate',
                  this
               );
               this.getView().addDependent(this._DialogSelectionDate);

               // toggle compact style
               jQuery.sap.syncStyleClass(
                  'sapUiSizeCompact',
                  this.getView(),
                  this._DialogSelectionDate
               );
               this._DialogSelectionDate.open();
            },
            onSelectDatePT: function () {
               this._DialogSelectionDate = sap.ui.xmlfragment(
                  'sap.ui.bki.monitoraggio.turni.view.DialogDatePT',
                  this
               );
               this.getView().addDependent(this._DialogSelectionDate);

               // toggle compact style
               jQuery.sap.syncStyleClass(
                  'sapUiSizeCompact',
                  this.getView(),
                  this._DialogSelectionDate
               );
               this._DialogSelectionDate.open();
            },
            onAddFabbisogno: function (oEvn) {
               debugger;
               var dataModel = this.getView().getModel('dataSource');
               var dataSource = dataModel.getData();
               dataSource.fabbisogni.push({
                  Raggruppamento: '',
                  DataInizio: '2',
                  DataFine: '',
                  Tipologia: [],
                  Orario: '',
                  Persone: '',
                  New: true,
                  Edit: true,
               });
               dataModel.updateBindings();
               /* var self = this;
      var objBinding = oEvn.getSource().getBindingContext().getObject(); */
            },
            onAddRaggruppamento: function (oEvn) {},
            onSubmitDialog: function (oEvent) {
               this.oPersonalizationDialog = sap.ui.xmlfragment(
                  'sap.ui.bki.monitoraggio.turni.view.DialogFabbisogni',
                  this
               );
               var dataModel = this.getView().getModel('dataSource');
               var dataSource = dataModel.getData();
               dataSource.fabbisogni = [
                  {
                     Raggruppamento: 'Raggruppamento A',
                     DataInizio: '22-01-2020',
                     DataFine: '22-03-2020',
                     Tipologia: ['Feriale', 'Festivo'],
                     Orario: '9-13/14-18',
                     Persone: '3',
                     Edit: false,
                  },
                  {
                     Raggruppamento: 'Raggruppamento B',
                     DataInizio: '22-01-2020',
                     DataFine: '22-03-2020',
                     Tipologia: ['Feriale', 'Festivo'],
                     Orario: '14-18',
                     Persone: '2',
                     Edit: false,
                  },
                  {
                     Raggruppamento: 'Raggruppamento C',
                     DataInizio: '22-01-2020',
                     DataFine: '22-03-2020',
                     Tipologia: ['Sabati', 'Domeniche'],
                     Orario: '9-13',
                     Persone: '1',
                     Edit: false,
                  },
                  {
                     Raggruppamento: 'Raggruppamento D',
                     DataInizio: '22-01-2020',
                     DataFine: '22-03-2020',
                     Tipologia: ['Sabati', 'Domeniche'],
                     Orario: '9-13',
                     Persone: '1',
                     Edit: false,
                  },
                  {
                     Raggruppamento: 'Raggruppamento E',
                     DataInizio: '22-01-2020',
                     DataFine: '22-03-2020',
                     Tipologia: ['Sabati', 'Domeniche'],
                     Orario: '9-13',
                     Persone: '1',
                     Edit: false,
                  },
                  {
                     Raggruppamento: 'Raggruppamento F',
                     DataInizio: '22-01-2020',
                     DataFine: '22-03-2020',
                     Tipologia: ['Sabati', 'Domeniche'],
                     Orario: '9-13',
                     Persone: '1',
                     Edit: false,
                  },
                  {
                     Raggruppamento: 'Raggruppamento G',
                     DataInizio: '22-01-2020',
                     DataFine: '22-03-2020',
                     Tipologia: ['Sabati', 'Domeniche'],
                     Orario: '9-13',
                     Persone: '1',
                     Edit: false,
                  },
                  {
                     Raggruppamento: 'Raggruppamento H',
                     DataInizio: '22-01-2020',
                     DataFine: '22-03-2020',
                     Tipologia: ['Sabati', 'Domeniche'],
                     Orario: '9-13',
                     Persone: '1',
                     Edit: false,
                  },
               ];

               this.getView().getModel('dataSource').setData(dataSource);

               this.oPersonalizationDialog.setModel(
                  this.getView().getModel('dataSource')
               );

               this.getView().addDependent(this.oPersonalizationDialog);

               // toggle compact style
               jQuery.sap.syncStyleClass(
                  'sapUiSizeCompact',
                  this.getView(),
                  this.oPersonalizationDialog
               );
               this.oPersonalizationDialog.open();
            },
            onRaggruppamentoDialog: function (oEvent) {
               this._DialogRaggruppamento = sap.ui.xmlfragment(
                  'sap.ui.bki.monitoraggio.turni.view.DialogRaggruppamenti',
                  this
               );

               this.getView().addDependent(this._DialogRaggruppamento);

               // toggle compact style
               jQuery.sap.syncStyleClass(
                  'sapUiSizeCompact',
                  this.getView(),
                  this._DialogRaggruppamento
               );
               this._DialogRaggruppamento.open();
            },
            handleSelectDialogPress: function (oEvent) {
               var oView = this.getView();
               this._oDialogSelectUser = sap.ui.xmlfragment(
                  'sap.ui.bki.monitoraggio.turni.view.DialogUtenti',
                  this
               );
               this._oDialogSelectUser.setModel(
                  this.getView().getModel('dataSource')
               );

               // Multi-select if required
               var bMultiSelect = !!oEvent.getSource().data('multi');
               this._oDialogSelectUser.setMultiSelect(bMultiSelect);

               // Remember selections if required
               var bRemember = !!oEvent.getSource().data('remember');
               this._oDialogSelectUser.setRememberSelections(bRemember);

               // clear the old search filter
               //this._oDialogSelectUser.getBinding('items').filter([]);
               //var dataSource = this.getView().getModel('dataSource');

               // toggle compact style
               jQuery.sap.syncStyleClass(
                  'sapUiSizeCompact',
                  this.getView(),
                  this._oDialogSelectUser
               );
               this._oDialogSelectUser.open();
            },

            onDialogAddRaggruppamenti: function () {
               var oView = this.getView();
               this._oDialog = sap.ui.xmlfragment(
                  'sap.ui.bki.monitoraggio.turni.view.DialogAddRaggruppamento',
                  this
               );
               var dataModel = this.getView().getModel('dataSource');
               var dataSource = dataModel.getData();
               dataSource.fabbisogni = [
                  {
                     Raggruppamento: 'Raggruppamento A',
                     DataInizio: '22-01-2020',
                     DataFine: '22-03-2020',
                     Tipologia: ['Feriale', 'Festivo'],
                     Orario: '9-13/14-18',
                     Persone: '3',
                     Edit: false,
                  },
                  {
                     Raggruppamento: 'Raggruppamento B',
                     DataInizio: '22-01-2020',
                     DataFine: '22-03-2020',
                     Tipologia: ['Feriale', 'Festivo'],
                     Orario: '14-18',
                     Persone: '2',
                     Edit: false,
                  },
                  {
                     Raggruppamento: 'Raggruppamento C',
                     DataInizio: '22-01-2020',
                     DataFine: '22-03-2020',
                     Tipologia: ['Sabati', 'Domeniche'],
                     Orario: '9-13',
                     Persone: '1',
                     Edit: false,
                  },
                  {
                     Raggruppamento: 'Raggruppamento D',
                     DataInizio: '22-01-2020',
                     DataFine: '22-03-2020',
                     Tipologia: ['Sabati', 'Domeniche'],
                     Orario: '9-13',
                     Persone: '1',
                     Edit: false,
                  },
                  {
                     Raggruppamento: 'Raggruppamento E',
                     DataInizio: '22-01-2020',
                     DataFine: '22-03-2020',
                     Tipologia: ['Sabati', 'Domeniche'],
                     Orario: '9-13',
                     Persone: '1',
                     Edit: false,
                  },
                  {
                     Raggruppamento: 'Raggruppamento F',
                     DataInizio: '22-01-2020',
                     DataFine: '22-03-2020',
                     Tipologia: ['Sabati', 'Domeniche'],
                     Orario: '9-13',
                     Persone: '1',
                     Edit: false,
                  },
                  {
                     Raggruppamento: 'Raggruppamento G',
                     DataInizio: '22-01-2020',
                     DataFine: '22-03-2020',
                     Tipologia: ['Sabati', 'Domeniche'],
                     Orario: '9-13',
                     Persone: '1',
                     Edit: false,
                  },
                  {
                     Raggruppamento: 'Raggruppamento H',
                     DataInizio: '22-01-2020',
                     DataFine: '22-03-2020',
                     Tipologia: ['Sabati', 'Domeniche'],
                     Orario: '9-13',
                     Persone: '1',
                     Edit: false,
                  },
               ];

               this.getView().getModel('dataSource').setData(dataSource);

               this._oDialog.setModel(this.getView().getModel('dataSource'));

               jQuery.sap.syncStyleClass(
                  'sapUiSizeCompact',
                  this.getView(),
                  this._oDialog
               );
               this._oDialog.open();
            },

            handleSearch: function (oEvent) {
               var sValue = oEvent.getParameter('value');
               var oFilter = new sap.ui.model.Filter(
                  'Nome',
                  sap.ui.model.FilterOperator.Contains,
                  sValue
               );
               var oBinding = oEvent.getSource().getBinding('items');
               oBinding.filter([oFilter]);
            },

            handleClose: function (oEvent) {
               var aContexts = oEvent.getParameter('selectedContexts');
               if (aContexts.length) {
                  sap.m.MessageToast.show(
                     'You have chosen ' +
                        aContexts
                           .map(function (oContext) {
                              return oContext.getObject().Nome;
                           })
                           .join(', ')
                  );
               }
               oEvent.getSource().getBinding('items').filter([]);
            },

            onSelectedRow: function (oEvn) {
               if (!oEvn.getParameter('rowContext')) return false;
               var sPath = oEvn.getParameter('rowContext').sPath; //"/root/0/0/0"
               var tableModel = oEvn.getSource().getBinding().getModel();

               var objBinding = tableModel.getProperty(sPath);

               var dataModel = this.getView().getModel('dataSource');
               dataModel.setProperty('/selected', objBinding);
            },
            onSelectedUO: function (oEvn) {
               var select = oEvn.getSource();
               var selectedKey = select.getSelectedKey();
               console.log(selectedKey);
               var dataModel = this.getView().getModel('dataSource');
               console.log(dataModel.getData(), dataModel.oData);
            },
            oData: function () {},
         }
      );
   }
);
