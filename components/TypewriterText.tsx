'use client';

import { useEffect, useState } from 'react';

type TypewriterTextProps = {
  lines: string[];
  speed?: number;
  pauseBetweenLines?: number;
};

export default function TypewriterText({
  lines,
  speed = 45,
  pauseBetweenLines = 500,
}: TypewriterTextProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayed, setDisplayed] = useState<string[]>(() => lines.map(() => ''));
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (lineIndex >= lines.length) {
      setDone(true);
      return;
    }

    const currentLine = lines[lineIndex];

    if (charIndex < currentLine.length) {
      const timeout = window.setTimeout(() => {
        setDisplayed((prev) => {
          const next = [...prev];
          next[lineIndex] = currentLine.slice(0, charIndex + 1);
          return next;
        });
        setCharIndex((value) => value + 1);
      }, speed);
      return () => window.clearTimeout(timeout);
    }

    const timeout = window.setTimeout(() => {
      setLineIndex((value) => value + 1);
      setCharIndex(0);
    }, pauseBetweenLines);

    return () => window.clearTimeout(timeout);
  }, [lineIndex, charIndex, lines, speed, pauseBetweenLines]);

  return (
    <h1>
      {lines.map((line, index) => (
        <span key={line} className="line">
          {displayed[index]}
          {index === lineIndex && !done && <span className="typewriter-cursor">|</span>}
        </span>
      ))}
    </h1>
  );
}
