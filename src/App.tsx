import type { Component } from 'solid-js';

import styles from './App.module.css';
 
import Sidebar from '~/components/ClientSelectorDrawer';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <Sidebar />
    </div>
  );
};

export default App;
