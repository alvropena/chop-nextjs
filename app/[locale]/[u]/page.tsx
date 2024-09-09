"use client"


import { useParams } from "next/navigation";
import { UserProfileData } from "../../../data/user-profile/user-profile-data";

function getUserProfile(username: string) {
  // Simulate fetching data from a "database" by looking it up in UserProfileData
  return UserProfileData.find((profile) => profile.username === username);
}

export default function UserProfilePage() {
  const { u: username } = useParams(); // Get the dynamic username from the URL

  const userProfile = getUserProfile(username); // Fetch the user profile data based on the username

  if (!userProfile) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h1>{userProfile.name}'s Profile</h1>
      <p>Username: {userProfile.username}</p>
      <p>Location: {userProfile.location}</p>
      <p>Followers: {userProfile.followers}</p>
      <p>Following: {userProfile.following}</p>
      <img src={userProfile.profile_picture} alt={`${userProfile.username}'s profile picture`} width={100} />
      {/* You can add more details based on your data structure */}
    </div>
  );
}
