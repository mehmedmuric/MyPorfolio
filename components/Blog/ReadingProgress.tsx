'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollableHeight = documentHeight - windowHeight;
      const newProgress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, newProgress)));
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-slate-900/20 backdrop-blur-sm z-50">
      <div
        className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 shadow-lg shadow-emerald-500/20 transition-all duration-150 ease-out will-change-transform"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
    </div>
  );
}
