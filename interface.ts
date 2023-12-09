// Interface definition for representing a character in the Star Wars universe
export interface Character {
    name: string;         // The name of the character
    hair_color: string;   // The color of the character's hair
    eye_color: string;    // The color of the character's eyes
}

// Interface definition for representing a film in the Star Wars universe
export interface Film {
    title: string;        // The title of the film
    episode_id: number;   // The episode ID of the film
}

// Interface definition for representing a generic search result with a count, pagination details, and results
export interface SearchResult<T> {
    count: number;        // The total count of items in the search result
    next: string;         // The URL for the next page of results (pagination)
    previous: string;     // The URL for the previous page of results (pagination)
    results: T[];         // An array of items representing the search results
}

