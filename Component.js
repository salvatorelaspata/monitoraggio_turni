jQuery.sap.declare('sap.ui.bki.monitoraggio.turni.Component');

sap.ui.core.UIComponent.extend('sap.ui.bki.monitoraggio.turni.Component', {
   metadata: {
      rootView: 'sap.ui.bki.monitoraggio.turni.TreeTable',
      dependencies: {
         libs: ['sap.m', 'sap.ui.comp'],
      },
      config: {
         sample: {
            stretch: true,
            files: [
               'TreeTable.view.xml',
               'TreeTable.controller.js',
               'mockserver\\metadata.xml',
            ],
         },
      },
   },
});
