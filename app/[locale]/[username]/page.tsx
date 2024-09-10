"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { format } from 'date-fns';
import { useUser } from '../../../hooks/use-user';
import { LineChart } from 'lucide-react';
import { PersonIcon } from '@radix-ui/react-icons';
import { Button } from '../../../components/ui/button';
import TopicButtons from '../../../components/topic-buttons';
import { UserProfileHeader } from '../../../components/user-profile/user-header';
import { UserAchievement } from '../../../components/user-profile/user-achievement';
import { UserActivity } from '../../../components/user-profile/user-activity';
import Link from 'next/link';

export default function ProfilePage() {
  const { user } = useUser();

  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  const getLocalizedPath = (path: string) => `/${locale}${path}`;
  const joinedDate = format(new Date(user.created_at), "MMMM yyyy");
  const lastActiveDate = format(new Date(user.updated_at), "MMM d, yyyy 'at' h:mm a");

  const randomAchievements = user.achievements ? user.achievements.slice(0, 4) : [];

  return (
    <div className="flex justify-center h-2/3 text-foreground p-4">
      <div className="flex flex-col space-6 w-full max-w-xl rounded-md">


        <UserProfileHeader
          username={user.username}
          name={user.name}
          bio={user.bio}
          location={user.location}
          joinedDate={joinedDate}
          profilePicture={user.profile_picture}
          verified={user.verified}
          getLocalizedPath={getLocalizedPath}
        />

        <div className='flex flex-row w-full mt-4'>
          <Link href={getLocalizedPath('/profile/edit')} className="flex-1 mx-4">
            <Button className="py-2 w-full" variant="default">
              <PersonIcon className='mr-2 h-4 w-4' />
              Edit Profile
            </Button>
          </Link>
          <Link href={getLocalizedPath('/profile/analytics')} className="flex-1 mx-4">
            <Button className="py-2 w-full" variant="default">
              <LineChart className='mr-2 h-4 w-4' />
              View Analytics
            </Button>
          </Link>
        </div>


        <div className="mt-4 w-full">
          <TopicButtons
            selectedTopic={user.selectedTopic || ""}
            handleTopicClick={() => { }}
            topics={[
              { id: "geography", label: "🌍 Geography" },
              { id: "history", label: "📜 History" },
              { id: "soccer", label: "⚽ Soccer" },
              { id: "art-history", label: "🖼️ Art History" },
              { id: "basketball", label: "🏀 Basketball" },
              { id: "formula1", label: "🏎️ Formula 1" },
              { id: "music", label: "🎵 Music" },
            ]}
            title="Recent"
            showChevron={false}
          />
        </div>


        <UserActivity activities={user.activities || []} />
      </div>
    </div>
  );
}
