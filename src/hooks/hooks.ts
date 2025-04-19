// src/hooks/hooks.ts
import {createSignal, createMemo} from "solid-js";
import {DataType, useData} from "~/store/store";

/**
 * Custom hook to filter data based on search term and selected index letter.
 *
 * @param {function} data - Function that returns the data array.
 * @param {function} searchTerm - Function that returns the current search term.
 * @param {function} selectedIndexLetter - Function that returns the selected index letter.
 * @returns {function} - A memoized function that returns the filtered data.
 */
const useFilteredData = ( data: () => DataType[], searchTerm: () => string, selectedIndexLetter: () => string | null ) => {
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

  return filteredData;
};

// Define the return type for the useDataSelectorState hook
interface DataSelectorState {
  searchTerm: () => string;
  setSearchTerm: ( value: string ) => void;
  selectedIndexLetter: () => string | null;
  setSelectedIndexLetter: ( value: string | null ) => void;
  filteredData: () => DataType[];
  indexLetters: () => string[];

}

/**
 * Custom hook to manage the state of the data selector.
 *
 * @returns {DataSelectorState} - An object containing the state and methods for managing the data selector.
 */
const useDataSelectorState = (): DataSelectorState => {
  const [ data ] = useData();
  const {searchTerm, setSearchTerm} = useSearchTerm();
  const {selectedIndexLetter, setSelectedIndexLetter} = useIndexLetter();
  const filteredData = useFilteredData( data, searchTerm, selectedIndexLetter );
  const indexLetters = useIndexLetters( data );

  return {
    searchTerm,
    setSearchTerm,
    selectedIndexLetter,
    setSelectedIndexLetter,
    filteredData,
    indexLetters,
  };
};



/**
 * Custom hook to manage the search term state.
 *
 * @returns {object} - An object containing the search term signal and its setter.
 */
const useSearchTerm = () => {
  const [ searchTerm, setSearchTerm ] = createSignal( "" );

  return {
    searchTerm,
    setSearchTerm,
  };
};

/**
 * Custom hook to manage the selected index letter state.
 *
 * @returns {object} - An object containing the selected index letter signal and its setter.
 */
const useIndexLetter = () => {
  const [ selectedIndexLetter, setSelectedIndexLetter ] = createSignal<string | null>( null );

  return {
    selectedIndexLetter,
    setSelectedIndexLetter,
  };
};

/**
 * Custom hook to generate a sorted array of unique uppercase first letters from a list of data items.
 *
 * @param {function} data - Function that returns the data array.
 * @returns {function} - A memoized function that returns the sorted array of unique first letters.
 */
const useIndexLetters = ( data: () => DataType[] ) => {
  const indexLetters = createMemo( () => {
    const letters = new Set<string>();
    data().forEach( ( item ) => {
      if ( item && typeof item.name === "string" && item.name.length > 0 ) {
        letters.add( item.name[ 0 ].toUpperCase() );
      }
    } );
    return Array.from( letters ).sort();
  } );

  return indexLetters;
};

// Define the shared signal outside the hook
const [ selectedData, setSelectedData ] = createSignal<DataType | null>( null );

/**
 * Custom hook to manage the selected data state.
 *
 * @returns {object} - An object containing the selected data signal and its setter.
 */
const useSelectedData = () => {
  return {
    selectedData,
    setSelectedData,
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
  const closeDrawer = () => setIsOpen( false );

  // Return isOpen signal and specific control functions
  return {isOpen, setIsOpen, toggleDrawer, openDrawer, closeDrawer};
};



export {
  useDataSelectorState,
  useDrawer,
  useSelectedData,
};