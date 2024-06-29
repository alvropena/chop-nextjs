"use client";

import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (text && index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text.charAt(index));
        setIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [index, text]);

  return <p className='m-2'>{displayedText}</p>;
};

export default TypingEffect;
