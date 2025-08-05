// app/next-i18next.config.ts
const nextI18NextConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'sr', 'fr', 'it', 'de'],
  },
  localePath: './public/locales', // Ako koristiš default path
};

export default nextI18NextConfig;