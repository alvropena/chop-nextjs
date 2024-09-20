import { UserProfileData } from "@/data/user-profile-data";
import { UserProfileHeader } from "@/components/user-profile/user-header";

export default function UserProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const user = params.username;
  const userData = UserProfileData.find(({ username }) => username === user);
  if (!userData) {
    return (
      <div className="flex flex-col items-center py-8">
        <h1 className="text-2xl font-bold">User not found</h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center py-8">
      {/* <h1 className="text-2xl font-bold">
        This is the user profile of: {user}
      </h1> */}
      <UserProfileHeader {...userData} />
    </div>
  );
}
