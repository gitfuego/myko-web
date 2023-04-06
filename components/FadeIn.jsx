import { useState, useEffect, useRef } from 'react';
import styles from './FadeIn.module.scss';

function isElementInView(el) {
  try {
    const rect = el.parentElement.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  } catch {
    
  }
}

export default function FadeIn({ children, direction }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleFadeIn() {
      if (isElementInView(ref.current)) {
        setIsVisible(true);
        window.removeEventListener('scroll', handleFadeIn);
        window.removeEventListener('resize', handleFadeIn);
        window.addEventListener('scroll', handleFadeOut);
        window.addEventListener('resize', handleFadeOut);
      }
    }

    function handleFadeOut() {
      if (!isElementInView(ref.current)) {
        setIsVisible(false);
        window.addEventListener('scroll', handleFadeIn);
        window.addEventListener('resize', handleFadeIn);
        window.removeEventListener('scroll', handleFadeOut);
        window.removeEventListener('resize', handleFadeOut);
      }
    }

    window.addEventListener('scroll', handleFadeIn);
    window.addEventListener('resize', handleFadeIn);
    // handleFadeIn();

    return () => {
      window.removeEventListener('scroll', handleFadeIn);
      window.removeEventListener('resize', handleFadeIn);
    };
  }, []);

  return (
    <div>
      <div ref={ref} className={`${styles[`fade-in-${direction ? direction : 'top'}`]} ${isVisible ? styles['fade-in-visible'] : ''}`}>
        {children}
      </div>
    </div>
  );
}
