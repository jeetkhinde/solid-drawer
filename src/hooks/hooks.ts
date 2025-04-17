// src/hooks/useClientSelectorState.ts
import {createSignal, createMemo} from "solid-js";
import {Client} from "~/types/types";
import {getUniqueFirstLetters} from "~/utils/utils";
import {dummyClients} from "../data/clients";

/**
 * Custom hook to manage the state of the client selector.
 * 
 * @param {() => Client[]} allClients - A reactive accessor function that returns the list of all clients.
 * @returns {Object} - An object containing the state and methods for managing the client selector.
 * @property {() => string} searchTerm - Signal to get the current search term.
 * @property {(value: string) => void} setSearchTerm - Function to update the search term.
 * @property {() => string | null} selectedIndexLetter - Signal to get the currently selected index letter.
 * @property {(value: string | null) => void} setSelectedIndexLetter - Function to update the selected index letter.
 * @property {() => Client[]} filteredClients - Memoized signal to get the filtered list of clients based on the search term and selected index letter.
 * @property {() => string[]} clientIndexLetters - Memoized signal to get the unique first letters of all client names.
 * @property {() => void} resetState - Function to reset the search term and selected index letter to their initial states.
 * 
 * @example
 * import { useClientSelectorState } from "~/hooks/useClientSelectorState";
 * import { createSignal } from "solid-js";
 * 
 * const allClients = createSignal([
 *   { id: "1", name: "Alice" },
 *   { id: "2", name: "Bob" },
 *   { id: "3", name: "Charlie" }
 * ]);
 * 
 * const {
 *   searchTerm,
 *   setSearchTerm,
 *   selectedIndexLetter,
 *   setSelectedIndexLetter,
 *   filteredClients,
 *   clientIndexLetters,
 *   resetState
 * } = useClientSelectorState(allClients);
 * 
 * setSearchTerm("Al");
 * console.log(filteredClients()); // Logs clients matching the search term "Al"
 * 
 * setSelectedIndexLetter("B");
 * console.log(filteredClients()); // Logs clients starting with the letter "B"
 * 
 * resetState();
 * console.log(searchTerm()); // Logs ""
 * console.log(clientIndexLetters()); // Logs unique first letters of all client names
 */
const useClientSelectorState = ( allClients: () => Client[] ) => { // Accept clients as an accessor
  const [ searchTerm, setSearchTerm ] = createSignal( "" );
  const [ selectedIndexLetter, setSelectedIndexLetter ] = createSignal<string | null>( null );

  const filteredClients = createMemo( () => {
    const clients = allClients(); // Access the clients reactively
    const letter = selectedIndexLetter();
    const search = searchTerm().trim().toLowerCase();
    // ... (filtering logic remains the same)
    const letterFiltered = letter
      ? clients.filter( ( client ) => client.name.toUpperCase().startsWith( letter ) )
      : clients;
    const searchFiltered = search
      ? letterFiltered.filter( ( client ) => client.name.toLowerCase().includes( search ) )
      : letterFiltered;
    return searchFiltered;
  } );

  const clientIndexLetters = createMemo( () => getUniqueFirstLetters( allClients() ) );

  const resetState = () => {
    setSearchTerm( "" );
    setSelectedIndexLetter( null );
  };
  return {
    searchTerm,
    setSearchTerm,
    selectedIndexLetter,
    setSelectedIndexLetter,
    filteredClients,
    clientIndexLetters,
    resetState
  };
};


const useDrawer = ( initialState = false ) => {
  const [ isOpen, setIsOpen ] = createSignal( true );

  const toggleDrawer = () => setIsOpen( !isOpen() );
  const openDrawer = () => setIsOpen( true );
  const closeDrawer = () => setIsOpen( false ); // Specific function to close

  // Return isOpen signal and specific control functions
  return {isOpen, setIsOpen, toggleDrawer, openDrawer, closeDrawer};
};


export {useClientSelectorState, useDrawer};