
/**
 * Represents a client object.
 */
export interface Client {
  id: string;
  name: string;
}

/**
 * Props for the ClientSelectorDrawer component.
 */
export type ClientSelectorDrawerProps = {
  id: string;
  isOpen: boolean;
  onToggle: () => void;
  selectedClient: Client | null;
  setSelectedClient: ( client: Client | null ) => void; // Setter function for selected client
  allClients: Client[];
  onClose: () => void; // Optional: Callback to close the drawer
};

/**
 * Props for the SearchInput component.
 */
export interface SearchInputProps {
  value: string;
  placeholder: string;
  onInput: ( event: Event ) => void;
  onFocus: () => void; // Optional: Handle focus event if needed in parent
  setRef: ( el: HTMLInputElement ) => void; // Callback to pass the ref up
  onBlur?: () => void;
}

/**
 * Props for the LetterIndex component.
 */
export interface LetterIndexProps {
  letters: string[];
  selectedLetter: string | null;
  onLetterSelect: ( letter: string | null ) => void; // Callback for letter click
}

/**
 * Props for the ClientListDisplay component.
 */
export interface ClientListDisplayProps {
  clients: Client[];
  onClientSelect: ( client: Client ) => void;
  noResultsMessage?: string;
}