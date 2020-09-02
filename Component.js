sap.ui.define(['sap/ui/core/UIComponent'], function (UIComponent) {
   'use strict';

   return UIComponent.extend('sap.ui.bki.monitoraggio.turni.Component', {
      metadata: {
         manifest: 'json',
      },

      init: function () {
         // call the init function of the parent
         UIComponent.prototype.init.apply(this, arguments);

         // create the views based on the url/hash
         this.getRouter().initialize();
      },
   });
});

/* jQuery.sap.declare('sap.ui.bki.monitoraggio.turni.Component');

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
               'Tile.view.xml',
               'Tile.controller.js',
               'mockserver\\metadata.xml',
            ],
         },
      },
      routing: {
         config: {
            routerClass: 'sap.m.routing.Router',
            viewType: 'XML',
            viewPath: 'sap.ui.bki.monitoraggio.turni.TreeTable',
            clearTarget: false,
         },
         routes: [
            // contains routing configuration objects
            {
               pattern: '',
               name: 'tile',
               target: 'tile',
            },
            {
               pattern: 'treeTable',
               name: 'treeTable',
               target: 'treeTable',
            },
         ],
         targets: {
            tile: {
               viewName: 'tile',
            },
            treeTable: {
               viewName: 'treeTable',
            },
         },
      },
   },
});
 */
