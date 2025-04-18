// File: src/store/store.ts
import {createStore} from "solid-js/store";
import {createSignal} from "solid-js";

export interface DataType {
  id: string;
  name: string;
}

// No initial data — store starts empty
export const [ dataStore, setDataStore ] = createStore( {
  data: [] as DataType[]
} );

/**
 * Hook to access and manage the reactive data store.
 *
 * @returns {readonly [() => DataType[], () => number]} - A tuple containing:
 *   - A function to get the current data array.
 *   - A function to get the length of the data array.
 */
export const useData = () => {
  const data = () => dataStore.data; // Directly access the reactive store
  const dataLength = () => data().length; // Length of the data array
  return [
    data,
    dataLength,
  ] as const;
};

// create signal to set Drawer title
export const [ drawerTitleStore, setDrawerTitleStore ] = createSignal<string>( "" );
// create signal to set search placeholder
export const [ drawSearchPlaceholder, setDrawSearchPlaceholder ] = createSignal<string>( "" );


/**
 * Updates the data in the reactive store.
 *
 * @param {DataType[]} data - The new data array to set in the store.
 */
export const setData = ( data: DataType[] ) => {
  setDataStore( "data", data );
};