import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './app/router';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import './app/styles/index.css';

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
  container: {
    center: true,
  },
});
app.use(createPinia());
app.use(router);

app.mount('#app');
