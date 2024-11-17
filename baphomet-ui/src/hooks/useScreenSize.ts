import { useState, useEffect } from 'react';
export const useScreenSize = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (windowWidth <= 480) {
    return 'small';
  } else if (windowWidth <= 580) {
    return 'medium';
  } else {
    return 'large';
  }
};
