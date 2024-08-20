"use client";

import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  texts: { word: string; emoji: string }[];
  className?: string;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ texts, className }) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);

  useEffect(() => {
    const currentText = texts[currentIndex].word;

    if (charIndex < currentText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + currentText.charAt(charIndex));
        setCharIndex(prev => prev + 1);
      }, 50); // Increased typing speed
      return () => clearTimeout(timer);
    } else {
      const eraseTimer = setTimeout(() => {
        setDisplayedText('');
        setCharIndex(0);
        setCurrentIndex(prev => (prev + 1) % texts.length);
      }, 1500); // Delay before switching to the next text
      return () => clearTimeout(eraseTimer);
    }
  }, [charIndex, currentIndex, texts]);

  return (
    <p className={`${className} px-2 rounded`}>
      {displayedText} {texts[currentIndex].emoji}
    </p>
  );
};

export default TypingEffect;
