export function useFavicon() {
  const setFavicon = (href) => {
    const favicon = document.querySelector('link[rel="icon"]') || 
                   document.querySelector('link[rel="shortcut icon"]');
    if (favicon) {
      favicon.href = href;
    }
  };

  const animateFavicon = () => {
    let isActive = false;
    
    // Change favicon on tab visibility
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && !isActive) {
        setFavicon('/favicon/favicon-96x96.png');
        isActive = true;
      } else if (!document.hidden && isActive) {
        setFavicon('/favicon/favicon.ico');
        isActive = false;
      }
    });

    // Change favicon on mouse leave/enter
    document.addEventListener('mouseleave', () => {
      if (!document.hidden) {
        setFavicon('/favicon/favicon-96x96.png');
      }
    });

    document.addEventListener('mouseenter', () => {
      if (!document.hidden) {
        setFavicon('/favicon/favicon.ico');
      }
    });
  };

  return {
    setFavicon,
    animateFavicon
  };
}