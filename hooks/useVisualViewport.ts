import { useState, useEffect, useLayoutEffect } from 'react';

export interface ViewportGeometry {
  height: number;
  offsetTop: number;
}

/**
 * Tracks the Visual Viewport geometry.
 * 
 * To prevent "flashing" or the top bar disappearing:
 * 1. We track 'height' to size the container so the bottom input sits exactly above the keyboard.
 * 2. We track 'offsetTop'. If iOS pushes the viewport up (scrolling the window), 
 *    offsetTop becomes > 0. We can use this to position our container strictly 
 *    at the top of the visible area.
 */
export const useVisualViewport = () => {
  const [geometry, setGeometry] = useState<ViewportGeometry>({
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    offsetTop: 0,
  });

  // Use useLayoutEffect to update before paint if possible to reduce visual jitter
  useLayoutEffect(() => {
    if (typeof window === 'undefined' || !window.visualViewport) {
      return;
    }

    const updateGeometry = () => {
      if (window.visualViewport) {
        // We read the current visual viewport state
        const height = window.visualViewport.height;
        const offsetTop = window.visualViewport.offsetTop;

        // Force scroll to top if we want to be aggressive, 
        // but often trusting offsetTop is smoother.
        // window.scrollTo(0, 0); 
        
        setGeometry({ height, offsetTop });
      }
    };

    window.visualViewport.addEventListener('resize', updateGeometry);
    window.visualViewport.addEventListener('scroll', updateGeometry);
    
    // Initial call
    updateGeometry();

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateGeometry);
        window.visualViewport.removeEventListener('scroll', updateGeometry);
      }
    };
  }, []);

  return geometry;
};