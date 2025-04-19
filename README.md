# Sidebar Component

A reusable sidebar component built with SolidJS, designed for client selection and filtering. This package includes a `Drawer` component, hooks, and stores to manage state effectively.

## Features

- **Drawer Component**: A customizable drawer with search returned data.
- **Hooks**: Predefined hooks for managing state, filtering data, and more.
- **Stores**: Shared state management for seamless integration.

## Installation

Install the package using your preferred package manager:

```bash
# Using npm
npm install sidebar-component

# Using pnpm
pnpm add sidebar-component

# Using bun
bun add sidebar-component
```

## Usage

### Importing the Drawer Component

You can use the `Drawer` component directly in your application:

```tsx
import { Drawer } from 'sidebar-component';
import {
  setData,
  setDrawerTitleStore,
  setDrawSearchPlaceholder,
} from 'sidebar-component';
import { dummyClients } from './data/clients';

// Set up the stores
setData(dummyClients);
setDrawerTitleStore('Select client');
setDrawSearchPlaceholder('Search client');

const App = () => {
  return (
    <div>
      <Drawer />
    </div>
  );
};

export default App;
```

### Using Hooks

This package provides several hooks for managing state:

- `useDrawer`: Manage the open/close state of the drawer.
- `useDataSelectorState`: Manage search term, selected index letter, and filtered data.
- `useSelectedData`: Manage the selected data state.

Example:

```tsx
import { useDrawer, useDataSelectorState } from 'sidebar-component';

const MyComponent = () => {
  const { isOpen, toggleDrawer } = useDrawer();
  const { searchTerm, setSearchTerm, filteredData } = useDataSelectorState();

  return (
    <div>
      <button onClick={toggleDrawer}>Toggle Drawer</button>
      <input
        type="text"
        value={searchTerm()}
        onInput={(e) => setSearchTerm(e.currentTarget.value)}
      />
      <ul>
        {filteredData().map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

### Stores

The following stores are available for shared state management:

- `setData`: Set the list of clients.
- `setDrawerTitleStore`: Set the title of the drawer.
- `setDrawSearchPlaceholder`: Set the placeholder text for the search input.

Example:

```tsx
import {
  setData,
  setDrawerTitleStore,
  setDrawSearchPlaceholder,
} from 'sidebar-component';

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
