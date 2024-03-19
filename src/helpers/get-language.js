const language = localStorage.getItem('language') || navigator.language.slice(0, 2) || 'en';

export default language;
