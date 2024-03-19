import { createApp } from 'vue';
import './styles/_index.css';
import App from './App.vue';

import i18n from './plugins/vue-i18n';

const app = createApp(App);

app.use(i18n).mount('#app');
