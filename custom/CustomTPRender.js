sap.ui.define(
  ["sap/ui/core/theming/Parameters", "sap/ui/core/library"],
  function (ThemingParameters, sapCoreLib) {
    "use strict";

    const OpenState = sapCoreLib.OpenState;
    const backgroundColor = ThemingParameters.get(
      "sapUiGroupContentBackground"
    ); // shouldn't be called before Core init to avoid sync XHR

    return {
      apiVersion: 2,
      render: function (renderManager, control) {
        if (control._getPopup().getOpenState() == OpenState.OPENING) {
          renderManager
            .openStart("div", control)
            .style("max-width", control.getMaxWidth())
            .style("height", control.getHeight())
            .style("width", control.getWidth())
            .style("background-color", backgroundColor)
            .openEnd()
            .renderControl(control.getAggregation("content"))
            .close("div");
        }
      },
    };
  },
  true
);
