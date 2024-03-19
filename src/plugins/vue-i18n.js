import { createI18n } from 'vue-i18n';
import messages from '../translations';

import locale from '../helpers/get-language';

const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale: 'en',
  messages,
});

export default i18n;
