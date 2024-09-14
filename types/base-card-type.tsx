import React from 'react';

export interface BaseCardType {
  title: string;
  description: string;
  progress?: number;
  imageUrl?: string;  
  content: React.ReactNode;
  question: React.ReactNode;
}
