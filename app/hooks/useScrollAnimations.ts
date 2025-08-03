import { useEffect } from 'react';

const useScrollAnimations = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const anim = entry.target.getAttribute('data-animate');
          entry.target.classList.add(anim!);
          entry.target.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
  }, []);
};

export default useScrollAnimations;