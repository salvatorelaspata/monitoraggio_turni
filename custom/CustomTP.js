sap.ui.define(
  [
    "sap/ui/core/TooltipBase",
    "./CustomTPRender", // preload to avoid sync XHR
  ],
  function (TooltipBase) {
    "use strict";

    /**
     * MINIMAL EXAMPLE!
     * There are no a11y related fixes yet.
     */
    return TooltipBase.extend("sap.ui.bki.monitoraggio.turni.custom.CustomTP", {
      metadata: {
        properties: {
          maxWidth: {
            type: "sap.ui.core.CSSSize",
            defaultValue: "20rem",
          },
          height: {
            type: "sap.ui.core.CSSSize",
            defaultValue: "auto",
          },
          width: {
            type: "sap.ui.core.CSSSize",
            defaultValue: "auto",
          },
          // ... and other properties inherited from TooltipBase
        },
        defaultAggregation: "content",
        aggregations: {
          content: {
            type: "sap.ui.core.Control",
            multiple: false,
            bindable: true,
          },
        },
      },
    });
  }
);
