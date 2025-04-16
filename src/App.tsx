import type { Component } from 'solid-js';

import styles from './App.module.css';
import Layout from './opener';
import OnlyBar from './onlybar';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <OnlyBar />
    </div>
  );
};

export default App;
