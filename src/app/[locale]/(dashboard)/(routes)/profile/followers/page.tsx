import React from 'react';

export default function FollowersPage() {
  const followers = [
    // Example followers data
    { username: 'gerardo.saavedra.d', name: 'Gerardo Saavedra', profilePic: '/path-to-pic1.jpg' },
    { username: 'stefanou24', name: 'Stefano Uccelli', profilePic: '/path-to-pic2.jpg' },
    // Add more followers here
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-xl font-bold">Followers</h2>
        <button>
          <img src="/path-to-close-icon.png" alt="Close" className="h-6 w-6" />
        </button>
      </div>
      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 mt-2 mb-4 border rounded"
      />
      <div>
        {followers.map((follower, index) => (
          <div key={index} className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img
                src={follower.profilePic}
                alt={follower.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold">{follower.username}</p>
                <p className="text-sm text-gray-500">{follower.name}</p>
              </div>
            </div>
            <button className="bg-gray-200 py-1 px-3 rounded text-sm">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
