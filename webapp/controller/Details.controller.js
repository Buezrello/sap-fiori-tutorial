sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("sap.btp.sapui5.controller.Details", {
        onInit: function () {
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("RouteDetails").attachPatternMatched(this._onObjectMatched, this);
        },
        _onObjectMatched: function (oEvent) {
            const sProductID = oEvent.getParameter("arguments").product;
            const sRating = oEvent.getParameter("arguments").rating;
            const sDescription = oEvent.getParameter("arguments").description;

            console.log("Fetching product with ID:", sProductID);
            console.log("Rating from route:", sRating);
            console.log("Description from route:", sDescription);
        
            const oModel = this.getOwnerComponent().getModel();
            const sPath = `/Products(${sProductID})`;
        
            oModel.read(sPath, {
                success: (oData) => {

                    // Remove unnecessary metadata
                    delete oData.__metadata;
                    delete oData.Category;
                    delete oData.Order_Details;
                    delete oData.Supplier;
                    console.log("Fetched product data:", oData);

                    oData.Rating = parseInt(sRating, 10) || 0;
                    oData.Description = sDescription;
                    // Convert JSON to a pretty string
                    const sPrettyJSON = JSON.stringify(oData, null, 2); // 2 spaces for indentation
                    // Set the pretty JSON to a new model
                    const oPrettyJSONModel = new sap.ui.model.json.JSONModel({ rawJSON: sPrettyJSON });
                    this.getView().setModel(oPrettyJSONModel, "details");
                    console.log("Pretty JSON model set:", this.getView().getModel("details").getData());
                },
                error: (oError) => {
                    console.error("Failed to load product details:", oError);
                }
            });
        }        
    });
});
