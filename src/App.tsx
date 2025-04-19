import type { Component } from 'solid-js';

import { Drawer } from '~/components/Drawer';
import {
  setData,
  setDrawerTitleStore,
  setDrawSearchPlaceholder,
} from '~/store/store';
import { dummyClients } from './data/data';

const App: Component = () => {
  setData(dummyClients);
  setDrawerTitleStore('Select client');
  setDrawSearchPlaceholder('Search client');

  return (
    <div>
      <Drawer />
    </div>
  );
};

export default App;
