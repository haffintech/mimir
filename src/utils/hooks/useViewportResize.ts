import { useState, useEffect } from 'react';

type ViewportSize = {
  width: number;
  height: number;
};

/**
 * detects viewport changes
 * @param resizeCallback - optional. listener for resize events
 * @returns size of viewport
 */
const useViewportResize = (resizeCallback?: () => void): ViewportSize => {
  const [viewportSize, setViewportSize] = useState<ViewportSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const onResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      if (resizeCallback) {
        resizeCallback();
      }
    };

    onResize();
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [resizeCallback]);

  return viewportSize;
};

export default useViewportResize;
