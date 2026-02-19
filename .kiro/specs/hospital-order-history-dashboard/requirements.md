# Requirements Document

## Introduction

The Hospital Order History Dashboard provides hospitals with a comprehensive interface to view, filter, and export their blood order history. This feature enables hospital staff to track past and active orders, analyze ordering patterns, and maintain records through CSV exports. The dashboard includes real-time status updates for active orders and supports advanced filtering with URL-based state persistence for sharing and bookmarking specific views.

## Glossary

- **Order_History_Dashboard**: The web interface displaying hospital blood orders in a tabular format with filtering and export capabilities
- **Order_Table**: The data table component displaying order records with sortable columns
- **Filter_Panel**: The UI component containing all filter controls (date range, blood type, status, blood bank)
- **CSV_Exporter**: The client-side module that generates CSV files from filtered order data
- **Status_Badge**: The UI component displaying real-time order status with visual indicators
- **URL_State_Manager**: The module responsible for synchronizing filter state with URL query parameters
- **Pagination_Controller**: The component managing page navigation and page size configuration
- **WebSocket_Client**: The client-side service receiving real-time order status updates
- **Orders_API**: The backend REST endpoint providing order data (GET /orders)
- **Active_Order**: An order with status other than "delivered" or "cancelled"
- **Blood_Type**: The classification of blood (A+, A-, B+, B-, AB+, AB-, O+, O-)
- **Order_Status**: The current state of an order (pending, confirmed, in_transit, delivered, cancelled)

## Requirements

### Requirement 1: Display Order History Table

**User Story:** As a hospital staff member, I want to view all my hospital's orders in a table, so that I can review order history and track current orders.

#### Acceptance Criteria

1. THE Order_History_Dashboard SHALL display an Order_Table with columns for Order ID, Blood Type, Quantity, Blood Bank, Status, Rider, Placed At, and Delivered At
2. WHEN the Order_History_Dashboard loads, THE Order_Table SHALL fetch and display orders for the authenticated hospital
3. THE Order_Table SHALL display Active_Orders at the top of the table before completed orders
4. WHEN no orders exist for the hospital, THE Order_History_Dashboard SHALL display an empty state message
5. THE Order_Table SHALL display a maximum of 25, 50, or 100 rows per page based on user selection

### Requirement 2: Filter Orders by Date Range

**User Story:** As a hospital staff member, I want to filter orders by date range, so that I can focus on orders from specific time periods.

#### Acceptance Criteria

1. THE Filter_Panel SHALL provide a date range picker with start date and end date inputs
2. WHEN a date range is selected, THE Order_Table SHALL display only orders where Placed At falls within the selected range
3. WHEN the date range filter is applied, THE URL_State_Manager SHALL update the URL query parameters with the selected dates
4. WHEN the page loads with date range query parameters, THE Filter_Panel SHALL initialize with those dates and THE Order_Table SHALL display filtered results
5. WHEN the date range filter is cleared, THE Order_Table SHALL display all orders

### Requirement 3: Filter Orders by Blood Type

**User Story:** As a hospital staff member, I want to filter orders by blood type, so that I can analyze ordering patterns for specific blood types.

#### Acceptance Criteria

1. THE Filter_Panel SHALL provide a multi-select dropdown for Blood_Type selection
2. WHEN one or more Blood_Types are selected, THE Order_Table SHALL display only orders matching the selected Blood_Types
3. WHEN the Blood_Type filter is applied, THE URL_State_Manager SHALL update the URL query parameters with the selected Blood_Types
4. WHEN the page loads with Blood_Type query parameters, THE Filter_Panel SHALL initialize with those selections and THE Order_Table SHALL display filtered results
5. WHEN the Blood_Type filter is cleared, THE Order_Table SHALL display orders of all blood types

### Requirement 4: Filter Orders by Status

**User Story:** As a hospital staff member, I want to filter orders by status, so that I can focus on orders in specific states.

#### Acceptance Criteria

1. THE Filter_Panel SHALL provide a multi-select dropdown for Order_Status selection
2. WHEN one or more Order_Status values are selected, THE Order_Table SHALL display only orders matching the selected statuses
3. WHEN the Order_Status filter is applied, THE URL_State_Manager SHALL update the URL query parameters with the selected statuses
4. WHEN the page loads with Order_Status query parameters, THE Filter_Panel SHALL initialize with those selections and THE Order_Table SHALL display filtered results
5. WHEN the Order_Status filter is cleared, THE Order_Table SHALL display orders with all statuses

### Requirement 5: Filter Orders by Blood Bank

**User Story:** As a hospital staff member, I want to filter orders by blood bank, so that I can track orders from specific suppliers.

#### Acceptance Criteria

1. THE Filter_Panel SHALL provide a search input for blood bank filtering
2. WHEN a blood bank name is entered, THE Order_Table SHALL display only orders where the Blood Bank name contains the search text
3. WHEN the blood bank filter is applied, THE URL_State_Manager SHALL update the URL query parameters with the search text
4. WHEN the page loads with blood bank query parameters, THE Filter_Panel SHALL initialize with that search text and THE Order_Table SHALL display filtered results
5. WHEN the blood bank filter is cleared, THE Order_Table SHALL display orders from all blood banks

### Requirement 6: Persist Filter State in URL

**User Story:** As a hospital staff member, I want my filter selections saved in the URL, so that I can bookmark or share specific filtered views with colleagues.

#### Acceptance Criteria

1. WHEN any filter is applied, THE URL_State_Manager SHALL update the browser URL with query parameters representing all active filters
2. WHEN the page is refreshed, THE Order_History_Dashboard SHALL restore all filters from URL query parameters and display the filtered results
3. WHEN a URL with filter query parameters is shared and opened, THE Order_History_Dashboard SHALL apply those filters and display the corresponding results
4. THE URL_State_Manager SHALL encode filter values properly to handle special characters in blood bank names
5. WHEN filters are cleared, THE URL_State_Manager SHALL remove the corresponding query parameters from the URL

### Requirement 7: Sort Order Table Columns

**User Story:** As a hospital staff member, I want to sort the order table by any column, so that I can organize data according to my needs.

#### Acceptance Criteria

1. THE Order_Table SHALL display a sort indicator on each column header
2. WHEN a column header is clicked, THE Order_Table SHALL sort rows by that column in ascending order
3. WHEN a sorted column header is clicked again, THE Order_Table SHALL reverse the sort order to descending
4. WHEN a different column header is clicked, THE Order_Table SHALL sort by the new column and clear the previous sort
5. THE Order_Table SHALL maintain the sort order when filters are applied or pagination changes

### Requirement 8: Paginate Order Results

**User Story:** As a hospital staff member, I want to navigate through pages of orders, so that I can efficiently browse large order histories.

#### Acceptance Criteria

1. THE Pagination_Controller SHALL display page navigation controls below the Order_Table
2. THE Pagination_Controller SHALL provide options to select page size of 25, 50, or 100 rows
3. WHEN a page size is selected, THE Order_Table SHALL display that number of rows per page and reset to page 1
4. WHEN pagination controls are used, THE Order_Table SHALL fetch and display the corresponding page of results
5. THE Pagination_Controller SHALL display the total number of orders and the current range being displayed
6. WHEN filters are applied, THE Pagination_Controller SHALL reset to page 1 and update the total count

### Requirement 9: Export Filtered Orders to CSV

**User Story:** As a hospital staff member, I want to export the current filtered view as a CSV file, so that I can maintain records and perform offline analysis.

#### Acceptance Criteria

1. THE Order_History_Dashboard SHALL display an export button in the Filter_Panel
2. WHEN the export button is clicked, THE CSV_Exporter SHALL generate a CSV file containing all orders matching the current filters and sort order
3. THE CSV_Exporter SHALL include all Order_Table columns in the CSV output with appropriate headers
4. THE CSV_Exporter SHALL format date fields in ISO 8601 format in the CSV output
5. WHEN the CSV is generated, THE CSV_Exporter SHALL trigger a browser download with filename "orders_export_YYYY-MM-DD.csv"
6. THE CSV_Exporter SHALL generate the CSV from client-side data without making additional API requests

### Requirement 10: Display Real-Time Order Status Updates

**User Story:** As a hospital staff member, I want to see live status updates for active orders, so that I can track order progress without refreshing the page.

#### Acceptance Criteria

1. WHEN the Order_History_Dashboard loads, THE WebSocket_Client SHALL establish a connection to receive order status updates
2. WHEN an order status changes, THE WebSocket_Client SHALL receive the update and THE Order_Table SHALL update the corresponding Status_Badge
3. THE Status_Badge SHALL display different visual indicators for each Order_Status (color coding and icons)
4. WHEN an Active_Order is updated to delivered or cancelled status, THE Order_Table SHALL move that order from the active section to the completed section
5. THE Status_Badge SHALL update without causing the entire Order_Table to re-render or lose user context

### Requirement 11: Display Empty State for No Results

**User Story:** As a hospital staff member, I want to see a clear message when no orders match my filters, so that I understand the table is working correctly.

#### Acceptance Criteria

1. WHEN no orders match the applied filters, THE Order_Table SHALL display an empty state message
2. THE empty state message SHALL indicate that no orders match the current filters
3. THE empty state SHALL include a button to clear all filters
4. WHEN the clear filters button is clicked, THE Filter_Panel SHALL reset all filters and THE Order_Table SHALL display all orders
5. WHEN a hospital has no orders at all, THE Order_Table SHALL display a different empty state message indicating no order history exists

### Requirement 12: Validate and Handle API Errors

**User Story:** As a hospital staff member, I want to see clear error messages when data cannot be loaded, so that I understand when technical issues occur.

#### Acceptance Criteria

1. WHEN the Orders_API request fails, THE Order_History_Dashboard SHALL display an error message to the user
2. THE error message SHALL include a retry button to attempt loading the data again
3. WHEN the retry button is clicked, THE Order_History_Dashboard SHALL make a new request to the Orders_API
4. IF the WebSocket_Client connection fails, THE Order_History_Dashboard SHALL display a warning that real-time updates are unavailable
5. THE Order_History_Dashboard SHALL log API errors to the browser console for debugging purposes
