// src/components/client-selector/utils.ts
import {Client} from "../types/types";

/**
 * Generates a sorted array of unique uppercase first letters from a list of clients.
 * Pure function: Always returns the same output for the same input.
 * @param clients - An array of Client objects.
 * @returns A sorted array of unique first letters.
 */
export const getUniqueFirstLetters = ( clients: Client[] ): string[] => {
  if ( !clients || clients.length === 0 ) {
    return [];
  }
  const letters = new Set<string>();
  clients.forEach( c => {
    if ( c && typeof c.name === 'string' && c.name.length > 0 ) {
      letters.add( c.name[ 0 ].toUpperCase() );
    }
  } );
  return Array.from( letters ).sort();
};

// REMOVE the following line as dummyClients should not be used here:
// export const clientIndexLetters = getUniqueFirstLetters(dummyClients);
// The component using LetterIndex should generate this based on the *actual* client data it receives.
// Pre-calculate letters for the index
