import type { Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import Layout from './opener';

const App: Component = () => {
  return (
    <div class={styles.App}>
       <Layout>
         <div>Main content goes here</div>
       </Layout>
    </div>
  );
};

export default App;
