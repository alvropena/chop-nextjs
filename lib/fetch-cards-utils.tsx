import { cardsData } from "../data/card-data";

// Fetch cards data
export const fetchCardsFromAPI = async () => {
  return Promise.resolve(cardsData);
};
