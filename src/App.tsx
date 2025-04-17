import type { Component } from 'solid-js';

import styles from './App.module.css';

import Sidebar from '~/components/ClientSelectorDrawer';
import { setData } from '~/store/store';
import { dummyClients } from './data/clients';

const App: Component = () => {
  setData(dummyClients);

  return (
    <div class={styles.App}>
      <Sidebar />
    </div>
  );
};

export default App;
