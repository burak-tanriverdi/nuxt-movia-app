export function debounce(fn, wait = 300, immediate = false) {
    let timeoutId = null;

    const debounced = function(...args) {
      const later = () => {
        timeoutId = null;
        if (!immediate) fn.apply(this, args);
      };

      const callNow = immediate && !timeoutId;

      clearTimeout(timeoutId);

      timeoutId = setTimeout(later, wait);

      if (callNow) fn.apply(this, args);
    };

    debounced.cancel = () => {
      clearTimeout(timeoutId);
      
      timeoutId = null;
    };

    return debounced;
}
  