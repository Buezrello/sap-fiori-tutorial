## Application Details

|               |                                                                                  |
| ------------- | -------------------------------------------------------------------------------- |
| **Generation Date and Time**<br>Thu Nov 21 2024 17:30:18 GMT+0000 (Coordinated Universal Time)  |
| **App Generator**<br>@sap/generator-fiori-freestyle                                             |
| **App Generator Version**<br>1.15.5                                                            |
| **Generation Platform**<br>SAP Business Application Studio                                     |
| **Template Used**<br>simple                                                                    |
| **Service Type**<br>OData URL                                                                  |
| **Service URL**<br>https://services.odata.org/V2/Northwind/Northwind.svc/                      |
| **Module Name**<br>sapui5                                                                      |
| **Application Title**<br>Tutorial                                                             |
| **Namespace**<br>sap.btp                                                                       |
| **UI5 Theme**<br>sap_horizon                                                                   |
| **UI5 Version**<br>1.130.0                                                                     |
| **Enable Code Assist Libraries**<br>False                                                     |
| **Enable TypeScript**<br>False                                                                |
| **Add Eslint configuration**<br>False                                                        |

---

## Overview

This project is an SAP Fiori application designed to interact with the Northwind OData service. It displays product data in a dynamic table and provides various features, such as sorting, filtering, and navigation to product details.

### Features:
1. **Display Products**:
   - Fetch and display products from the Northwind OData service.
   - The table includes columns for:
     - Name (concatenation of `ProductName` and `QuantityPerUnit`)
     - Description
     - Rating (calculated field)
     - Price (`UnitPrice`)
   
2. **Filtering**:
   - Filter products by their rating using a dropdown menu.

3. **Sorting**:
   - Sort products by price in ascending, descending, or unsorted order.

4. **Navigation**:
   - Each product has a "Details" button that navigates to a details page showing all available product information.
   - The details page also displays a `Rating` field (calculated on the main view).

5. **JSON Display**:
   - The details page displays the raw JSON data for the selected product, enriched with `Rating` and `Description`.

---

## Running the Application

To run the application, follow these steps:

### Prerequisites:
1. Ensure you have **Node.js** (LTS version) installed. Download from [Node.js](https://nodejs.org/).
2. Ensure you have access to the SAP Business Application Studio (BAS) or have set up an environment for SAP Fiori applications locally.

### Steps to Run (in SAP Business Application Studio):

1. Open **SAP Business Application Studio**.
2. Import the project by unzipping the provided file and selecting the folder.
3. Start the application by running the **Run Configuration**.
4. Open the provided port preview link (e.g., `https://port8080-workspaces-....`).

### Steps to Run (Locally):

1. **Install Dependencies**: Navigate to the project folder and run:  
   `npm install`

2. **Start the Application**: Run the application with real data from the OData service:  
   `npm start`

3. **Start with Mock Data (Optional)**: Run the application with mock data instead of the OData service:  
   `npm run start-mock`

4. Open your browser and navigate to the provided URL (e.g., `http://localhost:8080`).

---

## File Structure

The key files and folders in this project are:

- `webapp/manifest.json`: Configures the application, including routing and data sources.
- `webapp/controller/View1.controller.js`: Logic for the main product table view.
- `webapp/controller/Details.controller.js`: Logic for the product details view.
- `webapp/view/View1.view.xml`: XML layout for the main product table view.
- `webapp/view/Details.view.xml`: XML layout for the product details view.
- `webapp/mockdata/Products.json`: Mock data for testing.

---

## Additional Notes

- The `README.md` has been updated to include detailed instructions for running and testing the app.
- The application has been thoroughly tested with real and mock data.
