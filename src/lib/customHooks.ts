import { useEffect, useRef } from 'react';

export function useTimeout(callback: any, delay: number) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const id = setTimeout(() => savedCallback.current(), delay);
    return () => {
      clearTimeout(id);
    };
  }, [delay]);
}

export function useInterval(callback: any, delay: number) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const id = setInterval(() => savedCallback.current(), delay);
    return () => {
      clearTimeout(id);
    };
  }, [delay]);
}
