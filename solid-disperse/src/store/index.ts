import { createRoot } from 'solid-js';
import { createAppStore } from './app.store';

function createGlobalStore() {
  return createRoot(() => createAppStore());
}

export const store = createGlobalStore();
