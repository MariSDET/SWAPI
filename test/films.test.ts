// Import necessary modules
import assert from "assert";
import axios from "axios";
import { Film, SearchResult } from "../interface";
import { axiosConfiguration } from "../src/config/axiosConfiguration";

// Define the endpoint URI for the films list
const filmsListEndpointURI: string = "/films/";

// Function to generate the endpoint URI for a specific film ID
function filmsEndpointURI(id: number): string {
    return `/films/${id}`;
}

// Function to generate the endpoint URI for searching films based on a term
function filmsSearchEndpointURI(searchTerm: string): string {
    return `/films/?search=${encodeURIComponent(searchTerm)}`;
}

// Function to verify film details by comparing with expected values
function verifyFilmDetails(film: Film, title: string, episode_id: number) {
    assert.strictEqual(film.title, title);
    assert.strictEqual(film.episode_id, episode_id);
}

// Async function to test the films endpoint by ID
async function testFilmsEndpoint(id: number, title: string, episode_id: number) {
    // Make API request to get film by ID
    const response = await axios.get(filmsEndpointURI(id), axiosConfiguration);
    // Assert that the response status is 200
    assert.strictEqual(response.status, 200);
    // Extract film details from the response
    const film: Film = response.data;
    // Verify film details
    verifyFilmDetails(film, title, episode_id);
}

// Async function to test the films search endpoint
async function testFilmSearchEndpoint(searchTerm: string, title: string, episode_id: number) {
    // Make API request to search films based on a term
    const response = await axios.get(filmsSearchEndpointURI(searchTerm), axiosConfiguration);
    // Assert that the response status is 200
    assert.strictEqual(response.status, 200);
    // Extract search results from the response
    const searchResult: SearchResult<Film> = response.data;
    // Assert that only one result is returned
    assert.strictEqual(searchResult.count, 1);
    // Verify film details of the first result
    verifyFilmDetails(searchResult.results[0], title, episode_id);
}

// Test suite for Star Wars Films API
describe("Star Wars Films API tests", () => {
    it("Films endpoint test", async () => {
        // Test the films endpoint for a specific film by ID
        await testFilmsEndpoint(1, "A New Hope", 4);
        // Test non-existing film by ID
        const response = await axios.get(filmsEndpointURI(0), axiosConfiguration);
        assert.strictEqual(response.status, 404);
    });

    it("Search film test", async () => {
        // Test searching films by title
        await testFilmSearchEndpoint("Empire ", "The Empire Strikes Back", 5);
        await testFilmSearchEndpoint("Clones", "Attack of the Clones", 2);
        // Test non-existing film by title
        const response = await axios.get(filmsSearchEndpointURI("Dolce vita"), axiosConfiguration);
        assert.strictEqual(response.status, 200);
        const searchResult: SearchResult<Film> = response.data;
        assert.strictEqual(searchResult.count, 0);
    });

    it("Search film test - Special Characters in Search Term", async () => {
        // Test searching films with special characters in the title
        const specialCharsSearchTerm = "!@#$%^&*";
        const response = await axios.get(filmsSearchEndpointURI(specialCharsSearchTerm), axiosConfiguration);
        assert.strictEqual(response.status, 200);
        const searchResult: SearchResult<Film> = response.data;
        assert.strictEqual(searchResult.count, 0);
    });

    it("List film test", async () => {
        // Test listing all films
        const response = await axios.get(filmsListEndpointURI, axiosConfiguration);
        assert.strictEqual(response.status, 200);
        const searchResult: SearchResult<Film> = response.data;
        assert.ok(searchResult.count > 0);
    });
});
