'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    if (typeof window !== "undefined") {
      localStorage.setItem('lng', lng);
    }
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>EN</button>
      <button onClick={() => changeLanguage('sr')}>SR</button>
      <button onClick={() => changeLanguage('de')}>DE</button>
      {/* Dodaj ostale dugmiće po potrebi */}
    </div>
  );
}