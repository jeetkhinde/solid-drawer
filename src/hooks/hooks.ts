// src/hooks/hooks.ts
import {createSignal, createMemo} from "solid-js";
import {DataType, useData} from "~/store/store";

/**
 * Generates a sorted array of unique uppercase first letters from a list of data items.
 * Pure function: Always returns the same output for the same input.
 * @returns {string[]} A sorted array of unique first letters.
 */
const getUniqueFirstLetters = (): string[] => {
  const [ data, dataLength ] = useData();
  if ( dataLength() === 0 ) {
    return [];
  }
  const letters = new Set<string>();
  data().forEach( ( item ) => {
    if ( item && typeof item.name === 'string' && item.name.length > 0 ) {
      letters.add( item.name[ 0 ].toUpperCase() );
    }
  } );
  return Array.from( letters ).sort();
};

// Define the return type for the useDataSelectorState hook
interface DataSelectorState {
  searchTerm: () => string;
  setSearchTerm: ( value: string ) => void;
  selectedIndexLetter: () => string | null;
  setSelectedIndexLetter: ( value: string | null ) => void;
  filteredData: () => DataType[];
  indexLetters: () => string[];
  totalCount: () => number;
  filteredCount: () => number;
  searchTermDataCount: () => number;

}

/**
 * Custom hook to manage the state of the data selector.
 *
 * @returns {DataSelectorState} - An object containing the state and methods for managing the data selector.
 */
const useDataSelectorState = (): DataSelectorState => {
  const [ data, dataLength ] = useData();
  const [ searchTerm, setSearchTerm ] = createSignal( "" );
  const [ selectedIndexLetter, setSelectedIndexLetter ] = createSignal<string | null>( null );

  const filteredData = createMemo( () => {
    const letter = selectedIndexLetter();
    const search = searchTerm().trim().toLowerCase();
    let dt = data();

    if ( letter ) {
      dt = dt.filter( ( item ) => item.name.toUpperCase().startsWith( letter ) );
    }
    if ( search ) {
      dt = dt.filter( ( item ) => item.name.toLowerCase().includes( search ) );
    }
    return dt;
  } );

  const totalCount = () => dataLength();
  const filteredCount = () => filteredData().length;
  const searchTermDataCount = () => {
    const search = searchTerm().trim().toLowerCase();
    return data().filter( ( item ) => item.name.toLowerCase().includes( search ) ).length;
  };

  const indexLetters = createMemo( () => getUniqueFirstLetters() );

  return {
    searchTerm,
    setSearchTerm,
    selectedIndexLetter,
    setSelectedIndexLetter,
    filteredData,
    indexLetters,
    totalCount,
    filteredCount,
    searchTermDataCount,
  };
};

/**
 * Custom hook to manage the state of a drawer.
 *
 * @param {boolean} initialState - The initial state of the drawer (open or closed).
 * @returns {object} - An object containing the state and methods for managing the drawer.

 */
const useDrawer = ( initialState = false ) => {
  const [ isOpen, setIsOpen ] = createSignal( initialState );

  const toggleDrawer = () => setIsOpen( !isOpen() );
  const openDrawer = () => setIsOpen( true );
  const closeDrawer = () => setIsOpen( false ); // Specific function to close

  // Return isOpen signal and specific control functions
  return {isOpen, setIsOpen, toggleDrawer, openDrawer, closeDrawer};
};

export {useDataSelectorState, useDrawer};