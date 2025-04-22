import { onBeforeUnmount } from 'vue';
import { debounce } from '../utils/debounce';

/**
 * Wraps any function into a Vue‑friendly debounced version,
 * automatically cleaning up the timer on unmount.
 *
 * @param {Function} fn
 * @param {number}   delay
 * @param {boolean}  immediate
 * @returns {Function} debouncedFn
 */
export function useDebounceFn(fn, delay = 300, immediate = false) {
  const debouncedFn = debounce(fn, delay, immediate);

  onBeforeUnmount(() => {
    if (debouncedFn.cancel) debouncedFn.cancel();
  });

  return debouncedFn;
}