import { useRouter } from 'next/router';

export default function CommunityPage() {
  const router = useRouter();
  const { id } = router.query;  // Get the dynamic community ID from the URL

  return (
    <div>
      <h1>Welcome to the {id} Community</h1>
      {/* Add more content about the specific community */}
    </div>
  );
}
