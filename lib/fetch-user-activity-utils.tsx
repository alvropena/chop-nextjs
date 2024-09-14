import { userActivityData } from "../data/user-activity-data";

// Fetch user activity data
export const fetchUserActivityFromAPI = async () => {
  return Promise.resolve(userActivityData);
};
