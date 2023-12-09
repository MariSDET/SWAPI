// Import necessary modules
import axios from "axios";
import assert from "assert";
import { Character, SearchResult } from "../interface";
import { axiosConfiguration } from "../src/config/axiosConfiguration";


// Define the endpoint URI for the people list
const peopleListEndpointURI: string = "/people/";

// Function to generate the endpoint URI for a specific person by ID
function peopleEndpointURI(id: number): string {
    return `/people/${id}`;
}

// Function to generate the endpoint URI for searching people based on a term
function peopleSearchEndpointURI(searchTerm: string): string {
    return `/people/?search=${encodeURIComponent(searchTerm)}`;
}

// Function to verify character details by comparing with expected values
function verifyCharacterDetails(
    character: Character,
    name: string,
    hairColor: string,
    eyeColor: string
) {
    assert.strictEqual(character.name, name);
    assert.strictEqual(character.eye_color, eyeColor);
    assert.strictEqual(character.hair_color, hairColor);
}

// Async function to test the people endpoint by ID
async function testPeopleEndpoint(
    id: number,
    name: string,
    hairColor: string,
    eyeColor: string
) {
    // Make API request to get person by ID
    const response = await axios.get(
        peopleEndpointURI(id),
        axiosConfiguration
    );
    // Assert that the response status is 200
    assert.strictEqual(response.status, 200);
    // Extract character details from the response
    const character: Character = response.data;
    // Verify character details
    verifyCharacterDetails(character, name, hairColor, eyeColor);
}

// Async function to test the people search endpoint
async function testPeopleSearchEndpoint(
    searchTerm: string,
    name: string,
    hairColor: string,
    eyeColor: string
) {
    // Make API request to search people based on a term
    const response = await axios.get(
        peopleSearchEndpointURI(searchTerm),
        axiosConfiguration
    );
    // Assert that the response status is 200
    assert.strictEqual(response.status, 200);
    // Extract search results from the response
    const searchResult: SearchResult<Character> = response.data;
    // Assert that only one result is returned
    assert.strictEqual(searchResult.count, 1);
    // Verify character details of the first result
    verifyCharacterDetails(searchResult.results[0], name, hairColor, eyeColor);
}

// Test suite for Star Wars People API
describe("Star Wars People API tests", () => {
    it("People endpoint test", async () => {
        // Test the people endpoint for a specific person by ID
        await testPeopleEndpoint(1, "Luke Skywalker", "blond", "blue");
        await testPeopleEndpoint(5, "Leia Organa", "brown", "brown");
        // Test non-existing person by ID
        const response = await axios.get(
            peopleEndpointURI(-1),
            axiosConfiguration
        );
        assert.strictEqual(response.status, 404);
    });

    it("Search people test", async () => {
        // Test searching people by name
        await testPeopleSearchEndpoint(
            "Luke Skyw",
            "Luke Skywalker",
            "blond",
            "blue"
        );
        await testPeopleSearchEndpoint("Darth V", "Darth Vader", "none", "yellow");

        // Test non-existing person by name
        const response = await axios.get(
            peopleSearchEndpointURI("Spider Man"),
            axiosConfiguration
        );
        assert.strictEqual(response.status, 200);
        const searchResult: SearchResult<Character> = response.data;
        assert.strictEqual(searchResult.count, 0);
    });

    it("Search people test - Empty Search Term", async () => {
        // Test searching people with an empty search term
        const emptySearchTerm = " ";
        const response = await axios.get(
            peopleSearchEndpointURI(emptySearchTerm),
            axiosConfiguration
        );
        assert.strictEqual(response.status, 200);
        const searchResult: SearchResult<Character> = response.data;
        assert.strictEqual(searchResult.count, 82);
    });

    it("Search people test - Special Characters in Search Term", async () => {
        // Test searching people with special characters in the name
        const specialCharsSearchTerm = "!@#$%^&*";
        const response = await axios.get(peopleSearchEndpointURI(specialCharsSearchTerm), axiosConfiguration);
        assert.strictEqual(response.status, 200);
        const searchResult: SearchResult<Character> = response.data;
        assert.strictEqual(searchResult.count, 0);
    });

    it("List people test", async () => {
        // Test listing all people
        const response = await axios.get(
            peopleListEndpointURI,
            axiosConfiguration
        );
        assert.strictEqual(response.status, 200);
        const searchResult: SearchResult<Character> = response.data;
        assert.ok(searchResult.count > 0);
    });
});
