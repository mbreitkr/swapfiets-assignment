# Swapfiets Assignment

## About

This project was done as part of a Swapfiets interview take-home assignment. The website allows you to search for stolen or missing bikes by city name, and was built with Angular v19.

### Project requirements

The requirements from Swapfiets were listed as follows:

We ask you to create a simple application using Angular and the following
open API:

- https://bikeindex.org/documentation/api_v3

Acceptance Criteria

- The final application should consist of a Bike Search and a Bike Detail
  view
  - Bike Search
    - The user can search for bikes by a given city name
    - A list of bikes is provided by: GET /v3/search
    - A list of results are displayed below the search input
      - Each result has a link that navigates to a bike detail page.
  - Bike Detail
    - Use bikes API to fetch details about the bike. GET /v3/bikes/{id}
    - Display on the bike detail page some information about a bike
      and the picture of the bike.

## Getting started

### Prerequisites

- Node.js version 18.19.1 or newer

### Installation

To get the project set up locally:

1. Clone the repo found at https://github.com/mbreitkr/swapfiets-assignment
2. In your terminal, navigate to the cloned repo and run:

```bash
npm install
```

### Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Usage

To use the application, simply enter a city name in the search bar and browse through the list of matching bikes. This section will be updated as more features are added to the application.

## Future improvements

Some features I would like to add or update with more time include:

- Visual cleanup of Angular Material paginator component on small screens
- Unit testing
- Check that matching bike count isn't 0 before fetching first page of results
- Integration/E2E testing
- Caching of search results
- Adding Geolocation for easier and cleaner city search
