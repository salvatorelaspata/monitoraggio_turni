sap.ui.define(
  ["sap/ui/bki/monitoraggio/turni/controller/BaseController"],
  function (BaseController) {
    "use strict";

    return BaseController.extend(
      "sap.ui.bki.monitoraggio.turni.controller.PianificazioneAT",
      {
        onInit: function (evt) {
          // set mock model
          $("body").on("click", ".customMouseOver", function () {
            var _e = $(this);
            var _c = _e.control(0);
            var _m = _c.data("valid");
            if (_m.length > 0) sap.m.MessageToast.show(_m);
          });
          var oModelPersone = new sap.ui.model.json.JSONModel({});
          //  this.formatter = sap.ui.bki.monitoraggio.turni.Util.Formatter;
          var sPathPersone = jQuery.sap.getModulePath(
            "sap.ui.bki.monitoraggio.turni",
            "/persone.json"
          );
          oModelPersone.loadData(sPathPersone, "", false);

          var oModelRagg = new sap.ui.model.json.JSONModel({});
          var sPathRagg = jQuery.sap.getModulePath(
            "sap.ui.bki.monitoraggio.turni",
            "/raggruppamenti.json"
          );
          oModelRagg.loadData(sPathRagg, "", false);

          var oModel = new sap.ui.model.json.JSONModel({
            raggruppamenti: oModelRagg.getData().Raggruppamenti,
            persone: oModelPersone.getData().Persone,
          });
          var parsedModel = new sap.ui.model.json.JSONModel(
            oModelRagg.getData()
          );
          this.model = oModel;
          this.parsedModel = parsedModel;
          this.getView().setModel(parsedModel, "parsedModel");
          this.getView().setModel(oModel);
          //  parseLista();
        },
        onChangeRaggruppamento: function (evt) {
          var source = evt.getSource();
          var item = evt.getParameter("selectedItem");
          var model = this.parsedModel;
          var _i = item.getBindingContext("parsedModel").getObject();
          var row = source.getParent();
          var path = row.getBindingContext("parsedModel").getPath();
          var _r = row.getBindingContext("parsedModel").getObject();
          _r.ValiditaRaggruppamento = _i.ValiditaRaggruppamento;
          model.setProperty(path, _r);
          // model.refresh(true);
        },
        onAfterRender: function () {
          var self = this;
        },
        // handleSearchPerson: function (oEvent) {
        //    var sValue = oEvent.getParameter('query');
        //    var oFilter = new sap.ui.model.Filter({
        //       filters: [
        //          new sap.ui.model.Filter(
        //             'Nome',
        //             sap.ui.model.FilterOperator.Contains,
        //             sValue
        //          ),
        //          new sap.ui.model.Filter(
        //             'Cognome',
        //             sap.ui.model.FilterOperator.Contains,
        //             sValue
        //          ),
        //          ,
        //          new sap.ui.model.Filter(
        //             'CID',
        //             sap.ui.model.FilterOperator.Contains,
        //             sValue
        //          ),
        //       ],
        //       and: false,
        //    });

        //    var oBinding = this.getView()
        //       .byId('personTable')
        //       .getBinding('items');

        //    oBinding.filter([oFilter]);
        // },
        // handleSearchRagg: function (oEvent) {
        //    var sValue = oEvent.getParameter('query');
        //    var oFilter = new sap.ui.model.Filter(
        //       'Nome',
        //       sap.ui.model.FilterOperator.Contains,
        //       sValue
        //    );

        //    var oBinding = this.getView()
        //       .byId('raggruppamentoTable')
        //       .getBinding('items');

        //    oBinding.filter([oFilter]);
        // },

        //   parseLista: function () {
        //     var self = this;
        //     var data = this.model.getData();
        //     var persone = data.persone || [];
        //     var raggruppamenti = data.raggruppamenti;
        //     var list = [];

        //     var i = 0;
        //  var p = {
        //    key: "rA",
        //    Nome: "Raggruppamento A",
        //    persone: [
        //      {
        //        CID: "001235",
        //        Nome: "Marco",
        //        Cognome: "Bruni",
        //        Nome: "Raggruppamento A",
        //        key: "rA",
        //        Descrizione: "Descr. Raggruppamento A",
        //        ValiditaRaggruppamento: "31/12/9999",
        //        ValidoDa: "01/01/2020",
        //        ValidoA: "31/08/2020",
        //        UO: "Divisione 1",
        //      },
        //    ],
        //  };

        //     raggruppamenti.forEach(function (rel, pos) {
        //       var _key = rel.key;
        //       var _text = rel.text;
        //       persone.forEach(function (pel, p) {
        //         var _raggruppamenti = pel.raggruppamenti || [];
        //         var found = self.findObject(_raggruppamenti, { key: _key });
        //         if (!found) continue;

        //         var p = {
        //           key: "rA",
        //           Nome: "Raggruppamento A",
        //           persone: [
        //             {
        //               CID: "001235",
        //               Nome: "Marco",
        //               Cognome: "Bruni",
        //               Nome: "Raggruppamento A",
        //               key: "rA",
        //               Descrizione: "Descr. Raggruppamento A",
        //               ValiditaRaggruppamento: "31/12/9999",
        //               ValidoDa: "01/01/2020",
        //               ValidoA: "31/08/2020",
        //               UO: "Divisione 1",
        //             },
        //           ],
        //         };
        //       });
        //     });
        //     persone.forEach(function (_el, pos) {
        //       console.log(_el, pos);
        //       if (list.length === 0 || list[i].Materiale !== _el.Materiale) {
        //         var el = self.Formatter.cloneObj(_el);
        //         if (pos != 0) i++;
        //         el.header = true;
        //         el.sub = [];
        //         list[i] = el;
        //         list[i].sub.push(_el);
        //         self.objList[list[i].Materiale] = el;
        //       } else {
        //         self.objList[_el.Materiale].sub.push(_el);
        //       }
        //     });
        //     self.pageModel.setProperty("/parsedList", list);
        //   },
      }
    );
  }
);
