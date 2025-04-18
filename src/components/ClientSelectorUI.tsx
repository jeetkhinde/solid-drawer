/** @format */

// ~/components/ClientSelectorUI.tsx
import { Component, For, Show } from 'solid-js';
import { useSelectedData } from '~/hooks/hooks';
import { DataType, drawerTitleStore } from '~/store/store';
import type {
  ListDisplayProps,
  LetterIndexProps,
  SearchInputProps,
} from '~/types/types';

// --- Pure: Drawer Trigger Button ---
/**
 * Renders a button to trigger the drawer.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.id - The ID of the drawer to trigger.
 * @param {string} props.buttonText - The text to display on the button.
 * @returns {JSX.Element} A button element.
 */
export const DrawerTrigger: Component<{ id: string; buttonText: string }> = (
  props
) => {
  return (
    <label for={props.id} class="btn btn-outline btn-sm">
      {props.buttonText}
    </label>
  );
};

// --- Pure: Drawer Header ---
/**
 * Renders the header of the drawer.
 *
 * @component
 * @param {Object} props - The properties passed to the component.

 * @param {() => void} props.onClose - Callback function to handle the close action.
 * @returns {JSX.Element} A header element with a title and close button.
 */
export const DrawerHeader: Component<{ onClose: () => void }> = (props) => {
  return (
    <div class="flex justify-between items-center flex-shrink-0">
      <h2 class="text-lg font-semibold">{drawerTitleStore()}</h2>
      <button
        class="btn btn-ghost btn-sm btn-square"
        onClick={props.onClose}
        aria-label="Close sidebar"
      >
        {/* <X size={20} /> */}✕ {/* Replace with icon component if desired */}
      </button>
    </div>
  );
};

// --- Pure-ish: Search Input ---
/**
 * Renders a search input field.
 *
 * @component
 * @param {SearchInputProps} props - The properties passed to the component.
 * @returns {JSX.Element} An input element for searching.
 */
export const SearchInput: Component<SearchInputProps> = (props) => {
  return (
    <div class="flex-shrink-0">
      <input
        type="search"
        placeholder={props.placeholder}
        class="input input-sm input-bordered w-full"
        value={props.value}
        onInput={props.onInput}
        ref={props.setRef} // Use the callback ref pattern
        onFocus={props.onFocus}
        name="list-data-search"
        id="list-data-search-input"
      />
    </div>
  );
};

// --- Pure: Letter Index ---
/**
 * Renders an A-Z index for filtering items.
 *
 * @component
 * @param {LetterIndexProps} props - The properties passed to the component.
 * @returns {JSX.Element} A vertical list of letters for filtering.
 */
export const LetterIndex: Component<LetterIndexProps> = (props) => {
  return (
    <div class="flex-shrink-0 flex flex-col gap-0.5 pr-2 border-r border-base-300 overflow-y-auto">
      <button
        class={`btn btn-xs btn-ghost w-full justify-start ${
          props.selectedLetter === null ? 'btn-active' : ''
        }`}
        onClick={() => props.onLetterSelect(null)} // Pass null for 'All'
      >
        All
      </button>
      <For each={props.letters}>
        {(letter) => (
          <button
            class={`btn btn-xs btn-ghost w-full justify-start ${
              props.selectedLetter === letter ? 'btn-active' : ''
            }`}
            onClick={() => props.onLetterSelect(letter)}
          >
            {letter}
          </button>
        )}
      </For>
    </div>
  );
};

// --- Pure: Client List Item ---
/**
 * Renders a single client item.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {DataType} props.data - The client object to display.
 * @returns {JSX.Element} A button element representing a client.
 */
export const ListItem: Component<{
  data: DataType;
}> = (props) => {
  // Handle click event to select the client using hook useSelectedData
  const { setSelectedData } = useSelectedData();
  return (
    <button
      onClick={() => {
        console.log('ListItem clicked:', props.data); // Debug log
        setSelectedData(props.data);
      }}
      class="block w-full text-left p-1 hover:bg-base-300 focus:bg-base-300 rounded text-sm"
    >
      {props.data.name}
    </button>
  );
};

// --- Pure: No Results Message ---
/**
 * Displays a message when no results are found.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} [props.message] - An optional message to display. Defaults to "No clients found."
 * @returns {JSX.Element} A styled `div` element containing the message.
 */
export const NoResults: Component<{ message?: string }> = (props) => (
  <div class="p-4 text-center text-base-content/60 text-sm">
    {props.message ?? 'No clients found.'}
  </div>
);

// --- Pure:  List Display ---
/**
 * Renders a list of data or a fallback message if no data are found.
 *
 * @component
 * @param {ListDisplayProps} props - The properties passed to the component.
 * @returns {JSX.Element} A list of data or a fallback message.
 */
export const ListDisplay: Component<ListDisplayProps> = (props) => {
  return (
    <Show
      when={props.filteredData.length > 0}
      fallback={<NoResults message={props.noResultsMessage} />}
    >
      <For each={props.filteredData}>
        {(data) => {
          console.log('Rendering ListItem with data:', data); // Debug log
          return <ListItem data={data} />;
        }}
      </For>
    </Show>
  );
};
