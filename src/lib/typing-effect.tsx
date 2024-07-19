"use client";

import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
  className?: string;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, className }) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (text && index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text.charAt(index));
        setIndex(prev => prev + 1);
      }, 70);
      return () => clearTimeout(timer);
    }
  }, [index, text]);

  return <p className={className}>{displayedText}</p>;
};

export default TypingEffect;
