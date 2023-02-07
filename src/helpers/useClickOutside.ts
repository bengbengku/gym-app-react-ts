import React, { useEffect } from "react";

interface ValidRefTarget {
  contains(target: EventTarget | null): any;
}

export default function useClickOutside(
  ref: React.RefObject<ValidRefTarget>,
  fun: () => void
) {
  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      fun();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref]);
}
