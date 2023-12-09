# Star Wars API Test Suite
This test suite is designed to interact with the Star Wars API and validate the functionality for fetching film and character details. The suite includes separate modules for testing films and people endpoints, along with interface definitions for characters, films, and generic search results.

## Features

- **Easy Setup**: Get started quickly with minimal configuration.
- **Expressive Tests**: Write expressive tests using Mocha and Axios
- **Customizable**: Extend the framework with your own utility functions and configurations.

## Project structure:

1. axiosConfiguration.ts    

    This file contains the Axios configuration for interacting with the Star Wars API. It includes the base URL, timeout, and validation status.

2. film.test.ts

    This module contains tests of the Star Wars Films API using Axios and assertions. It includes test cases for fetching film details by ID, searching films by title, and listing all films.

3. people.test.ts

    This file contains the Star Wars People API using Axios and assertions. It includes test cases for fetching character details by ID, searching characters by name, and listing all characters.

4. interfaces.ts

    This file defines TypeScript interfaces for representing characters, films, and generic search results in the Star Wars universe.

   
## Prerequisites

- [Node.js](https://nodejs.org/) installed
- Understanding of API concepts

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/api-testing-node-mocha.git
   ```

2. Install dependencies
    ```bash
    cd api-testing-node-mocha
    npm install
    ```

3. Run tests
    ```bash
    npm test
    ```

4. Run every test file individually:
    ```bash
    npx ts-mocha test/filmApi.test.ts --timeout 15000
    npx ts-mocha test/eopleApi.test.ts --timeout 15000
    ```
Note that when running test files individually, adding a command line argument to increase timeout is useful as endpoints have a fairly high latency.