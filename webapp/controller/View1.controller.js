sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
], (Controller, Filter, FilterOperator, Sorter) => {
    "use strict";

    return Controller.extend("sap.btp.sapui5.controller.View1", {
        onInit() {
            const oModel = this.getOwnerComponent().getModel(); // Retrieve the OData model
            
            // Request the Product data and enhance it
            oModel.read("/Products", {
                success: (oData) => {
                    console.log("Fetched Data:", oData); // Debug: Log the fetched data
                    const aProducts = oData.results.map((oProduct) => {
                        // Add a Rating property
                        oProduct.Rating = Math.floor(Math.random() * 5) + 1; // Random rating 1-5
                        oProduct.UnitPrice = parseFloat(oProduct.UnitPrice); // Ensure UnitPrice is a number
                        // Concatenate ProductName and QuantityPerUnit for Description
                        oProduct.Description = `${oProduct.ProductName} - ${oProduct.QuantityPerUnit}`;
                        return oProduct;
                    });

                    console.log("Enhanced Data:", aProducts); // Debug: Log the enhanced data
                    // Create a new JSON model with enhanced data
                    const oEnhancedModel = new sap.ui.model.json.JSONModel({ Products: aProducts });
                    this.getView().setModel(oEnhancedModel); // Set the JSON model to the view
                    
                },
                error: (oError) => {
                    console.error("Failed to load Products data:", oError);
                }
            });
        },
        onFilterRating(oEvent) {
            // Get selected Rating from dropdown
            const sSelectedRating = oEvent.getParameter("selectedItem").getKey();
            const oTable = this.byId("productsTable");
            console.log("Table Object:", oTable); // Debug: Log the table object
            if (!oTable) {
                console.error("Table not found!");
                return;
            }

            const oBinding = oTable.getBinding("items");

            if (sSelectedRating) {
                // Apply filter for the selected rating
                console.log("selected rating: ", sSelectedRating)
                const oFilter = new Filter("Rating", FilterOperator.EQ, parseInt(sSelectedRating, 10));
                console.log("filtered rating: ", oFilter)
                oBinding.filter([oFilter]);
            } else {
                // Clear filters if "All Ratings" is selected
                oBinding.filter([]);
            }
        },
        onSortPrice() {
            const oTable = this.byId("productsTable");
            const oBinding = oTable.getBinding("items");
            const oButton = this.byId("sortPriceButton"); // Get the button to update text
        
            // Maintain a sorting state
            if (!this.sortState) {
                this.sortState = "asc"; // Initial state is ascending
            }
        
            if (this.sortState === "asc") {
                // Apply ascending sort
                const oSorter = new sap.ui.model.Sorter("UnitPrice", false); // false = ascending
                oBinding.sort(oSorter);
                this.sortState = "desc"; // Next state is descending
                oButton.setText("Sort by Price (Descending)");
            } else if (this.sortState === "desc") {
                // Apply descending sort
                const oSorter = new sap.ui.model.Sorter("UnitPrice", true); // true = descending
                oBinding.sort(oSorter);
                this.sortState = "none"; // Next state is unsorted
                oButton.setText("Clear Sorting");
            } else {
                // Clear sorting (unsorted)
                oBinding.sort(null); // Reset to original state
                this.sortState = "asc"; // Next state is ascending
                oButton.setText("Sort by Price (Ascending)");
            }
        },
        onShowDetails(oEvent) {
            const oItem = oEvent.getSource().getParent(); // Get the parent row
            const oContext = oItem.getBindingContext(); // Get the context of the row
            const oData = oContext.getObject(); // Get the data of the selected row
            console.log("oData: ", oData);
        
            // Pass Product ID and Rating
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteDetails", {
                product: oData.ProductID,
                rating: oData.Rating ? oData.Rating.toString() : "",
                description: oData.Description // Pass Description
            });
        }     
    });
});
