# Solid Drawer Component

A reusable drawer component built with SolidJS, designed for client selection and filtering. This package includes a `Drawer` component, hooks, and stores to manage state effectively.

## Features

- **Drawer Component**: A customizable drawer with search returned data.
- **Hooks**: Predefined hooks for managing state, filtering data, and more.
- **Stores**: Shared state management for seamless integration.

## Installation

Install the package using your preferred package manager:

```bash
# Using npm
npm install @jeetkhinde/solid-drawer

# Using pnpm
pnpm add @jeetkhinde/solid-drawer

# Using bun
bun add @jeetkhinde/solid-drawer
```

## Usage

### Importing the Drawer Component

You can use the `Drawer` component directly in your application:

```tsx
import { Drawer } from '@jeetkhinde/solid-drawer';
import {
  setData,
  setDrawerTitleStore,
  setDrawSearchPlaceholder,
} from '@jeetkhinde/solid-drawer';
import { dummyClients } from './data/clients';

// Set up the stores
setData(dummyClients);
setDrawerTitleStore('Select a client');
setDrawSearchPlaceholder('Search a client');

const App = () => {
  return (
    <div>
      <Drawer />
    </div>
  );
};

export default App;
```

### DataType

Shape of data.
`interface DataType {
  id: string;
  name: string;
}`

### Using Hooks

This package provides several hooks for managing state:

#### `useDrawer`

Manages the open/close state of the drawer.

- **Properties**:
  - `isOpen: () => boolean` - Returns whether the drawer is open.
  - `toggleDrawer: () => void` - Toggles the drawer state.
  - `openDrawer: () => void` - Opens the drawer.
  - `closeDrawer: () => void` - Closes the drawer.

#### `useSelectedData`

Manages the selected data state.

- **Properties**:
  - `selectedData: () => any` - Returns the currently selected data of DataType type.
  - `setSelectedData: (data: any) => void` - Sets the selected data, be shape must be DataType type.

#### `useDataSelectorState`

Manages search term, selected index letter, and filtered data.

- **Properties**:
  - `searchTerm: () => string` - Returns the current search term.
  - `setSearchTerm: (term: string) => void` - Sets the search term.
  - `selectedIndexLetter: () => string` - Returns the selected index letter.
  - `setSelectedIndexLetter: (letter: string) => void` - Sets the selected index letter.
  - `filteredData: () => any[]` - Returns the filtered data.
  - `indexLetters: () => string[]` - Returns the available index letters.

### Stores

The following stores are available for shared state management:

#### `setData`

- **Description**: Sets the list of data.
- **Type**: `(data: any[]) => void`

#### `setDrawerTitleStore`

- **Description**: Sets the title of the drawer.
- **Type**: `(title: string) => void`

#### `setDrawSearchPlaceholder`

- **Description**: Sets the placeholder text for the search input.
- **Type**: `(placeholder: string) => void`

### Example

```tsx
import {
  setData,
  setDrawerTitleStore,
  setDrawSearchPlaceholder,
} from '@jeetkhinde/solid-drawer';

setData(dummyClients);
setDrawerTitleStore('Select client');
setDrawSearchPlaceholder('Search client');
```

## Development

This package is built with:

- [SolidJS](https://solidjs.com)
- [Bun](https://bun.sh)

To build the package locally:

```bash
bun run build
```

## License

This project is licensed under the MIT License.
