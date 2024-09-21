"use client";
import { useCard } from "@/hooks/use-card";
import { useCardStore } from "@/stores/use-card-store";
import BaseCard from "@/components/cards/base-card";

export const BaseCardContainer = () => {
  const { cards } = useCard(); // Get cards from context
  const currentCardIndex = useCardStore((state) => state.currentCardIndex);
  return (
    <>
      {cards[currentCardIndex] && (
        <BaseCard
          {...cards[currentCardIndex]} // Spread the entire card object
        />
      )}
    </>
  );
};
