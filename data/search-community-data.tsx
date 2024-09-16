import { SearchCommunityType } from "../types/search/search-community-type";

export const SearchCommunityData: SearchCommunityType[] = [
  {
    id: '1',  // Unique search instance ID
    communityId: 'comm1',  // Unique ID for the "Geography" community
    userId: '1a2b3c4d5e6f7g8h9i0j',
    timestamp: new Date(),  // Current date and time
  },
  {
    id: '2',  // Another search instance for "History"
    communityId: 'comm2',
    userId: '2b3c4d5e6f7g8h9i0ja1b',
    timestamp: new Date(),
  },
  {
    id: '3',  // A search instance for "JavaScript"
    communityId: 'comm3',
    userId: '3c4d5e6f7g8h9i0ja1b2c3',
    timestamp: new Date(),
  },
  {
    id: '5',  // Another search instance for "Soccer"
    communityId: 'comm4',
    userId: '2b3c4d5e6f7g8h9i0ja1b',
    timestamp: new Date(),
  },
  {
    id: '6',  // Another search instance for "Art"
    communityId: 'comm5',
    userId: '3c4d5e6f7g8h9i0ja1b2c3',
    timestamp: new Date(),
  },
  {
    id: '12',  // Another search instance for "Basketball"
    communityId: 'comm6',
    userId: '1a2b3c4d5e6f7g8h9i0j',
    timestamp: new Date(),
  }
];
