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
  onNextCard: () => void;  // Callback to move to the next card
}

const CardRenderer: React.FC<CardRendererProps> = ({ card, onNextCard }) => {
  switch (card.type) {
    case "write":
      return <WriteCard title={card.title} description={card.description} imageUrl={card.imageUrl} onContinue={onNextCard} />;
    case "multipleChoice":
      return <MultipleChoiceCard title={card.title} description={card.description} options={card.options} imageUrl={card.imageUrl} onContinue={onNextCard} />;
    case "listening":
      return <ListeningCard title={card.title} description={card.description} options={card.options} audioUrl={card.audioUrl} onContinue={onNextCard} />;
    case "speaking":
      return (
        <SpeakingCard
          title={card.title}
          description={card.description}
          onContinue={onNextCard}
        />
      );
    case "fillInTheBlank":
      return <FillInTheBlankCard title={card.title} description={card.description} options={card.options} onContinue={onNextCard} />;
    case "matchingPairs":
      return <MatchingPairsCard title={card.title} description={card.description} pairs={card.pairs} onContinue={onNextCard} />;
    case "reading":
      return <ReadingCard title={card.title} description={card.description} passage={card.passage} questions={card.questions} onContinue={onNextCard} />;
    default:
      return null;
  }
};

export default CardRenderer;
