import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

export const FlipWords = ({
  words,
  duration = 2600,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setFade(true);
      }, 300);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  const currentWord = words[index];

  return (
    <span
      className={cn(
        "inline-block relative text-left text-amber-300 font-serif italic px-2 transition-all duration-300 transform",
        fade ? "opacity-100 translate-y-0 filter-none" : "opacity-0 -translate-y-2 blur-xs",
        className
      )}
    >
      {currentWord}
    </span>
  );
};
