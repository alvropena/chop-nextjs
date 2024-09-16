
import { createContext } from 'react';
import { SearchContextType } from '../types/search/search-context-type';

export const SearchContext = createContext<SearchContextType | undefined>(undefined);
