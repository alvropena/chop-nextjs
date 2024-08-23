import React from 'react';
import WriteCard from './write-card';
import MultipleChoiceCard from './multiple-choice-card';
import ListeningCard from './listening-card';
import SpeakingCard from './speaking-card';
import FillInTheBlankCard from './fill-in-the-blank-card';
import MatchingPairsCard from './matching-pairs-card';
import ReadingCard from './reading-card';

interface CardRendererProps {
  card: any;
}

const CardRenderer: React.FC<CardRendererProps> = ({ card }) => {
  switch (card.type) {
    case "write":
      return <WriteCard title={card.title} description={card.description} imageUrl={card.imageUrl} />;
    case "multipleChoice":
      return <MultipleChoiceCard title={card.title} description={card.description} options={card.options} imageUrl={card.imageUrl} />;
    case "listening":
      return <ListeningCard title={card.title} description={card.description} options={card.options} audioUrl={card.audioUrl} />;
    case "speaking":
      return <SpeakingCard title={card.title} description={card.description} />;
    case "fillInTheBlank":
      return <FillInTheBlankCard title={card.title} description={card.description} options={card.options} />;
    case "matchingPairs":
      return <MatchingPairsCard title={card.title} description={card.description} pairs={card.pairs} />;
    case "reading":
      return <ReadingCard title={card.title} description={card.description} passage={card.passage} questions={card.questions} />;
    default:
      return null;
  }
};

export default CardRenderer;
