# Implementation Tasks

## Task 1: Enhance Backend Orders Service with Filtering and Pagination

Extend the existing Orders Service to support filtering, sorting, and pagination as specified in the design.

**References**: Requirements 1, 2, 3, 4, 5, 7, 8

- [x] 1.1 Create DTOs for query parameters (OrderQueryParamsDto) and response (OrdersResponseDto)
- [x] 1.2 Implement findAllWithFilters method in OrdersService with date range filtering
- [x] 1.3 Add blood type multi-select filtering logic
- [x] 1.4 Add status multi-select filtering logic
- [x] 1.5 Add blood bank name search filtering (case-insensitive partial match)
- [x] 1.6 Implement column sorting with active orders prioritization
- [x] 1.7 Implement pagination logic with page size validation (25, 50, 100)
- [x] 1.8 Add database indexes for performance (hospital_id, placed_at, status, blood_type)

## Task 2: Update Backend Orders Controller

Update the Orders Controller to accept new query parameters and return paginated responses.

**References**: Requirements 1, 2, 3, 4, 5, 7, 8

- [x] 2.1 Update GET /orders endpoint signature with all filter parameters
- [x] 2.2 Add query parameter validation using class-validator
- [x] 2.3 Update response format to include pagination metadata
- [x] 2.4 Add error handling for invalid parameters

## Task 3: Implement WebSocket Gateway for Real-Time Updates

Create a WebSocket Gateway to broadcast order status updates to connected clients.

**References**: Requirement 10

- [x] 3.1 Install socket.io dependencies (@nestjs/websockets, @nestjs/platform-socket.io, socket.io)
- [x] 3.2 Create OrdersGateway with /orders namespace
- [x] 3.3 Implement join:hospital message handler for room management
- [x] 3.4 Implement emitOrderUpdate method to broadcast status changes
- [x] 3.5 Add authentication middleware for WebSocket connections
- [x] 3.6 Integrate gateway with OrdersService.updateStatus method

## Task 4: Create Frontend Type Definitions

Define TypeScript interfaces and types for the frontend application.

**References**: Design - Data Models

- [x] 4.1 Create types file at frontend/health-chain/lib/types/orders.ts
- [x] 4.2 Define Order, BloodType, OrderStatus interfaces
- [x] 4.3 Define BloodBankInfo, HospitalInfo, RiderInfo interfaces
- [x] 4.4 Define OrderFilters, SortConfig, PaginationConfig interfaces
- [x] 4.5 Define OrdersResponse and OrderQueryParams interfaces

## Task 5: Implement URLStateManager Utility

Create utility class to manage URL query parameter synchronization.

**References**: Requirement 6, Design - URLStateManager

- [x] 5.1 Create URLStateManager class at frontend/health-chain/lib/utils/url-state-manager.ts
- [x] 5.2 Implement encodeFilters method to convert filters to URLSearchParams
- [x] 5.3 Implement decodeFilters method to parse URLSearchParams to filters
- [x] 5.4 Implement updateURL method to update browser URL without reload
- [x] 5.5 Implement readFromURL method to initialize state from URL
- [x] 5.6 Handle special characters in blood bank names with proper encoding

## Task 6: Implement CSVExporter Utility

Create utility class to generate and download CSV files from order data.

**References**: Requirement 9, Design - CSVExporter

- [x] 6.1 Create CSVExporter class at frontend/health-chain/lib/utils/csv-exporter.ts
- [x] 6.2 Implement formatOrdersToCSV method with proper column headers
- [x] 6.3 Implement date formatting to ISO 8601 format
- [x] 6.4 Implement downloadCSV method to trigger browser download
- [x] 6.5 Implement export method with filename generation (orders_export_YYYY-MM-DD.csv)
- [x] 6.6 Handle null values (rider, deliveredAt) appropriately in CSV

## Task 7: Implement WebSocketClient Utility

Create utility class to manage WebSocket connections and handle real-time updates.

**References**: Requirement 10, Design - WebSocketClient

- [x] 7.1 Install socket.io-client dependency
- [x] 7.2 Create WebSocketClient class at frontend/health-chain/lib/utils/websocket-client.ts
- [x] 7.3 Implement connect method with authentication
- [x] 7.4 Implement disconnect method with cleanup
- [x] 7.5 Implement onOrderUpdate callback registration
- [x] 7.6 Implement onConnectionChange callback for connection status
- [x] 7.7 Add automatic reconnection logic with exponential backoff

## Task 8: Create StatusBadge Component

Build reusable component to display order status with color coding and icons.

**References**: Requirement 10, Design - StatusBadge Component

- [x] 8.1 Create StatusBadge component at frontend/health-chain/components/orders/StatusBadge.tsx
- [x] 8.2 Implement status-to-color mapping (pending: amber, confirmed: blue, in_transit: purple, delivered: green, cancelled: red)
- [x] 8.3 Implement status-to-icon mapping using lucide-react icons
- [x] 8.4 Add size prop support (sm, md, lg)
- [x] 8.5 Apply Tailwind CSS styling for badges

## Task 9: Create PaginationController Component

Build component to manage pagination controls and page size selection.

**References**: Requirement 8, Design - PaginationController Component

- [x] 9.1 Create PaginationController component at frontend/health-chain/components/orders/PaginationController.tsx
- [x] 9.2 Implement page navigation buttons (first, previous, next, last)
- [x] 9.3 Implement page size selector dropdown (25, 50, 100)
- [x] 9.4 Display current page, total pages, and item range
- [x] 9.5 Disable navigation buttons appropriately (first/previous on page 1, next/last on last page)
- [x] 9.6 Emit onPageChange and onPageSizeChange events

## Task 10: Create OrderTable Component

Build table component to display orders with sorting capabilities.

**References**: Requirements 1, 7, 11, Design - OrderTable Component

- [x] 10.1 Create OrderTable component at frontend/health-chain/components/orders/OrderTable.tsx
- [x] 10.2 Implement table headers with all required columns
- [x] 10.3 Add sort indicators (up/down arrows) to column headers
- [x] 10.4 Implement column header click handlers for sorting
- [x] 10.5 Render order rows with formatted data (dates, quantities)
- [x] 10.6 Integrate StatusBadge component for status column
- [x] 10.7 Highlight active orders with visual distinction
- [x] 10.8 Implement loading state with skeleton rows
- [x] 10.9 Implement empty state with message and clear filters button
- [x] 10.10 Handle null rider and deliveredAt values

## Task 11: Create FilterPanel Component

Build component with all filter controls and export button.

**References**: Requirements 2, 3, 4, 5, 9, Design - FilterPanel Component

- [x] 11.1 Create FilterPanel component at frontend/health-chain/components/orders/FilterPanel.tsx
- [x] 11.2 Implement date range picker with start and end date inputs
- [x] 11.3 Implement blood type multi-select dropdown with all 8 blood types
- [x] 11.4 Implement status multi-select dropdown with all 5 statuses
- [x] 11.5 Implement blood bank search input with debouncing
- [x] 11.6 Display active filter count badge
- [x] 11.7 Add clear all filters button
- [x] 11.8 Add CSV export button
- [x] 11.9 Emit onFiltersChange, onClearFilters, and onExport events

## Task 12: Create OrdersPage Component

Build main page component that orchestrates all child components.

**References**: All Requirements, Design - OrdersPage Component

- [x] 12.1 Create page at frontend/health-chain/app/dashboard/orders/page.tsx
- [x] 12.2 Initialize state from URL parameters on mount
- [x] 12.3 Implement fetchOrders function with API call
- [x] 12.4 Set up WebSocket connection on mount
- [x] 12.5 Implement filter change handler with URL update
- [x] 12.6 Implement sort change handler with URL update
- [x] 12.7 Implement pagination change handlers with URL update
- [x] 12.8 Implement WebSocket order update handler
- [x] 12.9 Implement CSV export handler
- [x] 12.10 Implement error handling with retry logic
- [x] 12.11 Display WebSocket connection status warning
- [x] 12.12 Clean up WebSocket connection on unmount

## Task 13: Add Navigation Link to Orders Page

Add link to the new orders page in the dashboard navigation.

**References**: Requirement 1

- [x] 13.1 Update dashboard layout to include Orders link in navigation
- [x] 13.2 Add appropriate icon for orders page

## Task 14: Write Property-Based Tests for Correctness Properties

Implement property-based tests for all 17 correctness properties using fast-check.

**References**: Design - Correctness Properties, Testing Strategy

- [ ] 14.1* Property 1: Order Table Display Completeness
- [ ] 14.2* Property 2: Hospital-Specific Order Filtering
- [ ] 14.3* Property 3: Active Orders Prioritization
- [ ] 14.4* Property 4: Pagination Page Size Limit
- [ ] 14.5* Property 5: Comprehensive Filter Application
- [ ] 14.6* Property 6: URL State Round-Trip Preservation
- [ ] 14.7* Property 7: Column Sort Ordering
- [ ] 14.8* Property 8: Sort Order Toggle Reversal
- [ ] 14.9* Property 9: Sort Column Exclusivity
- [ ] 14.10* Property 10: Sort Persistence Across State Changes
- [ ] 14.11* Property 11: Pagination Slice Correctness
- [ ] 14.12* Property 12: CSV Export Completeness
- [ ] 14.13* Property 13: CSV Date Format Compliance
- [ ] 14.14* Property 14: CSV Filename Format
- [ ] 14.15* Property 15: WebSocket Order Update Propagation
- [ ] 14.16* Property 16: Status Badge Visual Mapping
- [ ] 14.17* Property 17: Order Repositioning on Status Change

## Task 15: Write Unit Tests for Backend Components

Write unit tests for backend service and controller.

**References**: Design - Testing Strategy

- [ ] 15.1 Test OrdersService.findAllWithFilters with various filter combinations
- [ ] 15.2 Test pagination calculations
- [ ] 15.3 Test sort logic with active orders prioritization
- [ ] 15.4 Test OrdersController parameter validation
- [ ] 15.5 Test error response formatting

## Task 16: Write Unit Tests for Frontend Components

Write unit tests for all frontend components.

**References**: Design - Testing Strategy

- [ ] 16.1 Test StatusBadge rendering for all status types
- [ ] 16.2 Test PaginationController navigation and page size selection
- [ ] 16.3 Test OrderTable rendering, sorting, and empty states
- [ ] 16.4 Test FilterPanel filter interactions and clear button
- [ ] 16.5 Test OrdersPage initial load and state management

## Task 17: Write Unit Tests for Frontend Utilities

Write unit tests for utility classes.

**References**: Design - Testing Strategy

- [ ] 17.1 Test URLStateManager encode/decode with various filter combinations
- [ ] 17.2 Test URLStateManager special character handling
- [ ] 17.3 Test CSVExporter CSV generation and formatting
- [ ] 17.4 Test CSVExporter date formatting
- [ ] 17.5 Test WebSocketClient connection and reconnection logic

## Task 18: Write Integration Tests

Write integration tests for complete user flows.

**References**: Design - Testing Strategy

- [ ] 18.1 Test complete filter → API → display flow
- [ ] 18.2 Test WebSocket connection and update handling
- [ ] 18.3 Test CSV export with specific datasets
- [ ] 18.4 Test URL state synchronization across page refresh

## Task 19: Write WebSocket Tests

Write tests for WebSocket gateway functionality.

**References**: Design - Testing Strategy

- [ ] 19.1 Test OrdersGateway room joining
- [ ] 19.2 Test order update emission to correct rooms
- [ ] 19.3 Test client disconnection handling
- [ ] 19.4 Test authentication middleware

## Checkpoints

### Checkpoint 1: Backend Complete
After completing Tasks 1-3, verify:
- API returns filtered, sorted, and paginated orders
- WebSocket gateway broadcasts updates correctly
- All query parameters work as expected

### Checkpoint 2: Frontend Utilities Complete
After completing Tasks 4-7, verify:
- URL state management works correctly
- CSV export generates valid files
- WebSocket client connects and receives updates

### Checkpoint 3: UI Components Complete
After completing Tasks 8-13, verify:
- All components render correctly
- Filters update URL and trigger API calls
- Table displays and sorts orders correctly
- Pagination works as expected
- CSV export downloads correct data
- Real-time updates appear in the table
