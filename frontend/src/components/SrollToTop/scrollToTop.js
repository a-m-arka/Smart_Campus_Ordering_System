import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ mainRef }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    mainRef.current.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
