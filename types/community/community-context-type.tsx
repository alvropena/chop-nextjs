import { CommunityType } from "./community-type";

export type CommunitiesContextType = {
  communities: CommunityType[];
  addCommunity: (community: CommunityType) => void;
  removeCommunity: (communityName: string) => void;
};
