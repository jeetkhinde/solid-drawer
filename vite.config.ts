import {defineConfig} from 'vite';
import solidPlugin from 'vite-plugin-solid';
import {fileURLToPath} from 'url';
import {resolve, dirname} from 'path';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig( {
  plugins: [ tailwindcss(), solidPlugin() ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      '~': resolve( dirname( fileURLToPath( import.meta.url ) ), 'src' )
    }
  },
} );
