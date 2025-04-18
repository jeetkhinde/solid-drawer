import type { Component } from 'solid-js';

import styles from './App.module.css';

import Sidebar from '~/components/ClientSelectorDrawer';
import {
  setData,
  setDrawerTitleStore,
  setDrawSearchPlaceholder,
} from '~/store/store';
import { dummyClients } from './data/clients';

const App: Component = () => {
  setData(dummyClients);
  setDrawerTitleStore('Select client');
  setDrawSearchPlaceholder('Search client');
  return (
    <div class={styles.App}>
      <Sidebar />
    </div>
  );
};

export default App;
