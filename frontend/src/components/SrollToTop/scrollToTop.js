import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ mainRef }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (mainRef?.current) {
      mainRef.current.scrollTo(0, 0);
    }
  }, [pathname, mainRef]);

  return null;
};

export default ScrollToTop;
