"use client";

import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    // This check prevents the effect from running if the text is empty.
    if (text && index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text.charAt(index));
        setIndex(prev => prev + 1);
      }, 50); // Typing speed can be adjusted here.

      // Clean up function to clear the timer.
      return () => clearTimeout(timer);
    }
  }, [index, text]); // Dependencies ensure the effect only reruns when index or text changes.

  return <p>{displayedText}</p>;
};

export default TypingEffect;
