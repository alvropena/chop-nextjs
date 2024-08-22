import Image from 'next/image';
import React from 'react';

export default function FollowingPage() {
  const following = [
    // Example following data
    { username: 'gerardo.saavedra.d', name: 'Gerardo Saavedra', profilePic: '/path-to-pic1.jpg' },
    { username: 'stefanou24', name: 'Stefano Uccelli', profilePic: '/path-to-pic2.jpg' },
    // Add more following here
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-xl font-bold">Following</h2>
      </div>
      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 mt-2 mb-4 border rounded"
      />
      <div>
        {following.map((user, index) => (
          <div key={index} className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Image
                src={user.profilePic}
                alt={user.name}
                width={100}
                height={100}
              />
              <div>
                <p className="font-semibold">{user.username}</p>
                <p className="text-sm text-gray-500">{user.name}</p>
              </div>
            </div>
            <button className="bg-gray-200 py-1 px-3 rounded text-sm">Following</button>
          </div>
        ))}
      </div>
    </div>
  );
}
